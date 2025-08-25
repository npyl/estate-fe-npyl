import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

const ErrorMessage = () => {
    const { t } = useTranslation();
    return <Typography>{t("_NOT_GOOGLE_WORKSPACE_USER_")}</Typography>;
};

export default ErrorMessage;
