import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";

const Actions = () => {
    const { t } = useTranslation();
    return (
        <Stack direction="row" justifyContent="end">
            <Button fullWidth={false} variant="contained">
                {t("Save")}
            </Button>
        </Stack>
    );
};

export default Actions;
