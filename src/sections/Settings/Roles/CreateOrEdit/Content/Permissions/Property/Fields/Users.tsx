import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";
import { RHFCheckbox } from "@/components/hook-form";
import WithAll from "./WithAll";
import Typography from "@mui/material/Typography";
import RHFManagerMultipleAutocomplete from "@/ui/Autocompletes/RHFManagerMultiple";

const allName = "propertyPermissions.allUsers";

const WithAllPicker = WithAll(RHFManagerMultipleAutocomplete, allName);

const Users = () => {
    const { t } = useTranslation();
    return (
        <Grid container display="flex" alignItems="center">
            <Grid xs={3}>
                <Typography>{t("Users")}</Typography>
            </Grid>
            <Grid xs={9}>
                <RHFCheckbox label={t("All_Musculine")} name={allName} />
                <WithAllPicker name="propertyPermissions.users" />
            </Grid>
        </Grid>
    );
};

export default Users;
