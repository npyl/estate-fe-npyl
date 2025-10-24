import { RHFTextField } from "@/components/hook-form";
import RHFMultilineTextField from "@/components/hook-form/RHFTextFieldMultiline";
import RHFColorPicker from "@/components/hook-form/RHFColorPicker";
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Unstable_Grid2";
import Permissions from "./Permissions";
import Stack from "@mui/material/Stack";

const Content = () => {
    const { t } = useTranslation();
    return (
        <Stack spacing={1} p={2}>
            <Grid container spacing={2}>
                <Grid
                    xs={12}
                    sm={10}
                    // ...
                    display="flex"
                    flexDirection="column"
                    gap={1}
                >
                    <RHFTextField name="name" label={t("Name")} />
                    <RHFMultilineTextField
                        name="description"
                        label={t("Description")}
                        rows={5}
                    />
                </Grid>
                <Grid xs={12} sm={2} p={3}>
                    <RHFColorPicker name="color" />
                </Grid>
            </Grid>
            <Permissions />
        </Stack>
    );
};

export default Content;
