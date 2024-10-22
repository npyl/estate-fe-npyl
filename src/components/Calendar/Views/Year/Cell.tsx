import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { CalendarCellProps, TCalendarEvent } from "../../types";
import CompactCalendarEvent from "../../Event/Month";

// ------------------------------------------------------------

const getEvent =
    (onClick?: (e: TCalendarEvent) => void) => (e: TCalendarEvent) =>
        <CompactCalendarEvent key={e.id} event={e} onClick={onClick} />;

// ------------------------------------------------------------

export const CalendarYearViewCell: FC<CalendarCellProps> = ({
    date,
    events,
    onEventClick,
}) => (
    <Stack>
        <Typography textAlign="center" variant="h6" color="text.secondary">
            {date.toLocaleString("default", {
                month: "long",
            })}
        </Typography>
        <Stack height="200px" position="relative">
            {events.map(getEvent(onEventClick))}
        </Stack>
    </Stack>
);

export default CalendarYearViewCell;
