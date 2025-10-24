import { RHFTextField } from "@/components/hook-form";
import RHFMultilineTextField from "@/components/hook-form/RHFTextFieldMultiline";
import RHFColorPicker from "@/components/hook-form/RHFColorPicker";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";

const Content = () => {
    const { t } = useTranslation();
    return (
        <Stack spacing={1}>
            <RHFTextField name="name" label={t("Name")} />
            <RHFMultilineTextField
                name="description"
                label={t("Description")}
                rows={5}
            />
            <RHFColorPicker name="color" />

            <Typography variant="h6">{t("Permissions")}</Typography>
        </Stack>
    );
};

export default Content;
