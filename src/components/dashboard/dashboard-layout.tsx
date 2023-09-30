import HomeIcon from "@mui/icons-material/Home";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";

import {
    Box,
    Button,
    Divider,
    Grid,
    MenuItem,
    Paper,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { FC, ReactNode, useState } from "react";
import StyledMenu from "../StyledMenu";
import { DashboardNavbar } from "./dashboard-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";
import Subbar from "./dashboard-subbar";

import { Users as UsersIcon } from "../../icons/users";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Add, CircleNotifications } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

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
    [notificationItemType]: "/notification/create",
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
                    }}
                >
                    <Paper
                        sx={{
                            marginTop: 2,
                            padding: 1,
                            overflowX: "auto",
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

                            <Grid
                                item
                                sx={{
                                    display: "flex",
                                    justifyContent: "center", // This centers horizontally in case of flex direction row (which is default)
                                    alignItems: "center", // This centers vertically in case of flex direction row
                                    height: "100%", // Ensures that the flex container takes up the whole height of its parent
                                }}
                            >
                                <Button
                                    sx={{
                                        minWidth: "100px",
                                        borderRadius: 1,
                                        fontFamily: "'Poppins', sans-serif",
                                        fontSize: "1em",
                                        color: "white",
                                        backgroundImage:
                                            "linear-gradient(45deg, #3f51b5 30%, #1a237e 90%)", // deep blue colors
                                    }}
                                    id="create-menu-button"
                                    aria-controls={
                                        open ? "create-menu" : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                    variant="contained"
                                    disableElevation
                                    startIcon={<Add />}
                                    onClick={showDropdown}
                                >
                                    <Typography>{t("Create")}</Typography>
                                </Button>
                            </Grid>
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
                                <MenuItem
                                    onClick={(e) =>
                                        startCreate(notificationItemType)
                                    }
                                    disableRipple
                                >
                                    <CircleNotifications fontSize="small" />
                                    {t("Notification")}
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
