import { TCalendarColor } from "@/components/Calendar/types";
import Grid from "@mui/material/Grid";
import RHFColorBox from "./RHFBox";

const getColorOption =
    (onClick: (colorId: string) => void) => (c: TCalendarColor) =>
        (
            <Grid item xs={6} key={c.id}>
                <RHFColorBox c={c} onClick={onClick} />
            </Grid>
        );

export default getColorOption;
