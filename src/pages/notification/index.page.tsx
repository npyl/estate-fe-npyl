import { Box, Stack, Tab, Tabs } from "@mui/material";
import type { NextPage } from "next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import TabPanel from "src/components/Tabs";
import { AdminGuard } from "src/components/authentication/admin-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { Listings, Tours, WorkApplications, Reviews } from "./tabs";
import { useGetNonViewedNotificationsCountQuery } from "@/services/notification";
import UnReadBadge from "./components/UnReadBadge";

const NotificationPage: NextPage = () => {
    const { t } = useTranslation();
    const { data: nonViewedNotificationsCount } =
        useGetNonViewedNotificationsCountQuery();
    const [tab, setTab] = useState(0);

    const getUnreadCount = (type: string) => {
        return nonViewedNotificationsCount?.types[type] || 0;
    };

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={tab} onChange={(e, v) => setTab(v)}>
                    <Tab
                        label={
                            <Box
                                display="flex"
                                alignItems="center"
                                position="relative"
                                gap={1}
                            >
                                {t("Tours")}
                                <UnReadBadge count={getUnreadCount("TOUR")} />
                            </Box>
                        }
                        value={0}
                    />
                    <Tab
                        label={
                            <Box
                                display="flex"
                                alignItems="center"
                                position="relative"
                                gap={1}
                            >
                                {t("Listings")}
                                <UnReadBadge
                                    count={getUnreadCount("LISTING")}
                                />
                            </Box>
                        }
                        value={1}
                    />
                    <Tab
                        label={
                            <Box
                                display="flex"
                                alignItems="center"
                                position="relative"
                                gap={1}
                            >
                                {t("Work Applications")}
                                <UnReadBadge
                                    count={getUnreadCount("WORK_FOR_US")}
                                />
                            </Box>
                        }
                        value={2}
                    />
                    <Tab
                        label={
                            <Box
                                display="flex"
                                alignItems="center"
                                position="relative"
                                gap={1}
                            >
                                {t("Reviews")}
                                <UnReadBadge count={getUnreadCount("REVIEW")} />
                            </Box>
                        }
                        value={3}
                    />
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
            <TabPanel value={tab} index={3}>
                <Reviews />
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
