import { TCalendarColor } from "@/components/Calendar/types";
import Grid from "@mui/material/Grid";
import RHFColorBox from "./RHFBox";

const getColorOption = (c: TCalendarColor) => (
    <Grid item xs={6} key={c.id}>
        <RHFColorBox c={c} />
    </Grid>
);

export default getColorOption;
