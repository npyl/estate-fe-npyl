import { FC } from "react";
import Stack from "@mui/material/Stack";
import { CalendarCellProps, TCalendarEvent } from "../../types";
import CalendarEvent from "../../Event";

// -------------------------------------------------------------------------

const getEvent = (ce: TCalendarEvent) => (
    <CalendarEvent key={ce.id} event={ce} />
);

// -------------------------------------------------------------------------

const CalendarWeekViewCell: FC<CalendarCellProps> = ({ events }) => (
    <Stack position="relative">
        {/* Events */}
        {events.map(getEvent)}
    </Stack>
);

export default CalendarWeekViewCell;
