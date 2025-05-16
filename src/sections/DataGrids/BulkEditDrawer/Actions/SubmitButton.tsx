import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const SubmitButton = () => {
    const { t } = useTranslation();

    return (
        <Button type="submit" variant="contained" color="secondary">
            {t("Save")}
        </Button>
    );
};

export default SubmitButton;
