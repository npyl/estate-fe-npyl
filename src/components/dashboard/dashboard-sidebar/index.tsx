import {
    Box,
    Drawer,
    Link,
    Stack,
    Theme,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { FC, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Scrollbar } from "@/components/scrollbar";
import { DashboardSidebarSection } from "../dashboard-sidebar-section";
import { useGetProfileQuery } from "src/services/user";
import { useRouter } from "next/router";
import { LanguageButton } from "@/components/Language/LanguageButton";
import { SettingsButton } from "@/components/dashboard/settings-button";
import useResponsive from "@/hooks/useResponsive";
import getSections from "./getSections";

interface DashboardSidebarProps {
    onClose?: () => void;
    open?: boolean;
}

export const DashboardSidebar: FC<DashboardSidebarProps> = (props) => {
    const { onClose, open } = props;
    const router = useRouter();
    const { t } = useTranslation();
    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"), {
        noSsr: true,
    });

    const { data } = useGetProfileQuery();

    const isAdmin = data?.isAdmin ?? false;
    const withNotifications = data?.notificationsEnabled ?? false;

    const sections = useMemo(
        () => getSections(t, isAdmin, withNotifications),
        [t, isAdmin, withNotifications]
    );

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
                        {sections.map((section) => (
                            <DashboardSidebarSection
                                key={section.title}
                                path={router.asPath}
                                sx={{
                                    pt: 2,

                                    width: "100%",
                                    overflowY: "hidden",
                                    textWrap: "nowrap",
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
