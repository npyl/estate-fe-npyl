import { forwardRef, useCallback, useState } from "react";
import { CELL_HOUR_HEIGHT } from "@/constants/calendar";
import dynamic from "next/dynamic";
import useWidthObserver from "@/hooks/useWidthObserver";
import calculateTimePosition from "@/components/Calendar/calculateTimePosition";
import Main, { MainProps } from "./Main";
import { EVENT_CLASSNAME, getEventId, getEventTestId } from "./constants";
const Bullet = dynamic(() => import("./Bullet"));

interface CalendarEventProps
    extends Omit<MainProps, "isMinimumHeight" | "onClick"> {}

const CalendarEvent = forwardRef<HTMLDivElement, CalendarEventProps>(
    (
        {
            event,
            onEventClick,
            // ...
            ...props
        },
        ref
    ) => {
        const id = getEventId(event.id);

        const { top, height } = calculateTimePosition(
            event.startDate,
            event.endDate
        );

        const maxHeight = Math.max(height, CELL_HOUR_HEIGHT);
        const isMinimumHeight = maxHeight === CELL_HOUR_HEIGHT;

        const [isBullet, setIsBullet] = useState(false);

        const handleWidth = useCallback(
            (width: number) => setIsBullet(width <= 60),
            []
        );

        const { onRef } = useWidthObserver(ref, handleWidth);

        if (isBullet) {
            return (
                <Bullet
                    id={id}
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
                data-testid={getEventTestId(event.id)}
                ref={onRef}
                id={id}
                className={EVENT_CLASSNAME}
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
