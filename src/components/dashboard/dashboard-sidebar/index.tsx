import {
    Drawer,
    Link,
    Stack,
    Theme,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { FC, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import SidebarSkeleton from "./SidebarSkeleton";
const Sections = dynamic(() => import("./Sections"), {
    loading: () => <SidebarSkeleton />,
});

interface DashboardSidebarProps {
    onClose?: () => void;
    open?: boolean;
}

export const DashboardSidebar: FC<DashboardSidebarProps> = ({
    onClose,
    open,
}) => {
    const router = useRouter();
    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"), {
        noSsr: true,
    });

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

    const content = useMemo(
        () => (
            <Stack height={1} bgcolor="background.default">
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
                    v0.98.4
                </Typography>
            </Stack>
        ),
        [router.asPath]
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
