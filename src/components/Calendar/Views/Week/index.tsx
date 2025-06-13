import { FC } from "react";
import WeekView from "@/components/BaseCalendar/View/Week";
import { CalendarWeekViewProps } from "../../types";
import { _getMiscCellEvents, _getTodaysEvents } from "../util";
import dynamic from "next/dynamic";
import DaysHeader from "./DaysHeader";
import Box from "@mui/material/Box";
const DefaultNumbering = dynamic(() => import("../Numbering"));
const CalendarWeekViewCell = dynamic(() => import("./Cell"));

// -----------------------------------------------------------------------

const CalendarWeekView: FC<CalendarWeekViewProps> = ({
    date,
    events = [],
    Cell: PassedCell,
    Numbering: PassedNumbering,
    // ...
    getCellEvents = _getTodaysEvents,
    getMiscCellEvents = _getMiscCellEvents,
    onEventClick,
    onEventDragStart,
    onEventDragEnd,
    onEventResizeStart,
    onEventResizeEnd,
    // ...
    ...props
}) => {
    const Cell = PassedCell || CalendarWeekViewCell;
    const Numbering = PassedNumbering || DefaultNumbering;

    return (
        <>
            <DaysHeader date={date} />

            <Box mt={1} />

            <WeekView
                date={date}
                Cell={(other) => (
                    <Cell
                        {...other}
                        events={getCellEvents(events, other.date)}
                        getMiscCellEvents={getMiscCellEvents}
                        onEventClick={onEventClick}
                        onEventDragStart={onEventDragStart}
                        onEventDragEnd={onEventDragEnd}
                        onEventResizeStart={onEventResizeStart}
                        onEventResizeEnd={onEventResizeEnd}
                    />
                )}
                Numbering={Numbering}
                {...props}
            />
        </>
    );
};

export default CalendarWeekView;
