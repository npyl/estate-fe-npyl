import YearView from "@/components/BaseCalendar/View/Year";
import { FC } from "react";
import { CalendarYearViewProps } from "../../types";
import { _getMiscCellEvents, _getTodaysEvents } from "../util";
import dynamic from "next/dynamic";
const CalendarYearViewCell = dynamic(() => import("./Cell"));

// ------------------------------------------------------------

const Year: FC<CalendarYearViewProps> = ({
    events = [],
    miscEvents: _0,
    Cell: PassedCell,
    date,
    // ...
    getCellEvents = _getTodaysEvents,
    getMiscCellEvents = _getMiscCellEvents,
    onEventClick,
    onEventDragStart: _1,
    onEventDragEnd: _2,
    onEventResizeStart: _3,
    onEventResizeEnd: _4,
    // ...
    ...props
}) => {
    const Cell = PassedCell || CalendarYearViewCell;

    return (
        <YearView
            date={date}
            Cell={(props) => (
                <Cell
                    {...props}
                    events={getCellEvents(events, props.date)}
                    getMiscCellEvents={getMiscCellEvents}
                    onEventClick={onEventClick}
                />
            )}
            {...props}
        />
    );
};

export default Year;
