import { CSSProperties, FC } from "react";
import { CalendarCellProps } from "../../types";
import useTimemappedEvents from "../useTimemappedEvents";
import { TODAY } from "@/components/BaseCalendar/constants";
import dynamic from "next/dynamic";
import MiscCell from "../MiscCell";
import { CELL_CLASSNAME } from "../../Event/Main/useDraggable";
const NowIndicator = dynamic(() => import("../NowIndicator"));

// ------------------------------------------------------------------

// INFO: this is important to act as a full-height container
const CellStyle: CSSProperties = {
    height: "100%",
    position: "relative",
};

const CalendarDayViewCell: FC<CalendarCellProps> = ({
    date,
    events: _events,
    getMiscCellEvents,
    onEventClick,
    onEventDragEnd,
    onEventResizeEnd,
    style,
    ...props
}) => {
    const [events, miscEvents] = getMiscCellEvents(_events);

    const EVENTS = useTimemappedEvents(
        events,
        // ...
        onEventClick,
        onEventDragEnd,
        onEventResizeEnd
    );
    const isToday = TODAY.toDateString() === date.toDateString();

    return (
        <>
            {miscEvents.length > 0 ? <MiscCell events={miscEvents} /> : null}

            <div
                className={CELL_CLASSNAME}
                data-date={date.toISOString()}
                style={{ ...CellStyle, ...style }}
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
