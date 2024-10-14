import { FC } from "react";
import Grid from "@mui/material/Grid";
import {
    BaseCalendarCellProps,
    BaseCalendarMonthViewProps,
} from "@/components/BaseCalendar/types";
import MonthView from "@/components/BaseCalendar/View/Month";
import { Stack, Typography } from "@mui/material";
import { WEEKDAYS } from "@/components/BaseCalendar/constants";

const PlaceholderCell = () => <Grid item xs={12 / 7} bgcolor="grey.100" />;

const HeadCell: FC<BaseCalendarCellProps> = ({ date }) => (
    <Typography textAlign="center" variant="h6" color="text.secondary">
        {WEEKDAYS[date.getDay()]}
    </Typography>
);

const Cell: FC<BaseCalendarCellProps> = ({ date }) => {
    return <Stack height="300px">...</Stack>;
};

const CalendarMonthView: FC<BaseCalendarMonthViewProps> = ({ date }) => {
    return (
        <MonthView
            date={date}
            HeadCell={HeadCell}
            Cell={Cell}
            PlaceholderCell={PlaceholderCell}
        />
    );
};

export default CalendarMonthView;
