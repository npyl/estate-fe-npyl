import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const NoOptions = () => {
    const { t } = useTranslation();
    return <Typography>{t("AUTOCOMPLETE_NO_OPTIONS")}</Typography>;
};

export default NoOptions;
