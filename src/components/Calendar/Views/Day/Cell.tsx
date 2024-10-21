import { FC } from "react";
import { CalendarCellProps, TCalendarEvent } from "../../types";
import dynamic from "next/dynamic";
const CalendarEvent = dynamic(() => import("../../Event"));

// ------------------------------------------------------------------

const getEvent =
    (onEdit?: (e: TCalendarEvent) => void, onDelete?: (id: string) => void) =>
    (ce: TCalendarEvent) =>
        (
            <CalendarEvent
                key={ce.id}
                event={ce}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        );

// ------------------------------------------------------------------

const CalendarDayViewCell: FC<CalendarCellProps> = ({
    events,
    onEventEdit,
    onEventDelete,
}) => (
    <>
        {/* Events */}
        {events.map(getEvent(onEventEdit, onEventDelete))}
    </>
);

export default CalendarDayViewCell;
