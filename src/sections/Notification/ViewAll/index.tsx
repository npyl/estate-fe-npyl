import { Box, Stack, MenuItem } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import TabPanel from "@/components/Tabs/TabPanel";
const Listings = dynamic(() => import("./tabs/listings"));
const Tours = dynamic(() => import("./tabs/tours"));
const WorkApplications = dynamic(() => import("./tabs/work"));
const Reviews = dynamic(() => import("./tabs/reviews"));
const Agreements = dynamic(() => import("./tabs/agreements"));
const StayUpdated = dynamic(() => import("./tabs/StayUpdated"));
import dynamic from "next/dynamic";
import { INotificationTab, TViewFilter } from "./types";
import getTabOption from "./getTabOption";
import ManagerSelect from "./ManagerSelect";
import Tabs, { useCurrentTab } from "@/components/Tabs";
import Select from "@/components/Select";
import PoppingSearch from "@/components/PoppingSearch";

const TABS: INotificationTab[] = [
    { label: "Tours", type: "TOUR" },
    { label: "Listings", type: "LISTING" },
    { label: "Work Applications", type: "WORK_FOR_US" },
    { label: "Reviews", type: "REVIEW" },
    { label: "Agreements", type: "AGREEMENT" },
    { label: "Stay Updated", type: "STAY_UPDATED" },
];

const ViewAllNotifications = () => {
    const { t } = useTranslation();

    const [tab] = useCurrentTab();
    const [filter, setFilter] = useState<TViewFilter>("all");

    const [searchText, setSearchText] = useState("");

    const handleFilterChange = (event: any) => {
        setFilter(event.target.value);
    };

    const handleClearSearch = () => setSearchText("");

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <Tabs>{TABS.map(getTabOption)}</Tabs>

                    <Select
                        value={filter}
                        label={t(`  View `)}
                        formControlProps={{ sx: { minWidth: 120 } }}
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="all">{t(`All`)}</MenuItem>
                        <MenuItem value="viewed">{t(`Viewed`)}</MenuItem>
                        <MenuItem value="notViewed">{t(`Not Viewed`)}</MenuItem>
                    </Select>
                </Stack>
                <Box my={1} position="relative">
                    <PoppingSearch
                        value={searchText}
                        onChange={setSearchText}
                        onClear={handleClearSearch}
                    />
                    {tab === 0 && <ManagerSelect />}
                </Box>
            </Box>
            {/* ------------------------------------------------ */}
            <TabPanel value={tab} index={0}>
                <Tours filter={filter} searchText={searchText} />
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <Listings filter={filter} searchText={searchText} />
            </TabPanel>
            <TabPanel value={tab} index={2}>
                <WorkApplications filter={filter} searchText={searchText} />
            </TabPanel>
            <TabPanel value={tab} index={3}>
                <Reviews filter={filter} searchText={searchText} />
            </TabPanel>
            <TabPanel value={tab} index={4}>
                <Agreements filter={filter} searchText={searchText} />
            </TabPanel>
            <TabPanel value={tab} index={5}>
                <StayUpdated filter={filter} searchText={searchText} />
            </TabPanel>
        </>
    );
};

export default ViewAllNotifications;
