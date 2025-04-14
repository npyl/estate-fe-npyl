import { forwardRef, useCallback, useState } from "react";
import { DAY_CELL_HEIGHT } from "@/constants/calendar";
import dynamic from "next/dynamic";
import useWidthObserver from "@/hooks/useWidthObserver";
import calculateTimePosition from "@/components/Calendar/calculateTimePosition";
import { EventContainerProps } from "./Container";
import {
    TCalendarEvent,
    TOnEventClick,
    TOnEventDragEnd,
    TOnEventResizeEnd,
} from "../types";
import Main from "./Main";
const Bullet = dynamic(() => import("./Bullet"));

// ------------------------------------------------------------------------------------

interface CalendarEventProps
    extends Omit<EventContainerProps, "bgcolor" | "onClick"> {
    event: TCalendarEvent;
    onEventClick?: TOnEventClick;
    onEventDragEnd?: TOnEventDragEnd;
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

        const maxHeight = Math.max(height, DAY_CELL_HEIGHT);
        const isMinimumHeight = maxHeight === DAY_CELL_HEIGHT;

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
                id={event.id}
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

export default CalendarEvent;
