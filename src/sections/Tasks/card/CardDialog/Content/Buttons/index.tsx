import { useTranslation } from "react-i18next";
import ColumnSelect from "./Column";
import PriorityButtonGroup from "./Priority";
import Grid from "@mui/material/Grid";

const Buttons = () => {
    const { t } = useTranslation();

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
                <ColumnSelect label={t("_Column_")} />
            </Grid>
            <Grid item xs={12} sm={6} display="flex" justifyContent="flex-end">
                <PriorityButtonGroup />
            </Grid>
        </Grid>
    );
};

export default Buttons;
