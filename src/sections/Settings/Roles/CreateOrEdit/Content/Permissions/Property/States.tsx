import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";
import RHFStateMultiplePicker from "@/ui/Pickers/RHF/StateMultiple";
import { RHFCheckbox } from "@/components/hook-form";
import WithAll from "./WithAll";
import Typography from "@mui/material/Typography";

const allName = "propertyPermissions.allStates";

const WithAllPicker = WithAll(RHFStateMultiplePicker, allName);

const States = () => {
    const { t } = useTranslation();
    return (
        <Grid container display="flex" alignItems="center">
            <Grid xs={3}>
                <Typography>{t("States")}</Typography>
            </Grid>
            <Grid xs={9}>
                <RHFCheckbox label={t("All")} name={allName} />
                <WithAllPicker name="propertyPermissions.states" />
            </Grid>
        </Grid>
    );
};

export default States;
