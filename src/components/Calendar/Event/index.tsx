import { forwardRef, MouseEvent, useCallback, useState } from "react";
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
            onEventDragEnd,
            onEventResizeEnd,
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

        const handleClick = useCallback(
            (e: MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();
                onEventClick?.(e, event);
            },
            [onEventClick, event]
        );

        if (isBullet) {
            return (
                <Bullet
                    top={top}
                    title={event?.title}
                    type={event?.type}
                    onClick={handleClick}
                />
            );
        }

        return (
            <Main
                ref={onRef}
                isMinimumHeight={isMinimumHeight}
                top={top}
                height={maxHeight}
                event={event}
                onClick={handleClick}
                {...props}
            />
        );
    }
);

export default CalendarEvent;
