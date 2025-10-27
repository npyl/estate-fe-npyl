import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import Property from "./Property";
import Stack from "@mui/material/Stack";

const Permissions = () => {
    const { t } = useTranslation();

    return (
        <>
            <Typography variant="h5">{t("Permissions")}</Typography>
            <Stack spacing={5}>
                <Property />
                {/* <Customer /> */}
            </Stack>
        </>
    );
};

export default Permissions;
