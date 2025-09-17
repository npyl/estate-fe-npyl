import { alpha, Theme } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

const getBgColor = ({ palette: { success } }: Theme) =>
    alpha(success.main, 0.1);

const CompletedLabel = () => {
    const { t } = useTranslation();
    return (
        <Typography
            color="success.main"
            bgcolor={getBgColor}
            variant="body2"
            borderRadius="5px"
            px={1}
            display={{
                xs: "none",
                md: "block",
            }}
        >
            {t("Completed")}
        </Typography>
    );
};

export default CompletedLabel;
