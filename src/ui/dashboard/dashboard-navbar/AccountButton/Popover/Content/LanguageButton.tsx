import LanguageImage from "@/assets/icons/language";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";
import { useSettings } from "@/hooks/use-settings";

const LanguageButton = () => {
    const { t, i18n } = useTranslation();
    const label = i18n.language === "el" ? "English" : "Greek";

    const { setLanguage } = useSettings();
    const toggleLanguage = () => {
        const next = i18n.language === "el" ? "en" : "el";
        setLanguage(next);
    };

    return (
        <MenuItem onClick={toggleLanguage}>
            <LanguageImage />
            <Typography fontWeight={500}>{t(label)}</Typography>
        </MenuItem>
    );
};

export default LanguageButton;
