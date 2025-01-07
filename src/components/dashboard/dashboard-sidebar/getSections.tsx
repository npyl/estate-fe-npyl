import { LabelImportant } from "@mui/icons-material";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { TFunction } from "i18next";
import { ReactNode } from "react";
import { Home as HomeIcon } from "@/assets/icons/home";
import { Users as UsersIcon } from "@/assets/icons/users";
import HistoryIcon from "@mui/icons-material/History";
import { ChartPie } from "@/assets/icons/chart-pie";
import { ChartLine as ChartLineIcon } from "@/assets/icons/chart-line";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TasksIconWithCounter from "./TasksIconWithCounter";
import ArchivedIcon from "./ArchivedIcon";
import NotificationsIcon from "./NotificationsIcon";
import ChatIcon from "@mui/icons-material/Chat";

interface Item {
    title: string;
    children?: Item[];
    chip?: ReactNode;
    icon?: ReactNode;
    path?: string;
}

interface Section {
    title: string;
    items: Item[];
}

const ADMIN_ONLY = (i: Item, isAdmin: boolean) => (isAdmin ? [i] : []);

const getSections = (
    t: TFunction,
    isAdmin: boolean,
    withNotifications: boolean
): Section[] => [
    {
        title: t("main"),
        items: [
            {
                title: t("Dashboard"),
                path: "/",
                icon: <ChartPie fontSize="small" />,
            },

            ...ADMIN_ONLY(
                {
                    title: t("Statistics"),
                    path: "/statistics",
                    icon: <ChartLineIcon fontSize="small" />,
                },
                isAdmin
            ),

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

            // ---------------------------------------------
            ...(withNotifications
                ? [
                      {
                          title: t("Notifications"),
                          path: "/notification",
                          icon: <NotificationsIcon />,
                      },
                  ]
                : []),
            // ---------------------------------------------

            {
                title: t("Tasks"),
                path: "/tasks",
                icon: <TasksIconWithCounter />,
            },

            ...ADMIN_ONLY(
                {
                    title: t("Logs"),
                    path: "/logs",
                    icon: <HistoryIcon fontSize="small" />,
                },
                isAdmin
            ),
            ...ADMIN_ONLY(
                {
                    title: t("Agreements"),
                    path: "/agreements",
                    icon: <HandshakeIcon fontSize="small" />,
                },
                isAdmin
            ),
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
            {
                title: t("Messages"),
                path: "/messages",
                icon: <ChatIcon />,
            },
        ],
    },
];

export default getSections;
