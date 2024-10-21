import { FC } from "react";
import { Stack } from "@mui/material";
import { CalendarCellProps, TCalendarEvent } from "../../types";
import CompactCalendarEvent from "../../Event/Compact";

const getEvent =
    (onEdit?: (id: string) => void, onDelete?: (id: string) => void) =>
    (e: TCalendarEvent) =>
        (
            <CompactCalendarEvent
                key={e.id}
                event={e}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        );

const CalendarMonthViewCell: FC<CalendarCellProps> = ({
    events,
    onEventEdit,
    onEventDelete,
}) => (
    <Stack
        height="300px"
        position="relative"
        border="1px solid"
        borderColor="divider"
        borderTop="none"
        borderRight="none"
        sx={{
            "&:nth-of-type(7n)": {
                borderRight: "1px solid",
                borderColor: "divider",
            },
        }}
    >
        {events.map(getEvent(onEventEdit, onEventDelete))}
    </Stack>
);

export default CalendarMonthViewCell;
