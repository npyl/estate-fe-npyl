import { CSSProperties, FC } from "react";
import { CalendarCellProps } from "../../types";
import useTimemappedEvents from "../useTimemappedEvents";
import { TODAY } from "@/components/BaseCalendar/constants";
import NowIndicator from "../NowIndicator";
import dynamic from "next/dynamic";
import Divider from "@mui/material/Divider";
import { Z_INDEX } from "@/constants/calendar";
const MiscCell = dynamic(() => import("../MiscCell"));

// -------------------------------------------------------------------------

const CellStyle: CSSProperties = { position: "relative", height: "100%" };

// -------------------------------------------------------------------------

const VerticalDivider = () => (
    <Divider
        orientation="vertical"
        sx={{
            position: "absolute",
            height: "100vh",
            zIndex: Z_INDEX.DIVIDER,
        }}
    />
);

// -------------------------------------------------------------------------

const CalendarWeekViewCell: FC<CalendarCellProps> = ({
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

                <VerticalDivider />
            </div>
        </>
    );
};

export default CalendarWeekViewCell;
