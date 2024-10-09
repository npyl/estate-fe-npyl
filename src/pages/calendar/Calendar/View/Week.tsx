import getBorderColor from "@/theme/borderColor";
import { SxProps, Theme } from "@mui/material/styles";
import { WEEKDAYS } from "../constants";
import Grid from "@mui/material/Grid";

const ColumnSx: SxProps<Theme> = {
    padding: (theme) => theme.spacing(1),

    borderRight: "1px solid",
    borderColor: (theme) => getBorderColor(theme),
    "&:nth-of-type(7n)": {
        borderRight: "none",
    },

    textAlign: "center",
};

const WeekView = ({ date }: any) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());

    return (
        <Grid container>
            {/* Headers */}
            {WEEKDAYS.map((day, i) => {
                const dayDate = new Date(startOfWeek);
                dayDate.setDate(startOfWeek.getDate() + i);

                return (
                    <Grid key={day} item xs={12 / 7} sx={ColumnSx}>
                        {day} {dayDate.getDate()}
                    </Grid>
                );
            })}

            {/* Days */}
            {[...Array(7)].map((_, i) => {
                const day = new Date(startOfWeek);
                day.setDate(startOfWeek.getDate() + i);

                return (
                    <Grid key={i} item xs={12 / 7} height="200px">
                        ...
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default WeekView;
