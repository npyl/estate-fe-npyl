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

// ----------------------------------------------------------------------

const getEvent = (ce: TCalendarEvent) => (
    <CalendarEvent key={ce.id} event={ce} />
);

// ----------------------------------------------------------------------

const StyledNumbering = styled(Numbering)({
    marginTop: DAY_CELL_HEIGHT,
});

// ----------------------------------------------------------------------

const Cell: FC<CalendarCellProps> = ({ events, date }) => {
    // INFO: filter today's events
    const todaysEvents = events.filter(
        (event) => event.startDate.toDateString() === date.toDateString()
    );

    return (
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
                {todaysEvents.map(getEvent)}
            </Stack>
        </Stack>
    );
};

const CalendarWeekView: FC<CalendarWeekViewProps> = ({ events = [], date }) => (
    <WeekView
        date={date}
        Cell={(props) => <Cell {...props} events={events} />}
        Numbering={StyledNumbering}
    />
);

export default CalendarWeekView;
