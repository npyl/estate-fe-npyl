import { forwardRef, useCallback } from "react";
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
import Draggable, { DraggableProps } from "./Draggable";

type OmitList = "cellsRef" | "onPositionUpdate";

interface EventsTargetProps extends Omit<DraggableProps, OmitList> {
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

        const { cellsRef } = useResponsiveCellPositions();

        const onPositionUpdate = useCallback(() => {
            updateDurationLabelAsync(elementRef.current, cellsRef);
        }, []);

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
