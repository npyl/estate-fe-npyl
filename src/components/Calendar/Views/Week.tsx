import { FC } from "react";
import WeekView from "@/components/BaseCalendar/View/Week";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { WEEKDAYS } from "@/components/BaseCalendar/constants";
import Numbering from "./Numbering";
import { styled } from "@mui/material";
import { DAY_CELL_HEIGHT } from "./constant";
import {
    CalendarCellProps,
    CalendarWeekViewProps,
    TCalendarEvent,
} from "../types";
import CalendarEvent from "../Event";
import { _getTodaysEvents } from "./util";

// ----------------------------------------------------------------------

const getEvent = (ce: TCalendarEvent) => (
    <CalendarEvent key={ce.id} event={ce} />
);

// ----------------------------------------------------------------------

const StyledNumbering = styled(Numbering)({
    marginTop: DAY_CELL_HEIGHT,
});

// ----------------------------------------------------------------------

const CalendarWeekViewCell: FC<CalendarCellProps> = ({ events, date }) => (
    <Stack width={1}>
        <Typography
            textAlign="center"
            variant="h6"
            width={1}
            minHeight={DAY_CELL_HEIGHT}
            color="text.secondary"
        >
            {WEEKDAYS[date.getDay()]}
        </Typography>
        <Stack position="relative">
            {/* Events */}
            {events.map(getEvent)}
        </Stack>
    </Stack>
);

// -----------------------------------------------------------------------

const CalendarWeekView: FC<CalendarWeekViewProps> = ({
    events = [],
    getCellEvents = _getTodaysEvents,
    Cell: PassedCell,
    date,
    ...props
}) => {
    const Cell = PassedCell || CalendarWeekViewCell;

    return (
        <WeekView
            date={date}
            Cell={(props) => (
                <Cell {...props} events={getCellEvents(events, props.date)} />
            )}
            Numbering={StyledNumbering}
            {...props}
        />
    );
};

export default CalendarWeekView;
