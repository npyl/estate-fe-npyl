import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import Triplet from "./Triplet";
import Fields from "./Fields";

const Property = () => {
    const { t } = useTranslation();

    return (
        <Stack spacing={1}>
            <Typography variant="h6" color="text.secondary">
                {t("Property")}
            </Typography>
            <Triplet />
            <Stack spacing={2} pt={1}>
                <Fields />
            </Stack>
        </Stack>
    );
};

export default Property;
