import { FormControl, InputLabel, MenuItem } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";
import RHFTextField from "@/components/hook-form/RHFTextField";
import Select from "@/components/hook-form/Select";
import RHFSelect from "@/components/hook-form/RHFSelect";
import { useGlobals } from "@/hooks/useGlobals";

const PreferredLanguage = () => {
    const { t } = useTranslation();

    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel>{t("Preferred Language")}</InputLabel>
            <RHFSelect
                isEnum
                fullWidth
                name="preferredLanguage"
                label={t("Preferred Language")}
            >
                <MenuItem value="">{t("Not selected")}</MenuItem>
                <MenuItem value="ENGLISH">{t("English")}</MenuItem>
                <MenuItem value="GREEK">{t("Greek")}</MenuItem>
            </RHFSelect>
        </FormControl>
    );
};

const Nationality = () => {
    const { t } = useTranslation();

    const enums = useGlobals();
    const nationalitiesEnum = enums?.customer?.nationality || [];

    return (
        <Select
            isEnum
            name="nationality"
            label={t("Nationality")}
            options={nationalitiesEnum}
        />
    );
};

const Content = () => {
    const { t } = useTranslation();

    return (
        <Grid container spacing={1} mt={1}>
            <Grid xs={12} sm={6} display="flex" flexDirection="column" gap={1}>
                <RHFTextField
                    fullWidth
                    name="firstName"
                    label={t("First Name") + " *"}
                />

                <RHFTextField fullWidth name="email" label={t("Email")} />

                <RHFTextField
                    fullWidth
                    name="homePhone"
                    label={t("Home Phone")}
                />

                <Nationality />

                <RHFTextField
                    fullWidth
                    name="suggestedBy"
                    label={t("Suggested by")}
                />
            </Grid>
            <Grid xs={12} sm={6} display="flex" flexDirection="column" gap={1}>
                <RHFTextField
                    fullWidth
                    name="lastName"
                    label={t("Last Name") + " *"}
                />
                <RHFTextField
                    fullWidth
                    name="mobilePhone"
                    label={t("Mobile Phone")}
                />

                <RHFTextField fullWidth name="fax" label={t("Fax")} />

                <RHFTextField fullWidth name="position" label={t("Position")} />

                <PreferredLanguage />
            </Grid>
        </Grid>
    );
};

export default Content;
