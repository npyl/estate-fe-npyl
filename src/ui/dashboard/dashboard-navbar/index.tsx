import {
    AppBar,
    AppBarProps,
    IconButton,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import type { FC } from "react";
import { Menu as MenuIcon } from "@/assets/icons/menu";
import DashboardNavbarSearch from "@/ui/dashboard/dashboard-navbar-search";
import Link from "@/components/Link";
import CreateButton from "../CreateButton";
import { HideText } from "@/components/styled";
import dynamic from "next/dynamic";
import AccountLoader from "./AccountLoader";
const AccountButton = dynamic(() => import("./AccountButton"), {
    loading: () => <AccountLoader />,
});

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

    [theme.breakpoints.up("lg")]: {
        width: "100%",
    },

    position: "fixed",
}));

const DashboardNavbar: FC<DashboardNavbarProps> = (props) => {
    const { onOpenSidebar, ...other } = props;

    return (
        <DashboardNavbarRoot {...other}>
            <Toolbar
                disableGutters
                sx={{
                    height: 64,
                    left: 0,
                    px: 2,
                    pl: 4,
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
                        {/* <Logo /> */}

                        <Typography
                            color={"#3366FF"}
                            variant="h6"
                            fontWeight={"bold"}
                        >
                            property-pro
                            <span style={{ color: "#0380fc" }}>.gr</span>
                        </Typography>
                    </Link>
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
                            mx: 1,
                            ...HideText,
                        }}
                    />

                    <AccountButton />
                </Stack>
            </Toolbar>
        </DashboardNavbarRoot>
    );
};

export default DashboardNavbar;
