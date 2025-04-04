import { useCallback } from "react";
import { TCalendarEvent } from "../Calendar/types";
import { isAllDay } from "../Calendar/util";

type TEventSplitter = (
    e: TCalendarEvent[]
) => [TCalendarEvent[], TCalendarEvent[]];

/**
 * Custom hook that returns a function to split calendar events into two categories:
 * 1. Regular events (not spanning the entire day)
 * 2. All-day events (spanning from the start hour to the end hour of a day)
 *
 * @returns A memoized callback function that takes an array of calendar events and returns a tuple
 * containing [regularEvents, allDayEvents]
 *
 * @example
 * const splitEvents = useEventsSplitter();
 * const [regularEvents, allDayEvents] = splitEvents(myCalendarEvents);
 */
const useEventsSplitter = () => {
    const cb: TEventSplitter = useCallback((e) => {
        // Use reduce to split events into two arrays: regular events and all-day events
        const [events, allDayEvents] = e.reduce(
            (acc, event) => {
                if (isAllDay(event.startDate, event.endDate)) {
                    acc[1].push(event);
                } else {
                    acc[0].push(event);
                }
                return acc;
            },
            [[], []] as [TCalendarEvent[], TCalendarEvent[]]
        );

        return [events, allDayEvents] as const;
    }, []);

    return cb;
};

export default useEventsSplitter;
