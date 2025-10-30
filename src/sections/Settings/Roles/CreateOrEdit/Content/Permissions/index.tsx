import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import Property from "./Property";
import Stack from "@mui/material/Stack";
import Customer from "./Customer";

const Permissions = () => {
    const { t } = useTranslation();

    return (
        <Stack>
            <Typography variant="h5">{t("Permissions")}</Typography>
            <Stack spacing={5}>
                <Property />
                <Customer />
            </Stack>
        </Stack>
    );
};

export default Permissions;
