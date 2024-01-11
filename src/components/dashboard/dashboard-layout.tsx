import HomeIcon from "@mui/icons-material/Home";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";

import { Box, Button, Divider, Grid, MenuItem, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
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
const notificationItemType = "notification-menu-item";

const itemTypeToPath: { [key: string]: string } = {
    [propertyItemType]: "/property/create",
    [managerItemType]: "/user/create",
    [ownerItemType]: "/customer/create",
    [labelItemType]: "/label",
};

export const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
    const { t } = useTranslation();
    const router = useRouter();

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
                                id="create-menu"
                                MenuListProps={{
                                    "aria-labelledby": "create-menu-button",
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={hideDropdown}
                            >
                                <MenuItem
                                    onClick={(e) =>
                                        startCreate(propertyItemType)
                                    }
                                    disableRipple
                                >
                                    <HomeIcon />
                                    {t("Property")}
                                </MenuItem>
                                <MenuItem
                                    onClick={(e) => startCreate(ownerItemType)}
                                    disableRipple
                                >
                                    <UsersIcon fontSize="small" />
                                    {t("Customer")}
                                </MenuItem>
                                <MenuItem
                                    onClick={(e) => startCreate(labelItemType)}
                                    disableRipple
                                >
                                    <LabelImportantIcon fontSize="small" />
                                    {t("Label")}
                                </MenuItem>
                                <Divider sx={{ my: 0.5 }} />
                                <MenuItem
                                    onClick={(e) =>
                                        startCreate(managerItemType)
                                    }
                                    disableRipple
                                >
                                    <ManageAccountsIcon fontSize="small" />
                                    {t("Manager")}
                                </MenuItem>
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
