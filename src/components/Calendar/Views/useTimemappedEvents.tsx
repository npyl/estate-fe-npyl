import { useMemo } from "react";
import dynamic from "next/dynamic";
import { getOverlapCount, getTimeFromISO } from "./util";
import { TCalendarEvent } from "../types";
const CalendarEvent = dynamic(() => import("../Event"));

// ------------------------------------------------------------------

const useTimemappedEvents = (
    events: TCalendarEvent[],
    onEventClick?: (e: TCalendarEvent) => void
) => {
    const EVENTS = useMemo(() => {
        // Fill in startDate-endDate map
        const map = new Map<string, string>();

        return events.map((e) => {
            map.set(getTimeFromISO(e.startDate), getTimeFromISO(e.endDate));

            console.log("Checking for: ", map);

            const overlapCount = getOverlapCount(e.startDate, map);

            return (
                <CalendarEvent
                    key={e.id}
                    event={e}
                    overlapCount={overlapCount}
                    onClick={onEventClick}
                />
            );
        });
    }, [events, onEventClick]);

    return EVENTS;
};

export default useTimemappedEvents;
