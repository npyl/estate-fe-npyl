import { CSSProperties, FC } from "react";
import { CalendarCellProps } from "../../types";
import useTimemappedEvents from "../useTimemappedEvents";
import { TODAY } from "@/components/BaseCalendar/constants";
import dynamic from "next/dynamic";
import MiscCell from "../MiscCell";
const NowIndicator = dynamic(() => import("../NowIndicator"));

// ------------------------------------------------------------------

// INFO: this is important to act as a full-height container
const ViewStyle: CSSProperties = {
    height: "100%",
    position: "relative",
    overflowX: "hidden", // INFO: NowIndicator overflows a bit on this view, because it is configured based on WeekView
};

const CalendarDayViewCell: FC<CalendarCellProps> = ({
    date,
    events: _events,
    getMiscCellEvents,
    onEventClick,
    onEventDragEnd,
    style,
    ...props
}) => {
    const [events, miscEvents] = getMiscCellEvents(_events);

    const EVENTS = useTimemappedEvents(events, onEventClick, onEventDragEnd);
    const isToday = TODAY.toDateString() === date.toDateString();

    return (
        <>
            {miscEvents.length > 0 ? <MiscCell events={miscEvents} /> : null}

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
        </>
    );
};

export default CalendarDayViewCell;
