import { Divider, MenuItem, Typography } from "@mui/material";
import { UserCircle as UserCircleIcon } from "@/assets/icons/user-circle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "@/components/Link";
import { useTranslation } from "react-i18next";
import { errorToast } from "@/components/Toaster";
import { useAuth } from "@/hooks/use-auth";
import { useCallback } from "react";
import LanguageButton from "./LanguageButton";
import DayNightButton from "./DayNightButton";
import dynamic from "next/dynamic";
const AdminLabel = dynamic(() => import("@/sections/User/AdminLabel"));

const Content = () => {
    const { t } = useTranslation();

    const { user, logout } = useAuth();
    const isAdmin = user?.isAdmin;

    const handleLogout = useCallback(async () => {
        try {
            await logout();
        } catch (err) {
            console.error(err);
            errorToast("Unable to logout");
        }
    }, []);

    return (
        <>
            <Divider sx={{ my: 1 }} />

            <Link href="/profile">
                <MenuItem>
                    <UserCircleIcon fontSize="small" />
                    <Typography variant="body1" width={1} fontWeight={500}>
                        {t("Profile")}
                    </Typography>
                    {isAdmin ? <AdminLabel /> : null}
                </MenuItem>
            </Link>
            <Link href="/settings">
                <MenuItem>
                    <SettingsIcon fontSize="small" />
                    <Typography variant="body1" fontWeight={500}>
                        {t("Settings")}
                    </Typography>
                </MenuItem>
            </Link>

            <LanguageButton />
            <DayNightButton />

            <Divider sx={{ my: 1 }} />

            <MenuItem onClick={handleLogout}>
                <LogoutIcon fontSize="small" />
                <Typography variant="body1" fontWeight={500}>
                    {t("Logout")}
                </Typography>
            </MenuItem>
        </>
    );
};

export default Content;
