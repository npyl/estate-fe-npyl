import { forwardRef, useCallback } from "react";
import { EventContainerProps } from "../../Container";
import useForwardedLocalRef from "@/hooks/useForwadedLocalRef";
import VerticalResize from "./VerticalResize";
import useResponsiveCellPositions from "./useResponsiveCellPositions";
import {
    TCalendarEvent,
    TOnEventClick,
    TOnEventDragEnd,
    TOnEventResizeEnd,
    TOnEventResizeStart,
} from "../../../types";
import updateDurationLabelAsync from "./Draggable/updateDuration";
import useGhost from "./useGhost";
import Draggable from "./Draggable";

interface EventsTargetProps
    extends Omit<EventContainerProps, "onClick" | "onMouseDown"> {
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
            onEventResizeStart,
            onEventResizeEnd: _onEventResizeEnd,
            onEventDragEnd: _onEventDragEnd,
            // ...
            children,
            ...props
        },
        ref
    ) => {
        const [elementRef, { onRef }] =
            useForwardedLocalRef<HTMLDivElement>(ref);

        const { cellsRef } = useResponsiveCellPositions();

        const onPositionUpdate = useCallback(() => {
            updateDurationLabelAsync(elementRef.current, cellsRef);
        }, []);

        const {
            onGhostAdd,
            onGhostRemove,
            // ...
            onEventDragEnd,
            onEventResizeEnd,
        } = useGhost(event.id, _onEventDragEnd, _onEventResizeEnd);

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

                {_onEventResizeEnd ? (
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
