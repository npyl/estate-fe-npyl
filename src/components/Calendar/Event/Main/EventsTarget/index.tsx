import { forwardRef } from "react";
import useForwardedLocalRef from "@/hooks/useForwadedLocalRef";
import VerticalResize from "./VerticalResize";
import {
    TCalendarEvent,
    TOnEventClick,
    TOnEventDragEnd,
    TOnEventResizeEnd,
    TOnEventResizeStart,
} from "../../../types";
import Draggable, { DraggableProps } from "./Draggable";

interface EventsTargetProps extends DraggableProps {
    event: TCalendarEvent;

    onEventClick?: TOnEventClick;
    onEventResizeStart?: TOnEventResizeStart;
    onEventDragEnd?: TOnEventDragEnd;
    onEventResizeEnd?: TOnEventResizeEnd;
}

const EventsTarget = forwardRef<HTMLDivElement, EventsTargetProps>(
    (
        {
            event,
            cellsRef,
            onPositionUpdate,
            onEventResizeStart,
            onEventResizeEnd,
            onEventDragEnd,
            onGhostAdd,
            onGhostRemove,
            // ...
            children,
            ...props
        },
        ref
    ) => {
        const [elementRef, { onRef }] =
            useForwardedLocalRef<HTMLDivElement>(ref);

        return (
            <Draggable
                ref={onRef}
                event={event}
                cellsRef={cellsRef}
                onPositionUpdate={onPositionUpdate}
                onGhostAdd={onGhostAdd}
                onGhostRemove={onGhostRemove}
                onEventDragEnd={onEventDragEnd}
                {...props}
            >
                {children}

                {onEventResizeEnd ? (
                    <VerticalResize
                        event={event}
                        targetRef={elementRef}
                        // ...
                        onResizeEarlyStart={onGhostAdd}
                        onResizeStart={onEventResizeStart}
                        onResizeEnd={onEventResizeEnd}
                        // ...
                        onPositionUpdate={onPositionUpdate}
                    />
                ) : null}
            </Draggable>
        );
    }
);

export type { EventsTargetProps };
export default EventsTarget;
