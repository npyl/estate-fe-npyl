import {
    AppBar,
    AppBarProps,
    Box,
    ButtonBase,
    IconButton,
    Stack,
    Toolbar,
    Typography,
    useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import type { FC } from "react";
import { useRef, useState } from "react";
import { Menu as MenuIcon } from "../../assets/icons/menu";
import { UserCircle as UserCircleIcon } from "../../assets/icons/user-circle";
import { AccountPopover } from "./account-popover";
import { DashboardNavbarSearch } from "./dashboard-navbar-search";
import { LanguageButton } from "../Language/LanguageButton";
import { SettingsButton } from "../settings-button";
import LogoHorizontalLight from "@/assets/logo/horizontal/light";
import LogoHorizontalDark from "@/assets/logo/horizontal/dark";
import useResponsive from "@/hooks/useResponsive";
import Avatar from "@/components/Avatar";
import { useAuth } from "@/hooks/use-auth";

const StyledTypography = styled(Typography)`
    color: ${({ theme }) =>
        theme.palette.mode === "light"
            ? theme.palette.neutral![900]
            : theme.palette.grey[100]};
`;

const Logo = () => {
    const theme = useTheme();
    const Comp =
        theme.palette.mode === "light"
            ? LogoHorizontalLight
            : LogoHorizontalDark;
    return <Comp width="fit-content" height={64} />;
};

interface DashboardNavbarProps extends AppBarProps {
    onOpenSidebar?: () => void;
}

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    ...(theme.palette.mode === "light"
        ? {
              boxShadow: theme.shadows[3],
          }
        : {
              backgroundColor: theme.palette.background.paper,
              borderBottomColor: theme.palette.divider,
              borderBottomStyle: "solid",
              borderBottomWidth: 1,
              boxShadow: "none",
          }),

    position: "fixed", // Allow things to show on top of the AppBar
    zIndex: 200,
}));

const AccountButton = () => {
    const { user } = useAuth();

    const anchorRef = useRef<HTMLButtonElement | null>(null);
    const [openPopover, setOpenPopover] = useState<boolean>(false);

    const handleOpenPopover = () => setOpenPopover(true);
    const handleClosePopover = () => setOpenPopover(false);

    return (
        <>
            <Box
                component={ButtonBase}
                onClick={handleOpenPopover}
                ref={anchorRef}
                sx={{
                    alignItems: "center",
                    display: "flex",
                    ml: 2,
                }}
            >
                <Avatar
                    firstName={user?.firstName}
                    lastName={user?.lastName}
                    src={user?.avatar}
                    sx={{
                        height: 40,
                        width: 40,
                    }}
                />
            </Box>
            <AccountPopover
                anchorEl={anchorRef.current}
                onClose={handleClosePopover}
                open={openPopover}
            />
        </>
    );
};

export const DashboardNavbar: FC<DashboardNavbarProps> = (props) => {
    const { onOpenSidebar, ...other } = props;
    const belowMd = useResponsive("down", "md");

    return (
        <>
            <DashboardNavbarRoot
                sx={{
                    width: {
                        lg: "100%",
                    },
                }}
                {...other}
            >
                <Toolbar
                    disableGutters
                    sx={{
                        height: 64,
                        left: 0,
                        px: 2,
                        justifyContent: "space-between",
                    }}
                >
                    <Stack
                        sx={{
                            display: {
                                xs: "none",
                                md: "inherit",
                            },
                        }}
                        direction="row"
                        alignItems="center"
                    >
                        <Logo />

                        {/* nick ama to svhseis se gamhsa */}
                        {/* <Tooltip title="Alex Gamiesai file">
                            </Tooltip> */}
                        <StyledTypography variant="h6">v0.95</StyledTypography>
                    </Stack>

                    <IconButton
                        onClick={onOpenSidebar}
                        sx={{
                            display: {
                                xs: "inline-flex",
                                md: "none",
                            },
                        }}
                    >
                        <MenuIcon fontSize="small" />
                    </IconButton>
                    <DashboardNavbarSearch />
                    <Stack direction={"row"}>
                        {belowMd ? null : (
                            <>
                                <LanguageButton />

                                <SettingsButton />
                            </>
                        )}
                        <AccountButton />
                    </Stack>
                </Toolbar>
            </DashboardNavbarRoot>
        </>
    );
};
