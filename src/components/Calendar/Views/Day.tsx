import { CSSProperties, FC, useCallback, useRef } from "react";
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

const getEvent =
    (onFirstLoad: (top: number) => void) => (ce: TCalendarEvent, i: number) =>
        (
            <CalendarEvent
                key={ce.id}
                event={ce}
                onLoad={i === 0 ? onFirstLoad : undefined}
            />
        );

// ------------------------------------------------------------------

const ViewStyle: CSSProperties = {
    position: "relative",
    overflow: "hidden auto",
    overscrollBehavior: "contain",

    scrollbarWidth: "none",

    WebkitOverflowScrolling: "touch", // smooth scrolling
};

// ------------------------------------------------------------------

interface DayCell extends CalendarCellProps {
    onFirstEventLoad: (top: number) => void;
}

const Cell: FC<DayCell> = ({ events, onFirstEventLoad }) => (
    <>
        {/* Events */}
        {events.map(getEvent(onFirstEventLoad))}
    </>
);

// ------------------------------------------------------------------

const CalendarDayView: FC<CalendarDayViewProps> = ({
    style,
    events = [],
    ...props
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const todaysEvents = events.filter(
        (event) => event.startDate.toDateString() === props.date.toDateString()
    );

    // Scroll to first event on load
    const handleFirstLoad = useCallback(
        (top: number) =>
            ref.current?.scrollTo({
                top: top - 7,
                behavior: "smooth",
            }),
        []
    );

    return (
        <DayView
            ref={ref}
            style={{ ...ViewStyle, ...style }}
            Cell={(props) => (
                <Cell
                    {...props}
                    events={todaysEvents}
                    onFirstEventLoad={handleFirstLoad}
                />
            )}
            Numbering={Numbering}
            {...props}
        />
    );
};

export default CalendarDayView;
