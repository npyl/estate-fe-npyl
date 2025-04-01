import { FC } from "react";
import WeekView from "@/components/BaseCalendar/View/Week";
import { CalendarWeekViewProps } from "../../types";
import { _getMiscCellEvents, _getTodaysEvents } from "../util";
import dynamic from "next/dynamic";
import DaysHeader from "./DaysHeader";
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
    // ...
    ...props
}) => {
    const Cell = PassedCell || CalendarWeekViewCell;
    const Numbering = PassedNumbering || DefaultNumbering;

    return (
        <>
            <DaysHeader date={date} />

            <WeekView
                date={date}
                Cell={(other) => (
                    <Cell
                        {...other}
                        events={getCellEvents(events, other.date)}
                        getMiscCellEvents={getMiscCellEvents}
                        onEventClick={onEventClick}
                    />
                )}
                Numbering={Numbering}
                {...props}
            />
        </>
    );
};

export default CalendarWeekView;
