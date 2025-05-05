import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

const RadiusPlaceholder = () => {
    const { t } = useTranslation();
    return <Typography>{t("VALUATION_SMALL_SAMPLE_")}</Typography>;
};

export default RadiusPlaceholder;
