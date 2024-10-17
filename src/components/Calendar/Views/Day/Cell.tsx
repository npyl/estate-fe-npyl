import { FC } from "react";
import { CalendarCellProps, TCalendarEvent } from "../../types";
import dynamic from "next/dynamic";
const CalendarEvent = dynamic(() => import("../../Event"));

// ------------------------------------------------------------------

const getEvent = (ce: TCalendarEvent) => (
    <CalendarEvent key={ce.id} event={ce} />
);

// ------------------------------------------------------------------

const CalendarDayViewCell: FC<CalendarCellProps> = ({ events }) => (
    <>
        {/* Events */}
        {events.map(getEvent)}
    </>
);

export default CalendarDayViewCell;
