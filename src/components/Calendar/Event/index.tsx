import { forwardRef, useCallback, useState } from "react";
import { CELL_HOUR_HEIGHT } from "@/constants/calendar";
import dynamic from "next/dynamic";
import useWidthObserver from "@/hooks/useWidthObserver";
import calculateTimePosition from "@/components/Calendar/calculateTimePosition";
import { EventContainerProps } from "./Container";
import {
    TCalendarEvent,
    TOnEventClick,
    TOnEventDragEnd,
    TOnEventDragStart,
    TOnEventResizeEnd,
    TOnEventResizeStart,
} from "../types";
import Main from "./Main";
const Bullet = dynamic(() => import("./Bullet"));

const EVENT_CLASSNAME = "PPCalendar-Event";

// ------------------------------------------------------------------------------------

interface CalendarEventProps
    extends Omit<EventContainerProps, "bgcolor" | "onClick"> {
    event: TCalendarEvent;
    onEventClick?: TOnEventClick;
    onEventDragStart?: TOnEventDragStart;
    onEventDragEnd?: TOnEventDragEnd;
    onEventResizeStart?: TOnEventResizeStart;
    onEventResizeEnd?: TOnEventResizeEnd;
}

const CalendarEvent = forwardRef<HTMLDivElement, CalendarEventProps>(
    (
        {
            event,
            overlapCount = 0,
            onEventClick,
            // ...
            ...props
        },
        ref
    ) => {
        const { top, height } = calculateTimePosition(
            event.startDate,
            event.endDate
        );

        const maxHeight = Math.max(height, CELL_HOUR_HEIGHT);
        const isMinimumHeight = maxHeight === CELL_HOUR_HEIGHT;

        const [isBullet, setBullet] = useState(false);

        const handleWidth = useCallback(
            (width: number) => setBullet(width <= 60),
            []
        );

        const { onRef } = useWidthObserver(ref, handleWidth);

        if (isBullet) {
            return (
                <Bullet
                    id={event.id}
                    event={event}
                    top={top}
                    title={event?.title}
                    type={event?.type}
                    onEventClick={onEventClick}
                />
            );
        }

        return (
            <Main
                className={EVENT_CLASSNAME}
                id={event.id}
                data-testid={event.id}
                ref={onRef}
                isMinimumHeight={isMinimumHeight}
                top={top}
                height={maxHeight}
                event={event}
                onEventClick={onEventClick}
                {...props}
            />
        );
    }
);

export { EVENT_CLASSNAME };
export default CalendarEvent;
