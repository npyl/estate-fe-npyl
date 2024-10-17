import { FC } from "react";
import Grid from "@mui/material/Grid";
import { BaseCalendarCellProps } from "@/components/BaseCalendar/types";
import MonthView from "@/components/BaseCalendar/View/Month";
import { Stack, Typography } from "@mui/material";
import { WEEKDAYS } from "@/components/BaseCalendar/constants";
import { CalendarCellProps, CalendarMonthViewProps } from "../types";
import { _getTodaysEvents } from "./util";

// --------------------------------------------------------------------------

const PlaceholderCell = () => <Grid item xs={12 / 7} bgcolor="grey.100" />;

// --------------------------------------------------------------------------

const HeadCell: FC<BaseCalendarCellProps> = ({ date }) => (
    <Typography textAlign="center" variant="h6" color="text.secondary">
        {WEEKDAYS[date.getDay()]}
    </Typography>
);

// --------------------------------------------------------------------------

const CalendarMonthViewCell: FC<CalendarCellProps> = ({ events, date }) => {
    return <Stack height="300px">...</Stack>;
};

// --------------------------------------------------------------------------

const CalendarMonthView: FC<CalendarMonthViewProps> = ({
    events = [],
    Cell: PassedCell,
    date,
    getCellEvents = _getTodaysEvents,
    ...props
}) => {
    const Cell = PassedCell || CalendarMonthViewCell;

    return (
        <MonthView
            date={date}
            HeadCell={HeadCell}
            Cell={(props) => (
                <Cell {...props} events={getCellEvents(events, props.date)} />
            )}
            PlaceholderCell={PlaceholderCell}
            {...props}
        />
    );
};

export default CalendarMonthView;
