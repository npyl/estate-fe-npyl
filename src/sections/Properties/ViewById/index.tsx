import MuiTab from "@mui/material/Tab";
import { useRouter } from "next/router";
import { ComponentType, FC, useCallback, useMemo, useState } from "react";
import {
    useClonePropertyMutation,
    useDeletePermanentPropertyMutation,
    useDeletePropertyMutation,
} from "src/services/properties";

import TabPanel from "@/components/Tabs/TabPanel";

import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";

// Tabs
const MainContainer = dynamic(() => import("./(tabs)/MainContainer"));
const Documents = dynamic(() => import("./(tabs)/Documents"));
const Integrations = dynamic(() => import("./(tabs)/Integrations"));
const StreetView = dynamic(() => import("./(tabs)/StreetView"));
const MapTab = dynamic(() => import("./(tabs)/Map"));
const MatchingCustomersSection = dynamic(
    () => import("./(tabs)/MatchingCustomers")
);
const PhotosOnly = dynamic(() => import("./(tabs)/PhotosOnly"));
const PropertyLogs = dynamic(() => import("./(tabs)/Logs"));
const GreenMap = dynamic(() => import("./(tabs)/Green"));
const AgreementsTab = dynamic(() => import("./(tabs)/Agreements"));
const Tasks = dynamic(() => import("./(tabs)/Tasks"));
const QuickView = dynamic(() => import("./(tabs)/QuickView"));
const NotificationsTab = dynamic(() => import("./(tabs)/Notifications"));
const Emails = dynamic(() => import("./(tabs)/Emails"));

import { TranslationType } from "@/types/translation";
import TasksLabel from "./TabLabels/TasksLabel";
import MatchingCustomersLabel from "./TabLabels/MatchingCustomers";
import PhotosLabel from "./TabLabels/Photos";
import DocumentsLabel from "./TabLabels/Documents";
import NotificationsLabel from "./TabLabels/Notifications";
import AgreementsLabel from "./TabLabels/Agreements";
import GreenMapTab from "./GreenMap";
import IntegrationsLabel from "./TabLabels/Integrations";
import Tabs, { useCurrentTab } from "@/components/Tabs";
import ViewHeader from "./ViewHeader";

// -----------------------------------------------------------------

const getTabPaths = (id: number) => [`/property/${id}`, `/property/edit/${id}`];

// -----------------------------------------------------------------

interface ITab {
    Label: ComponentType | string;
    View: ComponentType;
    Tab?: ComponentType;
}

const getTABS = (t: TranslationType): ITab[] => [
    { Label: t<string>("Overview"), View: MainContainer },
    { Label: t<string>("Quick View"), View: QuickView },
    { Label: TasksLabel, View: Tasks },
    {
        Label: MatchingCustomersLabel,
        View: MatchingCustomersSection,
    },
    { Label: PhotosLabel, View: PhotosOnly },
    { Label: IntegrationsLabel, View: Integrations },
    { Label: t<string>("Logs"), View: PropertyLogs },
    { Label: DocumentsLabel, View: Documents },
    { Label: t<string>("Map"), View: MapTab },
    { Label: t<string>("Street View"), View: StreetView },
    {
        Label: NotificationsLabel,
        View: NotificationsTab,
    },
    { Label: t<string>("Emails"), View: Emails },
    { Label: AgreementsLabel, View: AgreementsTab },
    { Label: t<string>("Eco Map"), View: GreenMap, Tab: GreenMapTab },
];

const getTab = ({ Label, Tab }: ITab, idx: number) => {
    const label = typeof Label == "string" ? Label : <Label />;
    const TabComponent = Tab ?? MuiTab;
    return <TabComponent key={idx} label={label} />;
};

const getTabView =
    (value: number) =>
    ({ View }: ITab, idx: number) => (
        <TabPanel key={idx} value={value} index={idx}>
            <View />
        </TabPanel>
    );

// -----------------------------------------------------------------

interface Props {
    archived?: boolean;
}

const PropertyById: FC<Props> = ({ archived = false }) => {
    const router = useRouter();
    const { t } = useTranslation();

    const { propertyId } = router.query;

    const TABS = useMemo(() => getTABS(t), [t]);
    const GREEN_MAP_INDEX = TABS.length - 1;

    const [deleteProperty] = useDeletePropertyMutation();
    const [deletePermanent] = useDeletePermanentPropertyMutation();

    const [value] = useCurrentTab();

    const handleEdit = () => router.push(`/property/edit/${propertyId}`);

    const handleArchive = useCallback(async () => {
        const res = await deleteProperty({
            tabPaths: getTabPaths(+propertyId!),
            props: +propertyId!,
        });
        if ("error" in res) return;
        router.push("/archived");
    }, []);
    const handleDelete = useCallback(async () => {
        const res = await deletePermanent({
            tabPaths: getTabPaths(+propertyId!),
            props: +propertyId!,
        });
        if ("error" in res) return;
        router.push("/property");
    }, [propertyId]);

    return (
        <>
            <ViewHeader
                isProperty
                isArchived={archived}
                // ...
                onArchive={handleArchive}
                onEdit={handleEdit}
                onDelete={handleDelete}
            >
                <Tabs
                    sx={{
                        // GreenMapTab Indicator
                        "& .MuiTabs-indicator": {
                            ...(value === GREEN_MAP_INDEX
                                ? { backgroundColor: "#00b32d" }
                                : {}),
                        },
                    }}
                >
                    {TABS.map(getTab)}
                </Tabs>
            </ViewHeader>

            {TABS.map(getTabView(value))}
        </>
    );
};

export default PropertyById;
