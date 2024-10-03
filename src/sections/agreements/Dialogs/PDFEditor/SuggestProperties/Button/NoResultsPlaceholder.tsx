import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";

const NoResultsPlaceholder = () => {
    const { t } = useTranslation();

    return (
        <Stack alignItems="center" width={1}>
            <Alert severity="warning">
                {t("No results. This customer does not own any property!")}
            </Alert>
        </Stack>
    );
};

export default NoResultsPlaceholder;
