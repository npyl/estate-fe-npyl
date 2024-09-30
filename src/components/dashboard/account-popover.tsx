import LogoutIcon from "@mui/icons-material/Logout";
import {
    Box,
    Divider,
    Link,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Popover,
    Typography,
} from "@mui/material";
import type { FC } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/use-auth";
import { UserCircle as UserCircleIcon } from "../../assets/icons/user-circle";
import { useTranslation } from "react-i18next";

interface AccountPopoverProps {
    anchorEl: null | Element;
    onClose?: () => void;
    open?: boolean;
}

export const AccountPopover: FC<AccountPopoverProps> = (props) => {
    const { anchorEl, onClose, open, ...other } = props;
    const { user } = useAuth();
    const { t } = useTranslation();
    const { logout } = useAuth();

    const handleLogout = async (): Promise<void> => {
        try {
            onClose?.();
            await logout();
            window.location.replace("/authentication/login");
        } catch (err) {
            console.error(err);
            toast.error(t("Unable to logout"));
        }
    };
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
            open={!!open}
            PaperProps={{ sx: { width: 300 } }}
            transitionDuration={0}
            {...other}
        >
            <Box
                sx={{
                    alignItems: "center",
                    p: 2,
                    display: "flex",
                }}
            >
                <Box
                    sx={{
                        ml: 1,
                    }}
                >
                    <Typography variant="body1">{user?.username}</Typography>
                </Box>
            </Box>
            <Divider />
            <Box sx={{ my: 1 }}>
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
            </Box>
        </Popover>
    );
};
