import { Box, Grid, Stack, Tab, Tabs } from "@mui/material";

import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";

import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
    useDeleteCustomerMutation,
    useGetCustomerByIdQuery,
} from "src/services/customers";

import AddressSection from "./components/AddressSection";
import InformationSection from "./components/InformationSection";
import DemandSection from "./components/DemandSection";
import MatchingPropertiesSection from "./components/MatchingPropertiesSection";
import NotesCustomerSection from "./components/NotesSection";
import OwnedCustomerPropertiesSection from "./components/OwnedPropertiesSection";

import TabPanel from "src/components/Tabs/Tabs";
import ViewHeader from "src/pages/components/ViewHeader";

import { deleteTabWithPath } from "src/slices/tabs";
import { usePublishTab } from "src/components/Tabs/utils";
import { useTranslation } from "react-i18next";
import { AreaOfPreference } from "./components/AreaOfPreference";

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const CustomerView: NextPage = () => {
    // customer
    const router = useRouter();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { customerId } = router.query;

    const [value, setValue] = useState(0);

    const { data } = useGetCustomerByIdQuery(+customerId!);
    const [deleteCustomer, { isSuccess: isDeleteSuccess }] =
        useDeleteCustomerMutation();

    usePublishTab(
        {
            title: data?.firstName && data?.lastName ? "" : "Customer",
            path: `/customer/${customerId}`,
        },
        data?.firstName && data?.lastName
            ? `${data?.firstName} ${data?.lastName}`
            : `${data?.id}`
    );

    const handleChange = (event: React.SyntheticEvent, newValue: number) =>
        setValue(newValue);
    const handleEdit = () => router.push(`/customer/edit/${customerId}`);
    const handleDelete = () => deleteCustomer(+customerId!);

    if (isDeleteSuccess) {
        router.push("/customer");
        // delete tab
        dispatch(deleteTabWithPath(`/customer/${customerId}`));
    }
    //     <TypeLabels
    //     seller={data?.seller}
    //     lessor={data?.lessor}
    //     leaser={data?.leaser}
    //     buyer={data?.buyer}
    // />
    const isSellerOrLessor = data?.seller || data?.lessor;
    const isBuyerOrLeaser = data?.buyer || data?.leaser;
    return (
        <Box sx={{ width: "100%", paddingY: 1 }}>
            <ViewHeader onEdit={handleEdit} onDelete={handleDelete}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="View Property Tabs"
                >
                    <Tab label={t("Customer Information")} {...a11yProps(0)} />
                    {isSellerOrLessor && (
                        <Tab label={t("Owned Properties")} {...a11yProps(1)} />
                    )}
                    {isBuyerOrLeaser && (
                        <Tab
                            label={t("Matching Properties")}
                            {...a11yProps(2)}
                        />
                    )}
                </Tabs>
            </ViewHeader>

            {/* customer info */}
            <TabPanel value={value} index={0}>
                <Grid container spacing={1}>
                    <Grid item xs={6} order={"row"}>
                        <Stack spacing={1}>
                            <InformationSection />
                            <AddressSection />
                            <DemandSection />
                            <NotesCustomerSection />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            {isBuyerOrLeaser && <MatchingPropertiesSection />}
                            {isSellerOrLessor && (
                                <OwnedCustomerPropertiesSection />
                            )}
                        </Stack>
                    </Grid>
                </Grid>
            </TabPanel>

            {isSellerOrLessor && (
                <TabPanel value={value} index={1}>
                    <OwnedCustomerPropertiesSection />
                </TabPanel>
            )}

            {isBuyerOrLeaser && (
                <TabPanel value={value} index={2}>
                    <MatchingPropertiesSection />
                </TabPanel>
            )}
        </Box>
    );
};

CustomerView.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default CustomerView;
