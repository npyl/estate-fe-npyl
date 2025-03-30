import { CSSProperties, FC } from "react";
import { CalendarCellProps } from "../../types";
import useTimemappedEvents from "../useTimemappedEvents";
import { TODAY } from "@/components/BaseCalendar/constants";
import NowIndicator from "../NowIndicator";

// -------------------------------------------------------------------------

const CellStyle: CSSProperties = { position: "relative" };

// -------------------------------------------------------------------------

const CalendarWeekViewCell: FC<CalendarCellProps> = ({
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
            style={{ ...CellStyle, ...style }}
            {...props}
        >
            {/* Events */}
            {EVENTS}

            {/* Today Indicator */}
            {isToday ? <NowIndicator /> : null}
        </div>
    );
};

export default CalendarWeekViewCell;
