import { Box, Button, Grid, Stack, Tab, Tabs } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import {
    useDeleteCustomerMutation,
    useGetCustomerByIdQuery,
} from "src/services/customers";

import Drawer from "@mui/material/Drawer";

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
import ViewHeader from "src/pages/components/ViewHeader";

import { useTranslation } from "react-i18next";
import { useTabsContext } from "src/contexts/tabs";
import React from "react";

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
                label: `Customer ${data?.firstName || ""} ${
                    data?.lastName || ""
                }`,
            });
        }
    }, [data, customerId]);

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

    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const toggleDrawer =
        (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === "keydown" &&
                ((event as React.KeyboardEvent).key === "Tab" ||
                    (event as React.KeyboardEvent).key === "Shift")
            ) {
                return;
            }

            setDrawerOpen(open);
        };

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

                    <Button onClick={toggleDrawer(true)}>OpenDrawer</Button>

                    <Drawer
                        anchor="right"
                        open={drawerOpen}
                        onClose={toggleDrawer(false)}
                    >
                        <Grid item xs={12} sm={6}>
                            <Stack spacing={1}>
                                {isBuyerOrLeaser && (
                                    <MatchingProperties variant="small" />
                                )}
                                {isSellerOrLessor && (
                                    <OwnedProperties variant="small" />
                                )}
                            </Stack>
                        </Grid>
                    </Drawer>
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
            label: t("Logs"),
            content: <Logs />,
        },
    ].filter((tab): tab is TabConfig => Boolean(tab));

    return (
        <Box sx={{ width: "100%", paddingTop: 1 }}>
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
