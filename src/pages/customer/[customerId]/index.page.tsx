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

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}
type TabConfig = {
    label: string;
    content: JSX.Element;
};

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
    const isSellerOrLessor = data?.seller || data?.lessor;
    const isBuyerOrLeaser = data?.buyer || data?.leaser;
    if (isDeleteSuccess) {
        router.push("/customer");
        // delete tab
        dispatch(deleteTabWithPath(`/customer/${customerId}`));
    }
    const tabsConfig = [
        {
            label: t("Customer Information"),
            content: (
                <Grid container spacing={1}>
                    <Grid item xs={6} order={"row"}>
                        <Stack spacing={1}>
                            <InformationSection />
                            <AddressSection />
                            {isBuyerOrLeaser && <DemandSection />}
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
            ),
        },
        isSellerOrLessor && {
            label: t("Owned Properties"),
            content: <OwnedCustomerPropertiesSection />,
        },
        isBuyerOrLeaser && {
            label: t("Matching Properties"),
            content: <MatchingPropertiesSection />,
        },
    ].filter((tab): tab is TabConfig => Boolean(tab));
    return (
        <Box sx={{ width: "100%", paddingY: 1 }}>
            <ViewHeader onEdit={handleEdit} onDelete={handleDelete}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="View Property Tabs"
                >
                    {tabsConfig.map((tab, index) => (
                        <Tab
                            key={index}
                            label={tab!.label}
                            {...a11yProps(index)}
                        />
                    ))}
                </Tabs>
            </ViewHeader>

            {tabsConfig.map((tab, index) => (
                <TabPanel key={index} value={value} index={index}>
                    {tab!.content}
                </TabPanel>
            ))}
        </Box>
    );
};

CustomerView.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default CustomerView;
