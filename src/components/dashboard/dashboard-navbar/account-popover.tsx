import LogoutIcon from "@mui/icons-material/Logout";
import {
    Divider,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Popover,
    Stack,
    Typography,
} from "@mui/material";
import { useCallback, type FC } from "react";
import { useAuth } from "@/hooks/use-auth";
import { UserCircle as UserCircleIcon } from "@/assets/icons/user-circle";
import { useTranslation } from "react-i18next";
import SettingsIcon from "@mui/icons-material/Settings";
import Link from "@/components/Link";
import errorToast from "@/components/Toaster/error";
import { LanguageButton } from "@/components/Language/LanguageButton";
import { SettingsButton } from "@/components/dashboard/settings-button";

interface AccountPopoverProps {
    anchorEl: null | Element;
    onClose?: () => void;
    open?: boolean;
}

const AccountPopover: FC<AccountPopoverProps> = (props) => {
    const { anchorEl, onClose, open, ...other } = props;
    const { user } = useAuth();
    const { t } = useTranslation();
    const { logout } = useAuth();

    const handleLogout = useCallback(async () => {
        try {
            onClose?.();
            await logout();
            window.location.replace("/authentication/login");
        } catch (err) {
            console.error(err);
            errorToast("Unable to logout");
        }
    }, []);

    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
                horizontal: "center",
                vertical: "bottom",
            }}
            disableScrollLock={true}
            keepMounted
            onClose={onClose}
            open
            slotProps={{
                paper: {
                    sx: {
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        py: 1,
                    },
                },
            }}
            {...other}
        >
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                mt={1}
            >
                <LanguageButton />
                <SettingsButton />
            </Stack>

            <Typography variant="body1" pb={1} px={1.5} textAlign="center">
                {user?.username}
            </Typography>

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
        </Popover>
    );
};

export default AccountPopover;
