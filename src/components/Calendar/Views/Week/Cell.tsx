import { FC } from "react";
import Stack from "@mui/material/Stack";
import { CalendarCellProps, TCalendarEvent } from "../../types";
import CalendarEvent from "../../Event";

// -------------------------------------------------------------------------

const getEvent =
    (onClick?: (e: TCalendarEvent) => void) => (ce: TCalendarEvent) =>
        <CalendarEvent key={ce.id} event={ce} onClick={onClick} />;

// -------------------------------------------------------------------------

const CalendarWeekViewCell: FC<CalendarCellProps> = ({
    events,
    onEventClick,
}) => (
    <Stack position="relative">
        {/* Events */}
        {events.map(getEvent(onEventClick))}
    </Stack>
);

export default CalendarWeekViewCell;
