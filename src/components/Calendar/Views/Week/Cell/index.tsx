import { CSSProperties, FC } from "react";
import { CalendarCellProps } from "../../../types";
import useTimemappedEvents from "../../useTimemappedEvents";
import { TODAY } from "@/components/BaseCalendar/constants";
import NowIndicator from "../../NowIndicator";
import dynamic from "next/dynamic";
import VerticalDivider from "./VerticalDivider";
import useNoDragClick from "@/components/Calendar/useNoDragClick";
import BaseCell from "../../BaseCell";
const MiscCell = dynamic(() => import("../../MiscCell"));

// -------------------------------------------------------------------------

const ContainerStyle: CSSProperties = {
    position: "relative",
};

// -------------------------------------------------------------------------

const CalendarWeekViewCell: FC<CalendarCellProps> = ({
    date,
    events: _events,
    getMiscCellEvents,
    onEventClick,
    onEventDragStart,
    onEventDragEnd,
    onEventResizeStart,
    onEventResizeEnd,
    style,
    onClick,
    onMouseDown,
    onMouseMove,
    ...props
}) => {
    const [events, miscEvents] = getMiscCellEvents(_events);

    const EVENTS = useTimemappedEvents(
        events,
        onEventClick,
        onEventDragStart,
        onEventDragEnd,
        onEventResizeStart,
        onEventResizeEnd
    );
    const isToday = TODAY.toDateString() === date.toDateString();

    const methods = useNoDragClick(onClick, onMouseDown, onMouseMove);

    return (
        <div style={ContainerStyle}>
            {miscEvents.length > 0 ? <MiscCell events={miscEvents} /> : null}

            <BaseCell date={date} {...methods} {...props}>
                {/* Events */}
                {EVENTS}

                {/* Today Indicator */}
                {isToday ? <NowIndicator /> : null}
            </BaseCell>

            <VerticalDivider />
        </div>
    );
};

export default CalendarWeekViewCell;
