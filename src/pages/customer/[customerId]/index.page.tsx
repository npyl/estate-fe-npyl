import { Box, Grid, Stack, Tab, Tabs } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import {
    useDeleteCustomerMutation,
    useGetCustomerByIdQuery,
} from "src/services/customers";

import {
    Address,
    Demand,
    Information,
    MatchingProperties,
    Notes,
    OwnedProperties,
    Logs,
} from "./sections";
import TabPanel from "src/components/Tabs";
import ViewHeader from "@/sections/ViewHeader";
import { useTranslation } from "react-i18next";
import { useTabsContext } from "src/contexts/tabs";
import React from "react";
import Agreements from "@/sections/agreements";

type TabConfig = {
    label: string;
    content: JSX.Element;
};

const CustomerView: NextPage = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const { removeTab, pushTab } = useTabsContext();

    const { customerId } = router.query;

    const { data } = useGetCustomerByIdQuery(+customerId!);
    const [deleteCustomer] = useDeleteCustomerMutation();

    const [value, setValue] = useState(0);

    useEffect(() => {
        if (data && customerId) {
            pushTab({
                path: `/customer/${customerId}`,
                id: customerId as string,
                label: `${t("Customer")} ${data?.firstName || ""} ${
                    data?.lastName || ""
                }`,
            });
        }
    }, [data, customerId, t]);

    const isSellerOrLessor = data?.seller || data?.lessor;
    const isBuyerOrLeaser = data?.buyer || data?.leaser;
    const demands = data?.demands;

    const handleChange = (event: React.SyntheticEvent, newValue: number) =>
        setValue(newValue);
    const handleEdit = () => router.push(`/customer/edit/${customerId}`);
    const handleDelete = () =>
        deleteCustomer(+customerId!).then(() => {
            router.push("/customers");
            removeTab(customerId as string);
        });

    const tabsConfig = [
        {
            label: t("Customer Information"),
            content: (
                <Grid container spacing={1}>
                    <Grid item xs={12} lg={6}>
                        <Information />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                <Address />
                            </Grid>
                            <Grid item>
                                <Notes />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            ),
        },

        // Add this new tab configuration for DemandSection
        isBuyerOrLeaser && {
            label: t("Demands"),
            content: (
                <Stack spacing={1}>
                    {demands?.map((d, i) => (
                        <Demand key={i} index={i} />
                    ))}
                </Stack>
            ),
        },
        isSellerOrLessor && {
            label: t("Owned Properties"),
            content: <OwnedProperties />,
        },
        isBuyerOrLeaser && {
            label: t("Matching Properties"),
            content: <MatchingProperties />,
        },
        {
            label: t("Agreements"),
            content: <Agreements customerId={+customerId!} />,
        },
        {
            label: t("Logs"),
            content: <Logs />,
        },
    ].filter((tab): tab is TabConfig => Boolean(tab));

    return (
        <Box sx={{ width: "100%", paddingTop: 1 }}>
            <ViewHeader
                isProperty={false}
                onEdit={handleEdit}
                onDelete={handleDelete}
            >
                <Tabs value={value} onChange={handleChange}>
                    {tabsConfig.map((tab, index) => (
                        <Tab key={index} label={tab!.label} />
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
