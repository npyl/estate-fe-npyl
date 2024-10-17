import { FC } from "react";
import { Stack } from "@mui/material";
import { CalendarCellProps, TCalendarEvent } from "../../types";
import CompactCalendarEvent from "../../Event/Compact";

const getEvent = (e: TCalendarEvent) => (
    <CompactCalendarEvent key={e.id} event={e} />
);

const CalendarMonthViewCell: FC<CalendarCellProps> = ({ events }) => (
    <Stack height="300px" position="relative">
        {events.map(getEvent)}
    </Stack>
);

export default CalendarMonthViewCell;
