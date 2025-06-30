import {
    Drawer,
    Link,
    Stack,
    Theme,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { FC, PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import SidebarSkeleton from "./SidebarSkeleton";
const Sections = dynamic(() => import("./Sections"), {
    loading: () => <SidebarSkeleton />,
});

interface ResponsiveDrawerProps extends PropsWithChildren {
    open?: boolean;
    onClose?: VoidFunction;
}

const ResponsiveDrawer: FC<ResponsiveDrawerProps> = ({
    open,
    onClose,
    children,
}) => {
    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"), {
        noSsr: true,
    });

    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        top: ({ layout }) => layout.nav.topbarHeight,
                        backgroundColor: "background.default",
                        border: 0,
                        color: "#FFFFFF",
                        width: ({ layout }) => layout.nav.sidebarWidth,
                        // INFO: support scrolling vertically when display is too small
                        pb: ({ layout }) => `${layout.nav.topbarHeight}px`,

                        zIndex: ({ zIndex }) => zIndex.sidebar,
                    },
                }}
                variant="permanent"
            >
                {children}
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
                    width: ({ layout }) => layout.nav.sidebarWidth,
                    zIndex: ({ zIndex }) => zIndex.sidebar,
                },
            }}
            variant="temporary"
        >
            {open && (
                <Stack p={2} alignItems="center">
                    <Link href="/">
                        <Typography variant="h5">PropertyPro</Typography>
                    </Link>
                </Stack>
            )}
            {children}
        </Drawer>
    );
};

interface DashboardSidebarProps {
    onClose?: () => void;
    open?: boolean;
}

export const DashboardSidebar: FC<DashboardSidebarProps> = ({
    onClose,
    open,
}) => {
    const router = useRouter();

    const handlePathChange = () => {
        if (!router.isReady) {
            return;
        }

        if (open) {
            onClose?.();
        }
    };

    // WARN: Do not change the deps; they are intentionally left like so in order not to mess up the `open` state behavior
    // TODO: change this bs...
    useEffect(handlePathChange, [router.isReady, router.asPath]);

    return (
        <ResponsiveDrawer open={open} onClose={onClose}>
            <Sections currentPath={router.asPath} />

            {/* nick ama to svhseis se gamhsa */}
            {/* <Tooltip title="Alex Gamiesai file">
                            </Tooltip> */}
            <Typography
                mt={3}
                variant="body2"
                textAlign="center"
                color="text.secondary"
            >
                v0.99.6
            </Typography>
        </ResponsiveDrawer>
    );
};
