import { ComponentType, useMemo } from "react";
import dynamic from "next/dynamic";
import {
    TCalendarEvent,
    TOnEventClick,
    TOnEventDragEnd,
    TOnEventDragStart,
    TOnEventResizeEnd,
    TOnEventResizeStart,
} from "../types";
import { EventProps } from "../Event/types";
const CalendarEvent = dynamic(() => import("../Event"));

// Constants
const BUFFER_MS = 60 * 60 * 1000; // 1 hour in milliseconds

interface TimestampedEvent extends TCalendarEvent {
    _startTime: number;
    _endTime: number;
    _duration: number;
}

// Pre-calculate and cache timestamps for an event once
const createTimestampedEvent = (event: TCalendarEvent): TimestampedEvent => {
    const startTime = new Date(event.startDate).getTime();
    const endTime = new Date(event.endDate).getTime();
    return {
        ...event,
        _startTime: startTime,
        _endTime: endTime,
        _duration: endTime - startTime,
    };
};

/**
 * Calculate overlap count weighted by duration
 * Shorter events get higher overlap counts, longer events get lower counts
 */
const getWeightedOverlapCount = (
    targetStartTime: number,
    targetEndTime: number,
    targetDuration: number,
    events: TimestampedEvent[]
): number => {
    // Early exit if no events
    if (events.length === 0) return 0;

    const bufferedStart = targetStartTime - BUFFER_MS;
    const bufferedEnd = targetEndTime + BUFFER_MS;

    let weightedCount = 0;
    const len = events.length | 0;

    for (let i = 0; i < len; i = (i + 1) | 0) {
        const event = events[i];

        // Check if events overlap
        if (
            bufferedEnd >= event._startTime - BUFFER_MS &&
            bufferedStart <= event._endTime + BUFFER_MS
        ) {
            // Calculate weight based on duration ratio
            // If target is shorter than overlapping event, add more to count
            // If target is longer than overlapping event, add less to count
            const durationRatio = targetDuration / event._duration;

            // Weight formula:
            // - If target is 2x longer: weight = 0.5 (less overlap impact)
            // - If target is same length: weight = 1.0 (equal impact)
            // - If target is 2x shorter: weight = 2.0 (more overlap impact)
            const weight = Math.sqrt(durationRatio);

            weightedCount += weight;
        }
    }

    // Round to get a reasonable overlap count
    return Math.round(weightedCount);
};

/**
 * Returns an array of pre-rendered Events with duration-weighted overlap counts
 * @template TCustomProps - Additional props that can be passed to the EventComponent
 * @param events - Array of calendar events
 * @param onEventClick - Optional click handler for events
 * @param onEventDragStart - Optional drag start handler for events
 * @param onEventDragEnd - Optional drag end handler for events
 * @param onEventResizeStart - Optional resize start handler for events
 * @param onEventResizeEnd - Optional resize end handler for events
 * @param EventComponent - (for customisation) Custom component (must conform to Event's props)
 * @param EventProps - (for customisation) pass some props to this custom element
 */
function useTimemappedEvents<TCustomProps extends object = object>(
    events: TCalendarEvent[],
    onEventClick: TOnEventClick | undefined,
    onEventDragStart: TOnEventDragStart | undefined,
    onEventDragEnd: TOnEventDragEnd | undefined,
    onEventResizeStart: TOnEventResizeStart | undefined,
    onEventResizeEnd: TOnEventResizeEnd | undefined,
    EventComponent: ComponentType<
        EventProps & TCustomProps
    > = CalendarEvent as ComponentType<EventProps & TCustomProps>,
    EventProps?: (idx: number) => TCustomProps
) {
    // Memoize all timestamp calculations
    const timestampedEvents = useMemo(
        () => events.map(createTimestampedEvent),
        [events]
    );

    return useMemo(() => {
        const all: TimestampedEvent[] = [];
        const results: JSX.Element[] = [];

        const len = timestampedEvents.length | 0;
        for (let i = 0; i < len; i = (i + 1) | 0) {
            const event = timestampedEvents[i];
            const overlapCount = getWeightedOverlapCount(
                event._startTime,
                event._endTime,
                event._duration,
                all
            );

            const otherProps = EventProps?.(i) ?? ({} as TCustomProps);

            results.push(
                <EventComponent
                    key={event.id}
                    event={event}
                    overlapCount={overlapCount}
                    onEventClick={onEventClick}
                    onEventDragStart={onEventDragStart}
                    onEventDragEnd={onEventDragEnd}
                    onEventResizeStart={onEventResizeStart}
                    onEventResizeEnd={onEventResizeEnd}
                    {...otherProps}
                />
            );

            all.push(event);
        }

        return results;
    }, [
        timestampedEvents,
        onEventClick,
        onEventDragStart,
        onEventDragEnd,
        onEventResizeStart,
        onEventResizeEnd,
        EventProps,
    ]);
}

export default useTimemappedEvents;
