import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

const Title = () => {
    const { t } = useTranslation();
    return (
        <Typography px={0.5} variant="h6">
            {t("Member")}
        </Typography>
    );
};

export default Title;
