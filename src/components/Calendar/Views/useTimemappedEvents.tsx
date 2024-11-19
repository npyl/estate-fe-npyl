import { useMemo } from "react";
import dynamic from "next/dynamic";
import { TCalendarEvent } from "../types";
const CalendarEvent = dynamic(() => import("../Event"));

// ------------------------------------------------------------------

// INFO: lexicographically compare strings
const getOverlapCount = (date: string, events: TCalendarEvent[]) => {
    let count = 0;

    events.forEach(({ startDate, endDate }) => {
        if (date >= startDate && date <= endDate) {
            count++;
        }
    });

    return count;
};

// ------------------------------------------------------------------

const useTimemappedEvents = (
    events: TCalendarEvent[],
    onEventClick?: (e: TCalendarEvent) => void
) => {
    return useMemo(() => {
        const all: TCalendarEvent[] = [];

        return events.map((e) => {
            const c = getOverlapCount(e.startDate, all);

            const res = (
                <CalendarEvent
                    key={e.id}
                    event={e}
                    overlapCount={c}
                    onClick={onEventClick}
                />
            );

            all.push(e);

            return res;
        });
    }, [events, onEventClick]);
};

export default useTimemappedEvents;
