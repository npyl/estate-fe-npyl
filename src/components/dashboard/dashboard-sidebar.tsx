import {
    AddOutlined,
    CircleNotifications,
    ConfirmationNumber,
    LabelImportant,
} from "@mui/icons-material";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import {
    Box,
    Drawer,
    Link,
    Stack,
    Theme,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { TFunction } from "i18next";
import { FC, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Home as HomeIcon } from "../../icons/home";
import { Users as UsersIcon } from "../../icons/users";
import { Scrollbar } from "../scrollbar";
import { DashboardSidebarSection } from "./dashboard-sidebar-section";
import { OrganizationPopover } from "./organization-popover";
import HistoryIcon from "@mui/icons-material/History";
import { useProfileQuery } from "src/services/user";
import { ChartPie } from "src/icons/chart-pie";
import { ChartLine as ChartLineIcon } from "src/icons/chart-line";
import { useRouter } from "next/router";
import { LanguageButton } from "../Language/LanguageButton";
import { SettingsButton } from "../settings-button";
import useResponsive from "@/hooks/useResponsive";
import CircleUnReadNotifications from "@/pages/notification/components/CircleUnReadNotifications";
import { useGetNonViewedNotificationsCountQuery } from "@/services/notification";

interface DashboardSidebarProps {
    onClose?: () => void;
    open?: boolean;
}

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
                title: t("Tickets"),
                path: "/tickets",
                icon: <ConfirmationNumber fontSize="small" />,
            },
            {
                title: t("Logs"),
                path: "/logs",
                icon: <HistoryIcon fontSize="small" />,
                adminOnly: true,
            },
            {
                title: t("Security"),
                path: "/security",
                icon: <UsersIcon fontSize="small" />,
                adminOnly: true,
            },
            // {
            //     title: t("Calendar"),
            //     path: "/calendar",
            //     icon: <EditCalendarIcon fontSize="small" />,
            // },
        ],
    },
];

export const DashboardSidebar: FC<DashboardSidebarProps> = (props) => {
    const { onClose, open } = props;
    const router = useRouter();
    const { t } = useTranslation();
    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"), {
        noSsr: true,
    });

    const isAdmin = useProfileQuery().data?.isAdmin ?? false;

    const { data: nonViewedNotificationsCount } =
        useGetNonViewedNotificationsCountQuery();
    console.log(nonViewedNotificationsCount);

    //  filter out the Contact notifications for now as in the page they are not shown and if there is one i get the unerad badge for something that i can not see at all
    const filteredNotificationsCount = useMemo(() => {
        if (nonViewedNotificationsCount) {
            const { CONTACT, ...rest } = nonViewedNotificationsCount.types;
            return Object.values(rest).reduce((sum, count) => sum + count, 0);
        }
        return 0;
    }, [nonViewedNotificationsCount]);

    const sections = useMemo(() => {
        const sectionsData = getSections(t, filteredNotificationsCount ?? 0);

        // Check if the user is not an admin (isAdmin is false)
        if (!isAdmin) {
            // Filter sections based on the adminOnly attribute
            return sectionsData.map((section) => ({
                ...section,
                items: section.items.filter((item) => !item.adminOnly),
            }));
        }

        // If the user is an admin, return all sections without filtering
        return sectionsData;
    }, [t, isAdmin, nonViewedNotificationsCount]);

    const organizationsRef = useRef<HTMLButtonElement | null>(null);
    const [openOrganizationsPopover, setOpenOrganizationsPopover] =
        useState<boolean>(false);

    const handlePathChange = () => {
        if (!router.isReady) {
            return;
        }

        if (open) {
            onClose?.();
        }
    };

    useEffect(
        handlePathChange,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [router.isReady, router.asPath]
    );

    const handleCloseOrganizationsPopover = (): void => {
        setOpenOrganizationsPopover(false);
    };

    const belowMd = useResponsive("down", "md");

    const content = (
        <>
            <Scrollbar
                sx={{
                    height: "100%",
                    "& .simplebar-content": {
                        height: "100%",
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                    }}
                >
                    <Box
                        sx={{
                            flexGrow: 1,
                            backgroundColor: "background.default",
                        }}
                    >
                        {sections.map((section, index) => (
                            <DashboardSidebarSection
                                key={section.title}
                                path={router.asPath}
                                sx={{
                                    height: "100vh",
                                    pt: 2,
                                    overflowY: "hidden",
                                }}
                                {...section}
                            />
                        ))}
                        {belowMd ? (
                            <Stack direction="row" justifyContent="center">
                                <LanguageButton />
                                <SettingsButton />
                            </Stack>
                        ) : null}
                    </Box>
                </Box>
            </Scrollbar>
            <OrganizationPopover
                anchorEl={organizationsRef.current}
                onClose={handleCloseOrganizationsPopover}
                open={openOrganizationsPopover}
            />
        </>
    );

    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        display: "absolute",
                        top: "64px",
                        backgroundColor: "#FFF",
                        border: 0,
                        color: "#FFFFFF",
                        width: 200,
                    },
                }}
                variant="permanent"
            >
                {content}
            </Drawer>
        );
    }

    return (
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    paddingTop: !open ? "100px" : 0,
                    width: 200,
                },
            }}
            sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
            variant="temporary"
        >
            {open && (
                <Stack p={2} alignItems="center">
                    <Link href="/">
                        <Typography variant="h5">PropertyPro</Typography>
                    </Link>
                </Stack>
            )}
            {content}
        </Drawer>
    );
};
