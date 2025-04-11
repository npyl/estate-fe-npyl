import { useTranslation } from "react-i18next";
import ColumnSelect from "./Column";
import PriorityButtonGroup from "./Priority";
import Grid from "@mui/material/Unstable_Grid2";

const Buttons = () => {
    const { t } = useTranslation();

    return (
        <Grid container>
            <Grid xs={12} sm={6}>
                <ColumnSelect label={t("_Column_")} />
            </Grid>
            <Grid
                xs={12}
                sm={6}
                display="flex"
                justifyContent="flex-end"
                mt={{ xs: 2, sm: 0 }}
            >
                <PriorityButtonGroup />
            </Grid>
        </Grid>
    );
};

export default Buttons;
