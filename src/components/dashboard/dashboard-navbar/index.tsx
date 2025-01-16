import {
    AppBar,
    AppBarProps,
    IconButton,
    Stack,
    Toolbar,
    Typography,
    useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import type { FC } from "react";
import { Menu as MenuIcon } from "@/assets/icons/menu";
import DashboardNavbarSearch from "@/components/dashboard/dashboard-navbar-search";
import LogoHorizontalLight from "@/assets/logo/horizontal/light";
import LogoHorizontalDark from "@/assets/logo/horizontal/dark";
import Link from "@/components/Link";
import CreateButton from "../CreateButton";
import AccountButton from "./account-button";
import { HideText } from "@/components/styled";

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
    return <Comp height={64} />;
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

const DashboardNavbar: FC<DashboardNavbarProps> = (props) => {
    const { onOpenSidebar, ...other } = props;

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
                        <Link
                            href="/"
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                        >
                            <Logo />
                        </Link>

                        {/* nick ama to svhseis se gamhsa */}
                        {/* <Tooltip title="Alex Gamiesai file">
                            </Tooltip> */}
                        <StyledTypography variant="h6">v0.97</StyledTypography>
                    </Stack>

                    <Stack
                        direction="row"
                        alignItems="center"
                        sx={{
                            display: {
                                xs: "flex",
                                md: "none",
                            },
                        }}
                    >
                        <IconButton onClick={onOpenSidebar}>
                            <MenuIcon fontSize="small" />
                        </IconButton>

                        <DashboardNavbarSearch />
                    </Stack>

                    <DashboardNavbarSearch
                        sx={{
                            display: { xs: "none", md: "flex" },
                        }}
                    />

                    <Stack alignItems="center" direction="row">
                        <CreateButton
                            sx={{
                                ml: 1,
                                ...HideText,
                            }}
                        />

                        <AccountButton />
                    </Stack>
                </Toolbar>
            </DashboardNavbarRoot>
        </>
    );
};

export default DashboardNavbar;
