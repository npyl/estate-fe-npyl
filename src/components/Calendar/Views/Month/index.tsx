import { FC } from "react";
import Grid from "@mui/material/Grid";
import { BaseCalendarCellProps } from "@/components/BaseCalendar/types";
import MonthView from "@/components/BaseCalendar/View/Month";
import { Typography } from "@mui/material";
import { WEEKDAYS } from "@/components/BaseCalendar/constants";
import { CalendarMonthViewProps } from "../../types";
import { _getTodaysEvents } from "../util";
import dynamic from "next/dynamic";
const CalendarMonthViewCell = dynamic(() => import("./Cell"));

// --------------------------------------------------------------------------

const PlaceholderCell = () => <Grid item xs={12 / 7} bgcolor="grey.100" />;

// --------------------------------------------------------------------------

const HeadCell: FC<BaseCalendarCellProps> = ({ date }) => (
    <Typography textAlign="center" variant="h6" color="text.secondary">
        {WEEKDAYS[date.getDay()]}
    </Typography>
);

// --------------------------------------------------------------------------

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
