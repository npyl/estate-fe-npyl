import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

const Customer = () => {
    const { t } = useTranslation();

    return (
        <Typography variant="h6" color="text.secondary">
            {t("Customer")}
        </Typography>
    );
};

export default Customer;
