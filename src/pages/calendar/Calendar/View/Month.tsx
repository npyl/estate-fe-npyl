import { FC, useMemo } from "react";
import { WEEKDAYS } from "../constants";
import Grid from "@mui/material/Grid";
import ViewProps from "./types";

const daysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

const firstDayOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay();

const PlaceholderCell = () => <Grid item xs={12 / 7} bgcolor="grey.100" />;

const MonthView: FC<ViewProps> = ({ date }) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const daysBefore = useMemo(
        () => Array.from({ length: firstDayOfMonth(year, month) - 1 }),
        [year, month]
    );

    const actualDays = useMemo(
        () => Array.from({ length: daysInMonth(year, month) - 1 }),
        [year, month]
    );

    return (
        <Grid container>
            {/* Headers */}
            {WEEKDAYS.map((day) => (
                <Grid key={day} xs={12 / 7} p={1} textAlign="center">
                    {day}
                </Grid>
            ))}

            {/* Cells before start of month */}
            {daysBefore.map((_, i) => (
                <PlaceholderCell key={`empty-${i}`} />
            ))}

            {/* Actual days */}
            {actualDays.map((_, i) => (
                <Grid key={i} xs={12 / 7} height="200px">
                    {i}
                </Grid>
            ))}
        </Grid>
    );
};

export default MonthView;
