import { Box, Grid, Stack, Tab, Tabs } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import {
    useDeleteCustomerMutation,
    useGetCustomerByIdQuery,
} from "src/services/customers";
import AddressSection from "./components/AddressSection";
import DemandSection from "./components/DemandSection";
import InformationSection from "./components/InformationSection";
import MatchingPropertiesSection from "./components/MatchingPropertiesSection";
import NotesCustomerSection from "./components/NotesSection";
import OwnedCustomerPropertiesSection from "./components/OwnedPropertiesSection";

import TabPanel from "src/components/Tabs";
import ViewHeader from "src/pages/components/ViewHeader";

import { useTranslation } from "react-i18next";
import { useTabsContext } from "src/contexts/tabs";

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
    const { removeTab, pushTab } = useTabsContext();
    const { customerId } = router.query;
    const [value, setValue] = useState(0);

    const { data } = useGetCustomerByIdQuery(+customerId!);
    useEffect(() => {
        if (data && customerId) {
            pushTab({
                path: `/customer/${customerId}`,
                id: customerId as string,
                label: `Customer ${customerId}`,
            });
        }
    }, [data, customerId]);

    const [deleteCustomer, { isSuccess: isDeleteSuccess }] =
        useDeleteCustomerMutation();

    const isSellerOrLessor = data?.seller || data?.lessor;
    const isBuyerOrLeaser = data?.buyer || data?.leaser;
    const demands = data?.demands;

    const handleChange = (event: React.SyntheticEvent, newValue: number) =>
        setValue(newValue);
    const handleEdit = () => router.push(`/customer/edit/${customerId}`);
    const handleDelete = () => deleteCustomer(+customerId!);

    if (isDeleteSuccess) {
        router.push("/customer");

        removeTab(customerId as string);
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
                            {isBuyerOrLeaser &&
                                demands?.map((d, i) => (
                                    <DemandSection key={i} index={i} />
                                ))}
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
