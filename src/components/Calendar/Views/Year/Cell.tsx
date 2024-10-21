import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { CalendarCellProps, TCalendarEvent } from "../../types";
import CompactCalendarEvent from "../../Event/Compact";

// ------------------------------------------------------------

const getEvent =
    (onEdit?: (e: TCalendarEvent) => void, onDelete?: (id: string) => void) =>
    (e: TCalendarEvent) =>
        (
            <CompactCalendarEvent
                key={e.id}
                event={e}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        );

// ------------------------------------------------------------

export const CalendarYearViewCell: FC<CalendarCellProps> = ({
    date,
    events,
    onEventEdit,
    onEventDelete,
}) => (
    <Stack>
        <Typography textAlign="center" variant="h6" color="text.secondary">
            {date.toLocaleString("default", {
                month: "long",
            })}
        </Typography>
        <Stack height="200px" position="relative">
            {events.map(getEvent(onEventEdit, onEventDelete))}
        </Stack>
    </Stack>
);

export default CalendarYearViewCell;
