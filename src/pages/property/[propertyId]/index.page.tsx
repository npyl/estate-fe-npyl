import { Tab, TabProps, Tabs } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Suspense, lazy, useState } from "react";
import {
    useClonePropertyMutation,
    useDeletePropertyMutation,
} from "src/services/properties";

import TabPanel from "src/components/Tabs";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";

import ViewHeader from "src/pages/components/ViewHeader";

import "photoswipe/dist/photoswipe.css";

import { useTranslation } from "react-i18next";
import { useTabsContext } from "src/contexts/tabs";
import { ConfirmationDialogBox } from "src/pages/components/ConfirmationDialogBox";
import Iconify from "@/components/iconify";

// Tabs
const MainContainer = lazy(() => import("./(tabs)/MainContainer"));
const Documents = lazy(() => import("./(tabs)/Documents"));
const Integrations = lazy(() => import("./(tabs)/Integrations"));
const StreetView = lazy(() => import("./(tabs)/StreetView"));
const Map = lazy(() => import("./(tabs)/Map"));
const MatchingCustomersSection = lazy(
    () => import("./(tabs)/MatchingCustomers")
);
const PhotosOnly = lazy(() => import("./(tabs)/PhotosOnly"));
const PropertyLogs = lazy(() => import("./(sections)/Logs"));
const GreenMap = lazy(() => import("./(tabs)/Green"));
const AgreementsTab = lazy(() => import("./(tabs)/Agreements"));

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

const SingleProperty: NextPage = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const { removeTab } = useTabsContext();

    const { propertyId } = router.query;

    const [cloneProperty] = useClonePropertyMutation();
    const [deleteProperty] = useDeletePropertyMutation();

    const [value, setValue] = useState(0);
    const [cloneConfirmDialogOpen, setCloneConfirmDialogOpen] = useState(false);

    const handleChange = (event: React.SyntheticEvent, newValue: number) =>
        setValue(newValue);

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

    const handleDelete = () =>
        deleteProperty(+propertyId!).then(() => {
            router.push("/");
            removeTab(propertyId as string);
        });

    return (
        <>
            <ViewHeader
                isProperty
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
                    <Tab label={t("Tickets")} />
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
                <TabPanel value={value} index={1}></TabPanel>
                <TabPanel value={value} index={2}></TabPanel>
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

SingleProperty.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default SingleProperty;
