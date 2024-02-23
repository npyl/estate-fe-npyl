import type { NextPage } from "next";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { AdminGuard } from "src/components/authentication/admin-guard";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import TabPanel from "src/components/Tabs";
import { useTranslation } from "react-i18next";
import { Tours, Listings, WorkApplications } from "./tabs";

const TABS = [
    {
        label: "Tours",
        component: <Tours />,
    },
    {
        label: "Listings",
        component: <Listings />,
    },
    {
        label: "Work Applications",
        tab: <WorkApplications />,
    },
];

const NotificationPage: NextPage = () => {
    const { t } = useTranslation();

    const [tab, setTab] = useState(0);

    return (
        <>
            <Box borderColor="divider">
                <Tabs
                    value={tab}
                    onChange={(e, v) => setTab(v)}
                    aria-label="basic tabs example"
                >
                    {TABS.map(({ label }, i) => (
                        <Tab label={t(label)} value={i} />
                    ))}
                </Tabs>
            </Box>
            {TABS.map(({ component }, i) => (
                <TabPanel key={i} value={tab} index={i}>
                    {component}
                </TabPanel>
            ))}
        </>
    );
};

NotificationPage.getLayout = (page) => (
    <AdminGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AdminGuard>
);

export default NotificationPage;
