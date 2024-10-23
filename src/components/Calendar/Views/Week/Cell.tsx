import { CSSProperties, FC } from "react";
import { CalendarCellProps, TCalendarEvent } from "../../types";
import CalendarEvent from "../../Event";

// -------------------------------------------------------------------------

const getEvent =
    (onClick?: (e: TCalendarEvent) => void) => (ce: TCalendarEvent) =>
        <CalendarEvent key={ce.id} event={ce} onClick={onClick} />;

// -------------------------------------------------------------------------

const CellStyle: CSSProperties = { position: "relative" };

const CalendarWeekViewCell: FC<CalendarCellProps> = ({
    events,
    onEventClick,
    style,
    ...props
}) => (
    <div style={{ ...CellStyle, ...style }} {...props}>
        {/* Events */}
        {events.map(getEvent(onEventClick))}
    </div>
);

export default CalendarWeekViewCell;
