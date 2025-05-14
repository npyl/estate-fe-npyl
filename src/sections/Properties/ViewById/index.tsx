import { Tab, TabProps, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import { FC, useCallback, useState } from "react";
import {
    useClonePropertyMutation,
    useDeletePermanentPropertyMutation,
    useDeletePropertyMutation,
    useGetTabCountQuery,
} from "src/services/properties";

import TabPanel from "src/components/Tabs";

import ViewHeader from "@/sections/ViewHeader";

import { useTranslation } from "react-i18next";
const ConfirmationDialogBox = dynamic(
    () => import("@/sections/ConfirmationDialogBox")
);
import Iconify from "@/components/iconify";
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

import { styled } from "@mui/material/styles";
import PropertyTabCounter from "./TabCounter";

interface TabItem {
    label: React.ReactNode;
    content: React.ReactNode;
    isGreen?: boolean;
}

const StyledTab = styled(Tab)(({ theme }) => ({
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    "&.Mui-selected": { color: "#00b32d" },
}));

const GreenMapTab: React.FC<TabProps> = (props) => (
    <StyledTab
        {...props}
        iconPosition="end"
        icon={
            <Iconify
                icon="ph:tree"
                fontSize="20px"
                width={20}
                height={20}
                sx={{
                    "&.Mui-selected": { color: "#00b32d" },
                    mb: 1,
                }}
            />
        }
    />
);

const GREEN_MAP_INDEX = 12;

// -----------------------------------------------------------------

const getTabPaths = (id: number) => [`/property/${id}`, `/property/edit/${id}`];

// -----------------------------------------------------------------

interface Props {
    archived?: boolean;
}

const PropertyById: FC<Props> = ({ archived = false }) => {
    const router = useRouter();
    const { t } = useTranslation();

    const { propertyId } = router.query;
    const { data: tabCounts, isLoading: isTabCountsLoading } =
        useGetTabCountQuery(+propertyId!, {
            skip: !propertyId,
        });

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

    // Maybe the following in a new TabsConfig component
    const tabsConfig: TabItem[] = [
        {
            label: t("Overview"),
            content: <MainContainer />,
        },
        {
            label: t("Quick View"),
            content: <QuickView />,
        },
        tabCounts?.tasks &&
            tabCounts?.tasks > 0 && {
                label: (
                    <PropertyTabCounter
                        label={t("Tasks")}
                        count={tabCounts.tasks}
                    />
                ),
                content: <Tasks />,
            },
        tabCounts?.matchingCustomers &&
            tabCounts?.matchingCustomers > 0 && {
                label: (
                    <PropertyTabCounter
                        label={t("Matching Customers")}
                        count={tabCounts?.matchingCustomers}
                    />
                ),
                content: <MatchingCustomersSection />,
            },
        tabCounts?.images &&
            tabCounts?.images > 0 && {
                label: (
                    <PropertyTabCounter
                        label={t("Photos")}
                        count={tabCounts?.images}
                    />
                ),
                content: <PhotosOnly />,
            },
        {
            label: t("Integrations"),
            content: <Integrations />,
        },
        {
            label: t("Logs"),
            content: <PropertyLogs />,
        },
        tabCounts?.documents &&
            tabCounts?.documents > 0 && {
                label: (
                    <PropertyTabCounter
                        label={t("Documents")}
                        count={tabCounts.documents}
                    />
                ),
                content: <Documents />,
            },
        {
            label: t("Map"),
            content: <Map />,
        },
        {
            label: t("Street View"),
            content: <StreetView />,
        },
        tabCounts?.notifications &&
            tabCounts?.notifications > 0 && {
                label: (
                    <PropertyTabCounter
                        label={t("Notifications")}
                        count={tabCounts.notifications}
                    />
                ),
                content: <NotificationsTab />,
            },
        tabCounts?.agreements &&
            tabCounts?.agreements > 0 && {
                label: (
                    <PropertyTabCounter
                        label={t("Agreements")}
                        count={tabCounts.agreements}
                    />
                ),
                content: <AgreementsTab />,
            },
        {
            label: t("Eco Map"),
            content: <GreenMap />,
            isGreen: true,
        },
    ].filter(Boolean) as TabItem[]; //Type-safe filtering for typescript error
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
                    {tabsConfig.map((tab, index) =>
                        tab?.isGreen ? (
                            <GreenMapTab key={index} label={tab.label} />
                        ) : (
                            <Tab key={index} label={tab?.label} />
                        )
                    )}
                </Tabs>
            </ViewHeader>
            {tabsConfig.map((tab, index) => (
                <TabPanel key={index} value={value} index={index}>
                    {tab?.content}
                </TabPanel>
            ))}

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
