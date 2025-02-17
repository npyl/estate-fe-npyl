import { LabelImportant } from "@mui/icons-material";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { TFunction } from "i18next";
import { ReactNode } from "react";
import HomeIcon from "@/assets/icons/home";
import CustomersIcon from "@/assets/icons/customers";
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

const WITH = (i: Item, onOff: boolean) => (onOff ? [i] : []);

const getSections = (
    t: TFunction,
    isAdmin: boolean,
    notifications: boolean,
    agreements: boolean,
    messages: boolean,
    tasks: boolean
): Section[] => [
    {
        title: t("main"),
        items: [
            {
                title: t("Dashboard"),
                path: "/",
                icon: <ChartPie fontSize="small" />,
            },

            // ---------------------------------------------
            ...WITH(
                {
                    title: t("Statistics"),
                    path: "/statistics",
                    icon: <ChartLineIcon fontSize="small" />,
                },
                isAdmin
            ),
            // ---------------------------------------------

            {
                title: t("Properties"),
                path: "/property",
                icon: <HomeIcon fontSize="small" />,
            },

            {
                title: t("Customers"),
                path: "/customers",
                icon: <CustomersIcon fontSize="small" />,
            },

            {
                title: t("Labels"),
                path: "/label",
                icon: <LabelImportant fontSize="small" />,
            },

            // ---------------------------------------------
            ...WITH(
                {
                    title: t("Notifications"),
                    path: "/notification",
                    icon: <NotificationsIcon />,
                },
                notifications
            ),
            // ---------------------------------------------
            ...WITH(
                {
                    title: t("Tasks"),
                    path: "/tasks",
                    icon: <TasksIconWithCounter />,
                },
                tasks
            ),
            // ---------------------------------------------
            ...WITH(
                {
                    title: t("Logs"),
                    path: "/logs",
                    icon: <HistoryIcon fontSize="small" />,
                },
                isAdmin
            ),
            // ---------------------------------------------
            ...WITH(
                {
                    title: t("Agreements"),
                    path: "/agreements",
                    icon: <HandshakeIcon fontSize="small" />,
                },
                agreements
            ),
            // ---------------------------------------------

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

            // ---------------------------------------------
            ...WITH(
                {
                    title: t("Messages"),
                    path: "/messages",
                    icon: <ChatIcon />,
                },
                messages
            ),
        ],
    },
];

export default getSections;
