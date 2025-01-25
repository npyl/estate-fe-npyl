import {
    Divider,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Stack,
    Typography,
} from "@mui/material";
import { UserCircle as UserCircleIcon } from "@/assets/icons/user-circle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "@/components/Link";
import { useTranslation } from "react-i18next";
import errorToast from "@/components/Toaster/error";
import { useAuth } from "@/hooks/use-auth";
import { useCallback } from "react";

const Content = () => {
    const { t } = useTranslation();
    const { logout } = useAuth();

    const handleLogout = useCallback(async () => {
        try {
            await logout();
            window.location.replace("/authentication/login");
        } catch (err) {
            console.error(err);
            errorToast("Unable to logout");
        }
    }, []);

    return (
        <>
            <Divider />
            <Stack spacing={1}>
                <Link href="/profile">
                    <MenuItem>
                        <ListItemIcon>
                            <UserCircleIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography variant="body1">
                                    {t("Profile")}
                                </Typography>
                            }
                        />
                    </MenuItem>
                </Link>
                <Link href="/settings">
                    <MenuItem>
                        <ListItemIcon>
                            <SettingsIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography variant="body1">
                                    {t("Settings")}
                                </Typography>
                            }
                        />
                    </MenuItem>
                </Link>
                <Divider />
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography variant="body1">
                                {t("Logout")}
                            </Typography>
                        }
                    />
                </MenuItem>
            </Stack>
        </>
    );
};

export default Content;
