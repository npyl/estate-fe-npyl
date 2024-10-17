import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { CalendarCellProps, TCalendarEvent } from "../../types";
import CompactCalendarEvent from "../../Event/Compact";

// ------------------------------------------------------------

const getEvent = (e: TCalendarEvent) => (
    <CompactCalendarEvent key={e.id} event={e} />
);

// ------------------------------------------------------------

export const CalendarYearViewCell: FC<CalendarCellProps> = ({
    date,
    events,
}) => (
    <Stack>
        <Typography textAlign="center" variant="h6" color="text.secondary">
            {date.toLocaleString("default", {
                month: "long",
            })}
        </Typography>
        <Stack height="200px" position="relative">
            {events.map(getEvent)}
        </Stack>
    </Stack>
);

export default CalendarYearViewCell;
