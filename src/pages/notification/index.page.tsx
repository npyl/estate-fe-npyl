import { Box, Stack, Tabs, InputLabel, MenuItem, Select } from "@mui/material";
import type { NextPage } from "next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import TabPanel from "src/components/Tabs";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import NotificationsGuard from "@/components/authentication/notification-guard";
const Listings = dynamic(() => import("./tabs/listings"));
const Tours = dynamic(() => import("./tabs/tours"));
const WorkApplications = dynamic(() => import("./tabs/work"));
const Reviews = dynamic(() => import("./tabs/reviews"));
const Agreements = dynamic(() => import("./tabs/agreements"));
const StayUpdated = dynamic(() => import("./tabs/StayUpdated"));
import dynamic from "next/dynamic";
import { INotificationTab, TViewFilter } from "./types";
import getTabOption from "./getTabOption";
import { FilterFormControl } from "./styled";

const TABS: INotificationTab[] = [
    { label: "Tours", type: "TOUR" },
    { label: "Listings", type: "LISTING" },
    { label: "Work Applications", type: "WORK_FOR_US" },
    { label: "Reviews", type: "REVIEW" },
    { label: "Agreements", type: "AGREEMENT" },
    { label: "Stay Updated", type: "STAY_UPDATED" },
];

const NotificationPage: NextPage = () => {
    const { t } = useTranslation();

    const [tab, setTab] = useState(0);
    const [filter, setFilter] = useState<TViewFilter>("all");

    const handleFilterChange = (event: any) => {
        setFilter(event.target.value);
    };

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <Tabs value={tab} onChange={(e, v) => setTab(v)}>
                        {TABS.map(getTabOption)}
                    </Tabs>
                    <FilterFormControl
                        sx={{ minWidth: 120, borderColor: "1px solid red" }}
                    >
                        <InputLabel
                            sx={{
                                fontSize: "medium",
                                color: "primary",
                                display: "flex",
                            }}
                        >
                            {t(`  View `)}
                        </InputLabel>

                        <Select
                            value={filter}
                            label="Filter"
                            onChange={handleFilterChange}
                        >
                            <MenuItem value="all">{t(`All`)}</MenuItem>
                            <MenuItem value="viewed">{t(`Viewed`)}</MenuItem>
                            <MenuItem value="notViewed">
                                {t(`Not Viewed`)}
                            </MenuItem>
                        </Select>
                    </FilterFormControl>
                </Stack>
            </Box>
            {/* ------------------------------------------------ */}
            <TabPanel value={tab} index={0}>
                <Tours filter={filter} />
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <Listings filter={filter} />
            </TabPanel>
            <TabPanel value={tab} index={2}>
                <WorkApplications filter={filter} />
            </TabPanel>
            <TabPanel value={tab} index={3}>
                <Reviews filter={filter} />
            </TabPanel>
            <TabPanel value={tab} index={4}>
                <Agreements filter={filter} />
            </TabPanel>
            <TabPanel value={tab} index={5}>
                <StayUpdated filter={filter} />
            </TabPanel>
        </>
    );
};

NotificationPage.getLayout = (page) => (
    <DashboardLayout>
        <NotificationsGuard>{page} </NotificationsGuard>
    </DashboardLayout>
);

export default NotificationPage;
