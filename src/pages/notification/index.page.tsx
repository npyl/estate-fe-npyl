import {
    Box,
    Stack,
    Tab,
    Tabs,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import type { NextPage } from "next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import TabPanel from "src/components/Tabs";
import { AdminGuard } from "src/components/authentication/admin-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { Listings, Tours, WorkApplications, Reviews } from "./tabs";
import { useGetNonViewedNotificationsCountQuery } from "@/services/notification";
import UnReadBadge from "./components/UnReadBadge";
import { styled } from "@mui/system";
import Agreements from "./tabs/agreements";

const FilterFormControl = styled(FormControl)(({ theme }) => ({
    minWidth: 120,
    marginLeft: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,

    "& .MuiInputLabel-root": {
        color: theme.palette.text.primary,
        fontSize: "medium",
    },
    "& .MuiSelect-select": {
        padding: theme.spacing(1),
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: theme.palette.divider,
        },
        "&:hover fieldset": {
            borderColor: theme.palette.text.primary,
        },
    },
}));

const NotificationPage: NextPage = () => {
    const { t } = useTranslation();
    const { data: nonViewedNotificationsCount } =
        useGetNonViewedNotificationsCountQuery();
    const [tab, setTab] = useState(0);
    const [filter, setFilter] = useState("all");

    const getUnreadCount = (type: string) => {
        return nonViewedNotificationsCount?.types[type] || 0;
    };

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
                        <Tab
                            label={
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    position="relative"
                                    gap={1}
                                >
                                    {t("Tours")}
                                    <UnReadBadge
                                        count={getUnreadCount("TOUR")}
                                    />
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
                                    <UnReadBadge
                                        count={getUnreadCount("REVIEW")}
                                    />
                                </Box>
                            }
                            value={3}
                        />
                        <Tab
                            label={
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    position="relative"
                                    gap={1}
                                >
                                    {t("Agreements")}
                                    <UnReadBadge
                                        count={getUnreadCount("AGREEMENT")}
                                    />
                                </Box>
                            }
                            value={4}
                        />
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
        </>
    );
};

NotificationPage.getLayout = (page) => (
    <AdminGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AdminGuard>
);

export default NotificationPage;
