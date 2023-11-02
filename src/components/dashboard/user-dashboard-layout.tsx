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
import { alpha } from "@mui/material/styles";

import { Users as UsersIcon } from "../../icons/users";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Add, CircleNotifications } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface UserDashboardLayoutProps {
    children?: ReactNode;
}

const UserDashboardLayoutRoot = styled("div")(({ theme }) => ({
    display: "flex",
    flex: "1 1 auto",
    maxWidth: "100%",
    paddingTop: 60,
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

export const UserDashboardLayout: FC<UserDashboardLayoutProps> = ({
    children,
}) => {
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
            <UserDashboardLayoutRoot>
                <Box
                    sx={{
                        display: "flex",
                        flex: "1 1 auto",
                        flexDirection: "column",
                        width: "100%",
                    }}
                >
                    {children}
                </Box>
            </UserDashboardLayoutRoot>
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

UserDashboardLayout.propTypes = {
    children: PropTypes.node,
};
