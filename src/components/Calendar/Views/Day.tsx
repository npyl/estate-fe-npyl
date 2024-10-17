import { CSSProperties, FC } from "react";
import {
    CalendarCellProps,
    CalendarDayViewProps,
    TCalendarEvent,
} from "../types";
import dynamic from "next/dynamic";
import DayView from "@/components/BaseCalendar/View/Day";
import Numbering from "./Numbering";
import { _getTodaysEvents } from "./util";
const CalendarEvent = dynamic(() => import("../Event"));

// ------------------------------------------------------------------

const getEvent = (ce: TCalendarEvent) => (
    <CalendarEvent key={ce.id} event={ce} />
);

// ------------------------------------------------------------------

export const CalendarDayViewCell: FC<CalendarCellProps> = ({ events }) => (
    <>
        {/* Events */}
        {events.map(getEvent)}
    </>
);

// ------------------------------------------------------------------

const ViewStyle: CSSProperties = {
    position: "relative",
};

const CalendarDayView: FC<CalendarDayViewProps> = ({
    style,
    events = [],
    Cell: PassedCell,
    getCellEvents = _getTodaysEvents,
    ...props
}) => {
    const Cell = PassedCell || CalendarDayViewCell;

    return (
        <DayView
            style={{ ...ViewStyle, ...style }}
            Cell={(props) => (
                <Cell {...props} events={getCellEvents(events, props.date)} />
            )}
            Numbering={Numbering}
            {...props}
        />
    );
};

export default CalendarDayView;
