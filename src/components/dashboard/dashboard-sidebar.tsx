import {
    CircleNotifications,
    ConfirmationNumber,
    Email,
    LabelImportant,
} from "@mui/icons-material";

import {
    Box,
    Drawer,
    Link,
    Theme,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { TFunction } from "i18next";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Home as HomeIcon } from "../../icons/home";
import { Users as UsersIcon } from "../../icons/users";
import { Scrollbar } from "../scrollbar";
import { DashboardSidebarSection } from "./dashboard-sidebar-section";
import { OrganizationPopover } from "./organization-popover";
import HistoryIcon from "@mui/icons-material/History";
interface DashboardSidebarProps {
    onClose?: () => void;
    open?: boolean;
}

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

const getSections = (t: TFunction): Section[] => [
    {
        title: t("main"),
        items: [
            {
                title: t("Properties"),
                path: "/",
                icon: <HomeIcon fontSize="small" />,
            },

            {
                title: t("Customers"),
                path: "/customer",
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
                icon: <CircleNotifications fontSize="small" />,
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
            },

            {
                title: t("Security"),
                path: "/security",
                icon: <UsersIcon fontSize="small" />,
            },
            // {
            //     title: t("Developers"),
            //     path: "/",
            //     icon: <ManageAccounts fontSize="small" />,
            // },
            // {
            //     title: t("Agents"),
            //     path: "/",
            //     icon: <LabelImportant fontSize="small" />,
            // },
            // {
            //     title: t("Deals"),
            //     path: "/",
            //     icon: <Handshake fontSize="small" />,
            // },

            // {
            //     title: t("Activities"),
            //     path: "/",
            //     icon: <LabelImportant fontSize="small" />,
            // },
            // {
            //     title: t("Matches"),
            //     path: "/",
            //     icon: <JoinRight fontSize="small" />,
            // },
            // {
            //     title: t("Reports"),
            //     path: "/",
            //     icon: <LabelImportant fontSize="small" />,
            // },
            // {
            //     title: t("Audit Log"),
            //     path: "/",
            //     icon: <EventNote fontSize="small" />,
            // },
            // {
            //     title: t("Admin"),
            //     path: "/",
            //     icon: <AdminPanelSettings fontSize="small" />,
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
    const sections = useMemo(() => getSections(t), [t]);
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
                                    mt: 2,
                                    "& + &": {
                                        mt: 2,
                                    },
                                }}
                                {...section}
                            />
                        ))}
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

                    color: "#FFFFFF",
                    width: 200,
                },
            }}
            sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
            variant="temporary"
        >
            {open && (
                <Box p={2}>
                    <Link href="/">
                        <Typography color="neutral.900" variant={"h5"}>
                            PropertyPro
                        </Typography>
                    </Link>
                </Box>
            )}
            {content}
        </Drawer>
    );
};
