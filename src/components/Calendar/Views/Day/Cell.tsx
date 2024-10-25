import { CSSProperties, FC } from "react";
import { CalendarCellProps, TCalendarEvent } from "../../types";
import dynamic from "next/dynamic";
const CalendarEvent = dynamic(() => import("../../Event"));

// ------------------------------------------------------------------

const getEvent =
    (onClick?: (e: TCalendarEvent) => void) => (ce: TCalendarEvent) =>
        <CalendarEvent key={ce.id} event={ce} onClick={onClick} />;

// ------------------------------------------------------------------

// INFO: this is important to act as a full-height container
const ViewStyle: CSSProperties = {
    height: "100%",
    position: "relative",
};

const CalendarDayViewCell: FC<CalendarCellProps> = ({
    date: _,
    events,
    onEventClick,
    style,
    ...props
}) => (
    <div style={{ ...ViewStyle, ...style }} {...props}>
        {/* Events */}
        {events.map(getEvent(onEventClick))}
    </div>
);

export default CalendarDayViewCell;
