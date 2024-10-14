import {
    BaseCalendarCellProps,
    BaseCalendarDayViewProps,
} from "@/components/BaseCalendar/types";
import { CSSProperties, FC, forwardRef, useCallback, useRef } from "react";
import { TCalendarEvent } from "../types";
import dynamic from "next/dynamic";
import fakeEvents from "./fakeEvents";
import Numbering from "./Numbering";
import DayView from "@/components/BaseCalendar/View/Day";
import { useTheme } from "@mui/material";
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

const ThemedDayView = forwardRef<HTMLDivElement, BaseCalendarDayViewProps>(
    ({ style, ...props }, ref) => {
        const theme = useTheme();

        return (
            <DayView
                ref={ref}
                {...props}
                style={{
                    backgroundColor:
                        theme.palette.mode === "light"
                            ? theme.palette.grey[100]
                            : theme.palette.neutral?.[800],
                    ...style,
                }}
            />
        );
    }
);

ThemedDayView.displayName = "ThemedDayView";

// ------------------------------------------------------------------

interface DayCell extends BaseCalendarCellProps {
    events: TCalendarEvent[];
    onFirstEventLoad: (top: number) => void;
}

const Cell: FC<DayCell> = ({ events, onFirstEventLoad }) => (
    <>
        {/* Events */}
        {events.map(getEvent(onFirstEventLoad))}
    </>
);

// ------------------------------------------------------------------

const CalendarDayView: FC<BaseCalendarDayViewProps> = ({ style, ...props }) => {
    const ref = useRef<HTMLDivElement>(null);

    // INFO: filter today's events
    const events = fakeEvents.filter(
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
        <ThemedDayView
            ref={ref}
            {...props}
            style={{ ...ViewStyle, ...style }}
            Cell={(props) => (
                <Cell
                    {...props}
                    events={events}
                    onFirstEventLoad={handleFirstLoad}
                />
            )}
            Numbering={Numbering}
        />
    );
};

export default CalendarDayView;
