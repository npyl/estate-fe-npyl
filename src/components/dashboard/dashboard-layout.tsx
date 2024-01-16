import HomeIcon from "@mui/icons-material/Home";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";

import { Box, Button, Divider, Grid, MenuItem, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { FC, ReactNode, useState } from "react";
import StyledMenu from "../StyledMenu";
import { DashboardNavbar } from "./dashboard-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";
import Subbar from "./dashboard-subbar";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useTranslation } from "react-i18next";
import { BsPlusCircle } from "react-icons/bs";
import { Users as UsersIcon } from "../../icons/users";
import useAutosaveRouter from "../Router/Autosave";

interface DashboardLayoutProps {
    children?: ReactNode;
}

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
    display: "flex",
    flex: "1 1 auto",
    maxWidth: "100%",
    marginTop: 60,
    marginRight: "0",
    [theme.breakpoints.up("md")]: {
        paddingLeft: 200,
    },
}));

const propertyItemType = "property-menu-item";
const managerItemType = "manager-menu-item";
const ownerItemType = "owner-menu-item";
const labelItemType = "label-menu-item";

const itemTypeToPath: { [key: string]: string } = {
    [propertyItemType]: "/property/create",
    [ownerItemType]: "/customer/create",
    [labelItemType]: "/label",
    [managerItemType]: "/user/create",
};

const MENU_ITEMS = [
    {
        label: "Property",
        path: propertyItemType,
        icon: <HomeIcon />,
    },
    {
        label: "Customer",
        path: ownerItemType,
        icon: <UsersIcon />,
    },
    {
        label: "Label",
        path: labelItemType,
        icon: <LabelImportantIcon />,
    },
    {
        label: "Manager",
        path: managerItemType,
        icon: <ManageAccountsIcon />,
    },
];

export const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
    const { t } = useTranslation();
    const router = useAutosaveRouter();

    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const showDropdown = (event: React.MouseEvent<HTMLElement>) =>
        setAnchorEl(event.currentTarget);
    const hideDropdown = () => setAnchorEl(null);

    const startCreate = (itemType: string) =>
        router.push(itemTypeToPath[itemType]);

    return (
        <>
            <DashboardLayoutRoot>
                <Box
                    sx={{
                        display: "flex",
                        flex: "1 1 auto",
                        flexDirection: "column",
                        width: "100%",
                        paddingX: 2,
                    }}
                >
                    <Paper
                        sx={{
                            marginTop: 2,
                            padding: 1,
                        }}
                    >
                        <Grid container flex={1}>
                            <Grid
                                item
                                flex={1}
                                overflow={"hidden"}
                                paddingLeft={1}
                                paddingRight={1}
                            >
                                <Subbar />
                            </Grid>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "transparent",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<BsPlusCircle />}
                                    onClick={showDropdown}
                                    style={{
                                        color: "white",
                                        padding: "10px 20px",
                                        fontSize: "16px",
                                        borderRadius: "5px",
                                        boxShadow:
                                            "0 2px 5px rgba(0, 0, 0, 0.5)",
                                    }}
                                >
                                    {t("Create")}
                                </Button>
                            </Box>
                            <StyledMenu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={hideDropdown}
                            >
                                {MENU_ITEMS.map(({ label, path, icon }, i) => (
                                    <MenuItem
                                        key={i}
                                        onClick={() => {
                                            startCreate(path);
                                            hideDropdown();
                                        }}
                                        disableRipple
                                    >
                                        {icon}
                                        {t(label)}
                                    </MenuItem>
                                ))}
                            </StyledMenu>
                        </Grid>
                    </Paper>
                    {children}
                </Box>
            </DashboardLayoutRoot>
            <DashboardNavbar
                onOpenSidebar={(): void => setIsSidebarOpen(true)}
            />
            <DashboardSidebar
                onClose={(): void => setIsSidebarOpen(false)}
                open={isSidebarOpen}
            />
        </>
    );
};

DashboardLayout.propTypes = {
    children: PropTypes.node,
};
