import { CSSProperties, FC } from "react";
import {
    CalendarCellProps,
    CalendarDayViewProps,
    TCalendarEvent,
} from "../types";
import dynamic from "next/dynamic";
import DayView from "@/components/BaseCalendar/View/Day";
import Numbering from "./Numbering";
const CalendarEvent = dynamic(() => import("../Event"));

// ------------------------------------------------------------------

const getEvent = (ce: TCalendarEvent) => (
    <CalendarEvent key={ce.id} event={ce} />
);

// ------------------------------------------------------------------

const CalendarDayViewCell: FC<CalendarCellProps> = ({ events }) => (
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
    ...props
}) => {
    const Cell = PassedCell || CalendarDayViewCell;

    const todaysEvents = events.filter(
        (event) => event.startDate.toDateString() === props.date.toDateString()
    );

    return (
        <DayView
            style={{ ...ViewStyle, ...style }}
            Cell={(props) => <Cell {...props} events={todaysEvents} />}
            Numbering={Numbering}
            {...props}
        />
    );
};

export default CalendarDayView;
