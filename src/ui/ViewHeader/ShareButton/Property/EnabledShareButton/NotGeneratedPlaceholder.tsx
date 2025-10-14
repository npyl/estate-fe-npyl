import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

const NotGeneratedPlaceholder = () => {
    const { t } = useTranslation();
    return <Typography>{t("_PDF_NOT_GENERATED_")}</Typography>;
};

export default NotGeneratedPlaceholder;
