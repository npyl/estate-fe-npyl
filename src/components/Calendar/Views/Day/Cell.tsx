import { FC } from "react";
import { CalendarCellProps, TCalendarEvent } from "../../types";
import dynamic from "next/dynamic";
const CalendarEvent = dynamic(() => import("../../Event"));

// ------------------------------------------------------------------

const getEvent =
    (onClick?: (e: TCalendarEvent) => void) => (ce: TCalendarEvent) =>
        <CalendarEvent key={ce.id} event={ce} onClick={onClick} />;

// ------------------------------------------------------------------

const CalendarDayViewCell: FC<CalendarCellProps> = ({
    events,
    onEventClick,
}) => (
    <>
        {/* Events */}
        {events.map(getEvent(onEventClick))}
    </>
);

export default CalendarDayViewCell;
