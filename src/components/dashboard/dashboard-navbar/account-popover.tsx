import {
    Divider,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Stack,
    Typography,
} from "@mui/material";
import { forwardRef, useCallback } from "react";
import { useAuth } from "@/hooks/use-auth";
import { UserCircle as UserCircleIcon } from "@/assets/icons/user-circle";
import { useTranslation } from "react-i18next";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "@/components/Link";
import errorToast from "@/components/Toaster/error";
import { LanguageButton } from "@/components/Language/LanguageButton";
import { SettingsButton } from "@/components/dashboard/settings-button";
import GrowingPopover from "@/components/GrowingPopover";
import Avatar, { AvatarProps } from "@/components/Avatar";

const AvatarButton = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
    const { user } = useAuth();

    return (
        <Avatar
            ref={ref}
            firstName={user?.firstName}
            lastName={user?.lastName}
            src={user?.avatar}
            sx={{
                height: 40,
                width: 40,
            }}
            {...props}
        />
    );
});

const Header = () => {
    const { user } = useAuth();

    return (
        <Stack width="fit-content" py={0.5} px={1}>
            <Typography
                variant="subtitle1"
                textAlign="center"
                noWrap
                width="fit-content"
                color="text.secondary"
            >
                {user?.username}
            </Typography>

            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                ml={5}
            >
                <LanguageButton />
                <SettingsButton />
            </Stack>
        </Stack>
    );
};

const AccountPopover = () => {
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
        <GrowingPopover HeadContentLeft={Header} Opener={AvatarButton}>
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
        </GrowingPopover>
    );
};

export default AccountPopover;
