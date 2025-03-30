import { CSSProperties, FC } from "react";
import { CalendarCellProps } from "../../types";
import useTimemappedEvents from "../useTimemappedEvents";
import { TODAY } from "@/components/BaseCalendar/constants";
import dynamic from "next/dynamic";
const NowIndicator = dynamic(() => import("../NowIndicator"));

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
    const isToday = TODAY.toDateString() === date.toDateString();
    return (
        <div
            className="PPCell"
            data-date={date.toISOString()}
            style={{ ...ViewStyle, ...style }}
            {...props}
        >
            {/* Events */}
            {EVENTS}

            {/* Today Indicator */}
            {isToday ? <NowIndicator /> : null}
        </div>
    );
};

export default CalendarDayViewCell;
