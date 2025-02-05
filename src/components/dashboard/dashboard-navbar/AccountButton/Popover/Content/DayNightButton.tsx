import { MenuItem, Typography } from "@mui/material";
import { useSettings } from "src/hooks/use-settings";
import { useTranslation } from "react-i18next";
import MoonIcon from "@/assets/icons/moon";
import SunIcon from "@/assets/icons/sun";

const DayNightButton = () => {
    const { t } = useTranslation();

    const { settings, saveSettings } = useSettings();
    const isLight = settings.theme === "light";

    const toggleMode = () =>
        saveSettings({
            ...settings,
            theme: isLight ? "dark" : "light",
        });

    return (
        <MenuItem onClick={toggleMode}>
            {isLight ? <MoonIcon /> : <SunIcon />}
            <Typography>{isLight ? t("Night") : t("Day")}</Typography>
        </MenuItem>
    );
};

export default DayNightButton;
