import { alpha } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

const CompletedLabel = () => {
    const { t } = useTranslation();
    return (
        <Typography
            color="success.main"
            bgcolor={({ palette: { success } }) => alpha(success.main, 0.1)}
            variant="body2"
            borderRadius="5px"
            px={1}
        >
            {t("Completed")}
        </Typography>
    );
};

export default CompletedLabel;
