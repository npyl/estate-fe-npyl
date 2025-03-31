import { CSSProperties, FC } from "react";
import { CalendarWeekViewCellProps } from "../../types";
import useTimemappedEvents from "../useTimemappedEvents";
import { TODAY } from "@/components/BaseCalendar/constants";
import NowIndicator from "../NowIndicator";
import dynamic from "next/dynamic";
const MiscCell = dynamic(() => import("../MiscCell"));

// -------------------------------------------------------------------------

const CellStyle: CSSProperties = { position: "relative" };

// -------------------------------------------------------------------------

const CalendarWeekViewCell: FC<CalendarWeekViewCellProps> = ({
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

export default CalendarWeekViewCell;
