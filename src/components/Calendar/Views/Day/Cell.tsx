import { FC } from "react";
import { CalendarCellProps } from "../../types";
import useTimemappedEvents from "../useTimemappedEvents";
import { TODAY } from "@/components/BaseCalendar/constants";
import dynamic from "next/dynamic";
import MiscCell from "../MiscCell";
import BaseCell from "../BaseCell";
import WithNoDragClick from "../../WithNoDragClick";
const Cell = WithNoDragClick(BaseCell);
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

    return (
        <>
            {miscEvents.length > 0 ? (
                <MiscCell events={miscEvents} onEventClick={onEventClick} />
            ) : null}

            <Cell date={date} {...props}>
                {/* Events */}
                {EVENTS}

                {/* Today Indicator */}
                {isToday ? <NowIndicator /> : null}
            </Cell>
        </>
    );
};

export default CalendarDayViewCell;
