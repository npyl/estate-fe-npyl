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
import PlusOneIcon from "@mui/icons-material/PlusOne"; // Import the new icon
import { relative } from "path";
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
                                border={1}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "11px",
                                    backgroundColor: "transparent",
                                    color: (theme) =>
                                        theme.palette.primary.main,
                                    border: (theme) =>
                                        `2px solid ${theme.palette.primary.main}`,
                                }}
                            >
                                <Box
                                    sx={{
                                        position: "relative",
                                        backgroundColor: (theme) =>
                                            theme.palette.grey[700],
                                        borderTopLeftRadius: 8,
                                        borderBottomLeftRadius: 8,
                                    }}
                                >
                                    <Add
                                        sx={{
                                            marginTop: "3px",
                                            marginBottom: "-3px",
                                            fontSize: "2em",
                                            color: "white",
                                            marginRight: "2px", // spacing between the icon and the button
                                        }}
                                    />
                                </Box>

                                <Button
                                    sx={{
                                        minWidth: "120px",
                                        fontFamily: "'Poppins', sans-serif",
                                        fontSize: "1.2em",
                                        backgroundColor: "transparent",
                                    }}
                                    disableElevation
                                    onClick={showDropdown}
                                >
                                    <Typography
                                        fontWeight={700}
                                        sx={{ fontSize: "0.9em" }}
                                    >
                                        {t("Create")}
                                    </Typography>
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
