import { FC } from "react";
import Stack from "@mui/material/Stack";
import { CalendarCellProps, TCalendarEvent } from "../../types";
import CalendarEvent from "../../Event";

// -------------------------------------------------------------------------

const getEvent =
    (onEdit?: (id: string) => void, onDelete?: (id: string) => void) =>
    (ce: TCalendarEvent) =>
        (
            <CalendarEvent
                key={ce.id}
                event={ce}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        );

// -------------------------------------------------------------------------

const CalendarWeekViewCell: FC<CalendarCellProps> = ({
    events,
    onEventEdit,
    onEventDelete,
}) => (
    <Stack position="relative">
        {/* Events */}
        {events.map(getEvent(onEventEdit, onEventDelete))}
    </Stack>
);

export default CalendarWeekViewCell;
