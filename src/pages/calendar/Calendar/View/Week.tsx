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
            {WEEKDAYS.map((day) => (
                <Grid key={day} item xs={12 / 7} sx={ColumnSx}>
                    {day}
                </Grid>
            ))}
            {/* {[...Array(7)].map((_, i) => {
                const day = new Date(startOfWeek);
                day.setDate(startOfWeek.getDate() + i);
                return (
                    <div
                        key={i}
                        style={{
                            border: "1px solid black",
                            padding: "5px",
                        }}
                    >
                        {day.getDate()}
                    </div>
                );
            })} */}
        </Grid>
    );
};

export default WeekView;
