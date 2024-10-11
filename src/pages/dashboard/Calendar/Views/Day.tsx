import { BaseCalendarDayViewProps } from "@/components/BaseCalendar/types";
import Stack from "@mui/material/Stack";
import { FC, useCallback, useRef } from "react";
import { TCalendarEvent } from "./types";
import { START_HOUR, TOTAL_HOURS } from "./constant";
import dynamic from "next/dynamic";
const CalendarEvent = dynamic(() => import("../Event"));

import fakeEvents from "./fakeEvents";
import Row from "./Row";

const hours = Array.from({ length: TOTAL_HOURS }, (_, i) => i + START_HOUR);

// ------------------------------------------------------------------

const getRow = (hour: number) => <Row key={hour} hour={hour} />;

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

const CalendarDayView: FC<BaseCalendarDayViewProps> = ({ date }) => {
    const ref = useRef<HTMLDivElement>(null);

    // INFO: filter today's events
    const events = fakeEvents.filter(
        (event) => event.startDate.toDateString() === date.toDateString()
    );

    // Scroll to first event on load
    const handleFirstLoad = useCallback(
        (top: number) =>
            ref.current?.scrollTo({
                top,
                behavior: "smooth",
            }),
        []
    );

    return (
        <Stack
            ref={ref}
            position="relative"
            height="300px"
            overflow="hidden auto"
        >
            {/* Rows */}
            {hours.map(getRow)}
            {/* Events */}
            {events.map(getEvent(handleFirstLoad))}
        </Stack>
    );
};

export default CalendarDayView;
