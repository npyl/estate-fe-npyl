import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";

import {
    Box,
    Button,
    Divider,
    Grid,
    MenuItem,
    Paper,
    Stack,
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
import { alpha } from "@mui/material/styles";
import { addTab } from "src/slices/tabs";
import { useDispatch } from "src/store";

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
    paddingTop: 60,
    marginRight: "0",
    [theme.breakpoints.up("md")]: {
        paddingLeft: 200,
    },
}));

export const DashboardLayout: FC<DashboardLayoutProps> = (props) => {
    const { children } = props;

    const dispatch = useDispatch();
    const { t } = useTranslation();
    const router = useRouter();

    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const propertyItemType = "property-menu-item";
    const managerItemType = "manager-menu-item";
    const ownerItemType = "owner-menu-item";
    const labelItemType = "label-menu-item";
    const notificationItemType = "notification-menu-item";

    interface tabConfigProp {
        title: string;
        path: string;
    }

    const showDropdown = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const hideDropdown = () => {
        setAnchorEl(null);
    };

    const startCreate = (
        event: React.MouseEvent<HTMLElement>,
        itemType: string
    ) => {
        var tabConfig: tabConfigProp;

        var title: string = "";
        var path: string = "";

        if (itemType === propertyItemType) {
            title = "Create Property";
            path = "/property/create";
        } else if (itemType === managerItemType) {
            title = "Create Manager";
            path = "/user/create";
        } else if (itemType === ownerItemType) {
            title = "Create Customer";
            path = "/customer/create";
        } else if (itemType === labelItemType) {
            title = "Create Label";
            path = "/label";
        } else if (itemType === notificationItemType) {
            title = "Create Notification";
            path = "/notification/create";
        }

        // tabConfig = {
        //     title: title,
        //     path: path,
        // };

        router.push(path);

        // dispatch(addTab(tabConfig));
    };

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
                        <Grid container>
                            <Grid item xs={10.5} marginTop={1}>
                                <Subbar />
                            </Grid>

                            <Grid
                                item
                                xs={1.5}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center", // This centers horizontally in case of flex direction row (which is default)
                                    alignItems: "center", // This centers vertically in case of flex direction row
                                    height: "100%", // Ensures that the flex container takes up the whole height of its parent
                                    marginTop: "10px",
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
                                        boxShadow: (theme) =>
                                            `0 3px 5px 2px ${alpha(
                                                theme.palette.primary.dark,
                                                0.3
                                            )}`,
                                        "&:hover": {
                                            backgroundImage:
                                                "linear-gradient(45deg, #1a237e 30%, #3f51b5 90%)",
                                            boxShadow: (theme) =>
                                                `0 3px 5px 2px ${alpha(
                                                    theme.palette.primary.dark,
                                                    0.3
                                                )}`,
                                        },
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
                                        startCreate(e, propertyItemType)
                                    }
                                    disableRipple
                                >
                                    <HomeIcon />
                                    {t("Property")}
                                </MenuItem>
                                <MenuItem
                                    onClick={(e) =>
                                        startCreate(e, ownerItemType)
                                    }
                                    disableRipple
                                >
                                    <UsersIcon fontSize="small" />
                                    {t("Customer")}
                                </MenuItem>
                                <MenuItem
                                    onClick={(e) =>
                                        startCreate(e, labelItemType)
                                    }
                                    disableRipple
                                >
                                    <LabelImportantIcon fontSize="small" />
                                    {t("Label")}
                                </MenuItem>
                                <MenuItem
                                    onClick={(e) =>
                                        startCreate(e, notificationItemType)
                                    }
                                    disableRipple
                                >
                                    <CircleNotifications fontSize="small" />
                                    {t("Notification")}
                                </MenuItem>
                                <Divider sx={{ my: 0.5 }} />
                                <MenuItem
                                    onClick={(e) =>
                                        startCreate(e, managerItemType)
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
