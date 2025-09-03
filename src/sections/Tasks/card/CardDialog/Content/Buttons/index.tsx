import ColumnSelect from "./Column";
import PriorityButtonGroup from "./Priority";
import Grid from "@mui/material/Unstable_Grid2";

const Buttons = () => (
    <Grid container>
        <Grid xs={12} sm={6}>
            <ColumnSelect />
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

export default Buttons;
