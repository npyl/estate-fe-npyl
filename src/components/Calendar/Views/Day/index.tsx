import { FC } from "react";
import { CalendarDayViewProps } from "../../types";
import dynamic from "next/dynamic";
import DayView from "@/components/BaseCalendar/View/Day";
import { _getMiscCellEvents, _getTodaysEvents } from "../util";
const DefaultNumbering = dynamic(() => import("../Numbering"));
const CalendarDayViewCell = dynamic(() => import("./Cell"));

const CalendarDayView: FC<CalendarDayViewProps> = ({
    events = [],
    Cell: PassedCell,
    Numbering: PassedNumbering,
    // ...
    getCellEvents = _getTodaysEvents,
    getMiscCellEvents = _getMiscCellEvents,
    onEventClick,
    onEventDragEnd,
    onEventResizeEnd,
    // ...
    ...props
}) => {
    const Cell = PassedCell || CalendarDayViewCell;
    const Numbering = PassedNumbering || DefaultNumbering;

    return (
        <DayView
            Cell={(other) => (
                <Cell
                    {...other}
                    events={getCellEvents(events, other.date)}
                    getMiscCellEvents={getMiscCellEvents}
                    onEventClick={onEventClick}
                    onEventDragEnd={onEventDragEnd}
                    onEventResizeEnd={onEventResizeEnd}
                />
            )}
            Numbering={Numbering}
            {...props}
        />
    );
};

export default CalendarDayView;
