import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

const AdminLabel = () => {
    const { t } = useTranslation();
    return (
        <Typography
            width={1}
            ml={2}
            variant="body2"
            bgcolor="#AF52DE"
            color="white"
            borderRadius="40px"
            px={1}
        >
            {t("Admin")}
        </Typography>
    );
};

export default AdminLabel;
