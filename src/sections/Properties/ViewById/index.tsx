import MuiTab from "@mui/material/Tab";
import { useRouter } from "next/router";
import { ComponentType, FC, useCallback, useMemo, useState } from "react";
import {
    useClonePropertyMutation,
    useDeletePermanentPropertyMutation,
    useDeletePropertyMutation,
} from "src/services/properties";

import TabPanel from "src/components/Tabs";

import ViewHeader from "@/sections/ViewHeader";

import { useTranslation } from "react-i18next";
const ConfirmationDialogBox = dynamic(
    () => import("@/sections/ConfirmationDialogBox")
);
import dynamic from "next/dynamic";

// Tabs
const MainContainer = dynamic(() => import("./(tabs)/MainContainer"));
const Documents = dynamic(() => import("./(tabs)/Documents"));
const Integrations = dynamic(() => import("./(tabs)/Integrations"));
const StreetView = dynamic(() => import("./(tabs)/StreetView"));
const Map = dynamic(() => import("./(tabs)/Map"));
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
import Tabs from "@mui/material/Tabs";
import TasksLabel from "./TabLabels/TasksLabel";
import MatchingCustomersLabel from "./TabLabels/MatchingCustomers";
import PhotosLabel from "./TabLabels/Photos";
import DocumentsLabel from "./TabLabels/Documents";
import NotificationsLabel from "./TabLabels/Notifications";
import AgreementsLabel from "./TabLabels/Agreements";
import GreenMapTab from "./TabLabels/GreenMap";

// -----------------------------------------------------------------

const getTabPaths = (id: number) => [`/property/${id}`, `/property/edit/${id}`];

// -----------------------------------------------------------------

interface ITab {
    label: string;
    View: ComponentType;
    Tab?: ComponentType;
}

const getTABS = (t: TranslationType): ITab[] => [
    { label: t("Overview"), View: MainContainer },
    { label: t("Quick View"), View: QuickView },
    { label: t("Tasks"), View: Tasks, Tab: TasksLabel },
    {
        label: t("Matching Customers"),
        View: MatchingCustomersSection,
        Tab: MatchingCustomersLabel,
    },
    { label: t("Photos"), View: PhotosOnly, Tab: PhotosLabel },
    { label: t("Integrations"), View: Integrations },
    { label: t("Logs"), View: PropertyLogs },
    { label: t("Documents"), View: Documents, Tab: DocumentsLabel },
    { label: t("Map"), View: Map },
    { label: t("Street View"), View: StreetView },
    {
        label: t("Notifications"),
        View: NotificationsTab,
        Tab: NotificationsLabel,
    },
    { label: t("Emails"), View: Emails },
    { label: t("Agreements"), View: AgreementsTab, Tab: AgreementsLabel },
    { label: t("Eco Map"), View: GreenMap, Tab: GreenMapTab },
];

const getTab = ({ label, Tab }: ITab, idx: number) => {
    const TabComponent = Boolean(Tab) ? Tab! : MuiTab;
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

    const [cloneProperty] = useClonePropertyMutation();
    const [deleteProperty] = useDeletePropertyMutation();
    const [deletePermanent] = useDeletePermanentPropertyMutation();

    const [value, setValue] = useState(0);
    const [cloneConfirmDialogOpen, setCloneConfirmDialogOpen] = useState(false);

    const handleChange = useCallback((_: any, v: number) => setValue(v), []);

    const handleEdit = () => router.push(`/property/edit/${propertyId}`);

    const handleClone = () => setCloneConfirmDialogOpen(true);
    const closeCloneConfirmaionDialog = () => setCloneConfirmDialogOpen(false);

    const handleCloneConfirmation = () => {
        closeCloneConfirmaionDialog();
        cloneProperty(+propertyId!)
            .unwrap()
            .then((newPropertyId) =>
                router.push(`/property/edit/${newPropertyId}`)
            );
    };

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
                onClone={handleClone}
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
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

            {cloneConfirmDialogOpen ? (
                <ConfirmationDialogBox
                    open={cloneConfirmDialogOpen}
                    onClose={closeCloneConfirmaionDialog}
                    text={"Are you Sure You want to Clone This Property?"}
                    onConfirm={handleCloneConfirmation}
                    action={"clone"}
                />
            ) : null}
        </>
    );
};

export default PropertyById;
