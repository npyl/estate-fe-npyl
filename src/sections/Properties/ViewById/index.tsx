import { Tab, TabProps, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import { FC, Suspense, useCallback, useState } from "react";
import {
    useClonePropertyMutation,
    useDeletePermanentPropertyMutation,
    useDeletePropertyMutation,
} from "src/services/properties";

import TabPanel from "src/components/Tabs";

import ViewHeader from "@/sections/ViewHeader";

import { useTranslation } from "react-i18next";
import { useTabsContext } from "src/contexts/tabs";
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

import { styled } from "@mui/material/styles";

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

const GREEN_MAP_INDEX = 11;

// -----------------------------------------------------------------

interface Props {
    archived?: boolean;
}

const PropertyById: FC<Props> = ({ archived = false }) => {
    const router = useRouter();
    const { t } = useTranslation();
    const { removeTab } = useTabsContext();

    const { propertyId } = router.query;

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
        const res = await deleteProperty(+propertyId!);
        if ("error" in res) return;
        router.push("/archived");
    }, []);
    const handleDelete = useCallback(async () => {
        await deletePermanent(+propertyId!);
        router.push("/property");
        removeTab(propertyId as string);
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
                    <Tab label={t("Overview")} />
                    <Tab label={t("Quick View")} />
                    <Tab label={t("Tasks")} />
                    <Tab label={t("Matching Customers")} />
                    <Tab label={t("Photos")} />
                    <Tab label={t("Integrations")} />
                    <Tab label={t("Logs")} />
                    <Tab label={t("Documents")} />
                    <Tab label={t("Map")} />
                    <Tab label={t("Street View")} />
                    <Tab label={t("Agreements")} />
                    <GreenMapTab label={t("Eco Map")} />
                </Tabs>
            </ViewHeader>
            <TabPanel value={value} index={0}>
                <MainContainer />
            </TabPanel>
            <Suspense>
                <TabPanel value={value} index={1}>
                    <QuickView />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Tasks />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <MatchingCustomersSection />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <PhotosOnly />
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <Integrations />
                </TabPanel>
                <TabPanel value={value} index={6}>
                    <PropertyLogs />
                </TabPanel>
                <TabPanel value={value} index={7}>
                    <Documents />
                </TabPanel>
                <TabPanel value={value} index={8}>
                    <Map />
                </TabPanel>
                <TabPanel value={value} index={9}>
                    <StreetView />
                </TabPanel>
                <TabPanel value={value} index={10}>
                    <AgreementsTab />
                </TabPanel>
                <TabPanel value={value} index={GREEN_MAP_INDEX}>
                    <GreenMap />
                </TabPanel>
            </Suspense>

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
