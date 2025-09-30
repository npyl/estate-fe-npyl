import { CSSProperties, FC } from "react";
import { CalendarCellProps } from "../../../types";
import useTimemappedEvents from "../../useTimemappedEvents";
import { TODAY } from "@/components/BaseCalendar/constants";
import NowIndicator from "../../NowIndicator";
import dynamic from "next/dynamic";
import VerticalDivider from "./VerticalDivider";
import BaseCell from "../../BaseCell";
import WithNoDragClick from "@/components/Calendar/WithNoDragClick";
const MiscCell = dynamic(() => import("../../MiscCell"));

const Cell = WithNoDragClick(BaseCell);

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

    return (
        <div style={ContainerStyle}>
            {miscEvents.length > 0 ? <MiscCell events={miscEvents} /> : null}

            <Cell date={date} {...props}>
                {/* Events */}
                {EVENTS}

                {/* Today Indicator */}
                {isToday ? <NowIndicator /> : null}
            </Cell>

            <VerticalDivider />
        </div>
    );
};

export default CalendarWeekViewCell;
