import { FC } from "react";
import { CalendarDayViewProps } from "../../types";
import dynamic from "next/dynamic";
import DayView from "@/components/BaseCalendar/View/Day";
import { _getTodaysEvents } from "../util";
const DefaultNumbering = dynamic(() => import("../Numbering"));
const CalendarDayViewCell = dynamic(() => import("./Cell"));

const CalendarDayView: FC<CalendarDayViewProps> = ({
    events = [],
    Cell: PassedCell,
    Numbering: PassedNumbering,
    // ...
    getCellEvents = _getTodaysEvents,
    onEventClick,
    // ...
    style,
    ...props
}) => {
    const Cell = PassedCell || CalendarDayViewCell;
    const Numbering = PassedNumbering || DefaultNumbering;

    return (
        <DayView
            Cell={(props) => (
                <Cell
                    {...props}
                    events={getCellEvents(events, props.date)}
                    onEventClick={onEventClick}
                />
            )}
            Numbering={Numbering}
            {...props}
        />
    );
};

export default CalendarDayView;
