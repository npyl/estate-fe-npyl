import { CSSProperties, FC } from "react";
import { CalendarCellProps } from "../../types";
import useTimemappedEvents from "../useTimemappedEvents";

// -------------------------------------------------------------------------

const CellStyle: CSSProperties = { position: "relative" };

// -------------------------------------------------------------------------

const CalendarWeekViewCell: FC<CalendarCellProps> = ({
    date: _,
    events,
    onEventClick,
    onEventDragEnd,
    style,
    ...props
}) => {
    const EVENTS = useTimemappedEvents(events, onEventClick, onEventDragEnd);
    return (
        <div style={{ ...CellStyle, ...style }} {...props}>
            {/* Events */}
            {EVENTS}
        </div>
    );
};

export default CalendarWeekViewCell;
