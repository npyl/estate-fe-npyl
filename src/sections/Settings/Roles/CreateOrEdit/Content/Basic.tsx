import RHFColorPicker from "@/components/hook-form/RHFColorPicker";
import RHFTextField from "@/components/hook-form/RHFTextField";
import RHFMultilineTextField from "@/components/hook-form/RHFTextFieldMultiline";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";

const Basic = () => {
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
        </Stack>
    );
};

export default Basic;
