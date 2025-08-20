import { CSSProperties, FC } from "react";
import { CalendarCellProps } from "../../types";
import useTimemappedEvents from "../useTimemappedEvents";
import { TODAY } from "@/components/BaseCalendar/constants";
import dynamic from "next/dynamic";
import MiscCell from "../MiscCell";
import useNoDragClick from "@/components/Calendar/useNoDragClick";
import BaseCell from "../BaseCell";
const NowIndicator = dynamic(() => import("../NowIndicator"));

// ------------------------------------------------------------------

const CalendarDayViewCell: FC<CalendarCellProps> = ({
    date,
    events: _events,
    getMiscCellEvents,
    onEventClick,
    onEventDragStart,
    onEventDragEnd,
    onEventResizeStart,
    onEventResizeEnd,
    onClick,
    onMouseDown,
    onMouseMove,
    ...props
}) => {
    const [events, miscEvents] = getMiscCellEvents(_events);

    const EVENTS = useTimemappedEvents(
        events,
        // ...
        onEventClick,
        onEventDragStart,
        onEventDragEnd,
        onEventResizeStart,
        onEventResizeEnd
    );
    const isToday = TODAY.toDateString() === date.toDateString();

    const methods = useNoDragClick(onClick, onMouseDown, onMouseMove);

    return (
        <>
            {miscEvents.length > 0 ? <MiscCell events={miscEvents} /> : null}

            <BaseCell date={date} {...methods} {...props}>
                {/* Events */}
                {EVENTS}

                {/* Today Indicator */}
                {isToday ? <NowIndicator /> : null}
            </BaseCell>
        </>
    );
};

export default CalendarDayViewCell;
