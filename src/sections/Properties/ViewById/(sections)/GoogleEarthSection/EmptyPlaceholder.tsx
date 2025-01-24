import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

const EmptyPlaceholder = () => {
    const { t } = useTranslation();
    return (
        <Typography variant="body2" color="text.secondary">
            {t("GOOGLE_EARTH_NOT_UPLOADED")}
        </Typography>
    );
};

export default EmptyPlaceholder;
