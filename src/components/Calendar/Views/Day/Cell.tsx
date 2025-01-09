import { CSSProperties, FC } from "react";
import { CalendarCellProps } from "../../types";
import useTimemappedEvents from "../useTimemappedEvents";

// ------------------------------------------------------------------

// INFO: this is important to act as a full-height container
const ViewStyle: CSSProperties = {
    height: "100%",
    position: "relative",
};

const CalendarDayViewCell: FC<CalendarCellProps> = ({
    date,
    events,
    onEventClick,
    onEventDragEnd,
    style,
    ...props
}) => {
    const EVENTS = useTimemappedEvents(events, onEventClick, onEventDragEnd);
    return (
        <div
            className="PPCell"
            data-date={date.toISOString()}
            style={{ ...ViewStyle, ...style }}
            {...props}
        >
            {/* Events */}
            {EVENTS}
        </div>
    );
};

export default CalendarDayViewCell;
