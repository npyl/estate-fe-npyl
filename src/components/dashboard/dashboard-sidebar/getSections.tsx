import { CircleNotifications, LabelImportant } from "@mui/icons-material";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { Box } from "@mui/material";
import { TFunction } from "i18next";
import { ReactNode } from "react";
import { Home as HomeIcon } from "@/assets/icons/home";
import { Users as UsersIcon } from "@/assets/icons/users";
import HistoryIcon from "@mui/icons-material/History";
import { ChartPie } from "@/assets/icons/chart-pie";
import { ChartLine as ChartLineIcon } from "@/assets/icons/chart-line";
import CircleUnReadNotifications from "@/pages/notification/components/CircleUnReadNotifications";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TasksIconWithCounter from "./TasksIconWithCounter";
import ArchivedIcon from "./ArchivedIcon";

interface Item {
    title: string;
    children?: Item[];
    adminOnly?: boolean;
    chip?: ReactNode;
    icon?: ReactNode;
    path?: string;
}

interface Section {
    title: string;
    items: Item[];
}

const getSections = (
    t: TFunction,
    nonViewedNotificationsCount: number
): Section[] => [
    {
        title: t("main"),
        items: [
            {
                title: t("Dashboard"),

                path: "/",
                icon: <ChartPie fontSize="small" />,
            },

            {
                title: t("Statistics"),
                path: "/statistics",
                icon: <ChartLineIcon fontSize="small" />,
            },

            {
                title: t("Properties"),
                path: "/property",
                icon: <HomeIcon fontSize="small" />,
            },

            {
                title: t("Customers"),
                path: "/customers",
                icon: <UsersIcon fontSize="small" />,
            },

            {
                title: t("Labels"),
                path: "/label",
                icon: <LabelImportant fontSize="small" />,
            },

            {
                title: t("Notifications"),
                path: "/notification",
                icon: (
                    <Box display="flex" justifyContent="space-between">
                        <CircleNotifications fontSize="small" />
                        {nonViewedNotificationsCount ? (
                            <CircleUnReadNotifications>
                                {nonViewedNotificationsCount}
                            </CircleUnReadNotifications>
                        ) : null}
                    </Box>
                ),
            },

            {
                title: t("Tasks"),
                path: "/tasks",
                icon: <TasksIconWithCounter />,
            },
            {
                title: t("Logs"),
                path: "/logs",
                icon: <HistoryIcon fontSize="small" />,
                adminOnly: true,
            },
            {
                title: t("Agreements"),
                path: "/agreements",
                icon: <HandshakeIcon fontSize="small" />,
                adminOnly: true,
            },
            {
                title: t("Calendar"),
                path: "/calendar",
                icon: <CalendarTodayIcon fontSize="small" />,
            },
            {
                title: t("Archived"),
                path: "/archived",
                icon: <ArchivedIcon />,
            },
        ],
    },
];

export default getSections;
