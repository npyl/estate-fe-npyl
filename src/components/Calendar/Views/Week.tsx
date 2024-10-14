import { FC } from "react";
import {
    BaseCalendarCellProps,
    BaseCalendarWeekViewProps,
} from "@/components/BaseCalendar/types";
import WeekView from "@/components/BaseCalendar/View/Week";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { WEEKDAYS } from "@/components/BaseCalendar/constants";
import Numbering from "./Numbering";
import { styled } from "@mui/material";
import { DAY_CELL_HEIGHT } from "./constant";
import { TCalendarEvent } from "../types";
import CalendarEvent from "../Event";
import fakeEvents from "./fakeEvents";

// ----------------------------------------------------------------------

const getEvent = (ce: TCalendarEvent) => (
    <CalendarEvent key={ce.id} event={ce} />
);

// ----------------------------------------------------------------------

const StyledNumbering = styled(Numbering)({
    marginTop: DAY_CELL_HEIGHT,
});

// ----------------------------------------------------------------------

const Cell: FC<BaseCalendarCellProps> = ({ date }) => {
    // INFO: filter today's events
    const events = fakeEvents.filter(
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
                {events.map(getEvent)}
            </Stack>
        </Stack>
    );
};

const CalendarWeekView: FC<BaseCalendarWeekViewProps> = ({ date }) => (
    <WeekView date={date} Cell={Cell} Numbering={StyledNumbering} />
);

export default CalendarWeekView;
