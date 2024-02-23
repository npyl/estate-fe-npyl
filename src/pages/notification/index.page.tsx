import type { NextPage } from "next";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { AdminGuard } from "src/components/authentication/admin-guard";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import TabPanel from "src/components/Tabs";
import { Tours, Listings, WorkApplications } from "./tabs";

const NotificationPage: NextPage = () => {
    const [tab, setTab] = useState(0);

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={tab}
                    onChange={(e, v) => setTab(v)}
                    aria-label="basic tabs example"
                >
                    <Tab label="Tours" value={0} />
                    <Tab label="Listings" value={1} />
                    <Tab label="Work Applications" value={2} />
                </Tabs>
            </Box>
            <TabPanel value={tab} index={0}>
                <Tours />
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <Listings />
            </TabPanel>
            <TabPanel value={tab} index={2}>
                <WorkApplications />
            </TabPanel>
        </>
    );
};

NotificationPage.getLayout = (page) => (
    <AdminGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AdminGuard>
);

export default NotificationPage;
