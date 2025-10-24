import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";
import RHFStateMultiplePicker from "@/ui/Pickers/RHF/StateMultiple";
import { RHFCheckbox } from "@/components/hook-form";
import WithAll from "./WithAll";
import Typography from "@mui/material/Typography";
const WithAllPicker = WithAll(RHFStateMultiplePicker, "allStates");

const States = () => {
    const { t } = useTranslation();
    return (
        <Grid container display="flex" alignItems="center">
            <Grid xs={1.5}>
                <Typography>{t("States")}</Typography>
            </Grid>
            <Grid xs={10.5}>
                <RHFCheckbox label={t("All")} name="allStates" />
                <WithAllPicker name="states" />
            </Grid>
        </Grid>
    );
};

export default States;
