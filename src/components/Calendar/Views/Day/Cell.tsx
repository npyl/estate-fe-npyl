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
    date: _,
    events,
    onEventClick,
    style,
    ...props
}) => {
    const EVENTS = useTimemappedEvents(events, onEventClick);
    return (
        <div style={{ ...ViewStyle, ...style }} {...props}>
            {/* Events */}
            {EVENTS}
        </div>
    );
};

export default CalendarDayViewCell;
