import { useMemo } from "react";
import dynamic from "next/dynamic";
import { TCalendarEvent } from "../types";
const CalendarEvent = dynamic(() => import("../Event"));

// Constants
const BUFFER_MS = 60 * 60 * 1000; // 1 hour in milliseconds

interface TimestampedEvent extends TCalendarEvent {
    _startTime: number;
    _endTime: number;
}

// Pre-calculate and cache timestamps for an event once
const createTimestampedEvent = (event: TCalendarEvent): TimestampedEvent => ({
    ...event,
    _startTime: new Date(event.startDate).getTime(),
    _endTime: new Date(event.endDate).getTime(),
});

const getOverlapCount = (
    targetStartTime: number,
    targetEndTime: number,
    events: TimestampedEvent[]
): number => {
    // Early exit if no events
    if (events.length === 0) return 0;

    // Use bitwise OR (|0) to force integer math
    let count = 0 | 0;
    const bufferedStart = targetStartTime - BUFFER_MS;
    const bufferedEnd = targetEndTime + BUFFER_MS;

    // Manual loop is faster than reduce/forEach
    const len = events.length | 0;
    for (let i = 0; i < len; i = (i + 1) | 0) {
        const event = events[i];
        // Use pre-calculated timestamps
        if (
            bufferedEnd >= event._startTime - BUFFER_MS &&
            bufferedStart <= event._endTime + BUFFER_MS
        ) {
            count = (count + 1) | 0;
        }
    }

    return count;
};

/**
 * Returns an array of pre-rendered Events (as in @/components/Calendar/Event) in a way that their respective overlap count is calculated
 * @param events -
 * @param onEventClick -
 * @param EventComponent (for customisation) This should be used if you want to implement a custom component (must conform to Event's props)
 * @param EventProps (for customisation) pass some props to this custom element
 */
const useTimemappedEvents = (
    events: TCalendarEvent[],
    onEventClick: ((e: TCalendarEvent) => void) | undefined,
    // ...
    EventComponent: any = CalendarEvent, // TODO: tired of these types for god's sake; this should be ComponentType<T extends EventProps = EventProps> or something...
    EventProps?: (idx: number) => any
) => {
    // Memoize all timestamp calculations
    const timestampedEvents = useMemo(
        () => events.map(createTimestampedEvent),
        [events]
    );

    return useMemo(() => {
        const all: TimestampedEvent[] = [];
        const results: JSX.Element[] = [];

        // Preallocate array and use for loop for better performance
        const len = timestampedEvents.length | 0;
        for (let i = 0; i < len; i = (i + 1) | 0) {
            const event = timestampedEvents[i];
            const overlapCount = getOverlapCount(
                event._startTime,
                event._endTime,
                all
            );

            results.push(
                <EventComponent
                    key={event.id}
                    event={event}
                    overlapCount={overlapCount}
                    onClick={onEventClick}
                    {...EventProps?.(i)}
                />
            );

            all.push(event);
        }

        return results;
    }, [timestampedEvents, onEventClick]);
};

export default useTimemappedEvents;
