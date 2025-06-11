import { forwardRef, MouseEvent, useCallback } from "react";
import Container, { EventContainerProps } from "../../Container";
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
import useDraggable from "./useDraggable";
import useNoDragClick from "../../../useNoDragClick";
import updateDurationLabelAsync from "./updateDuration";
import useGhost from "./useGhost";

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
            onEventClick,
            onEventResizeStart,
            onEventResizeEnd: _onEventResizeEnd,
            onEventDragStart,
            onEventDragEnd: _onEventDragEnd,
            onMouseMove,
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

        const { onGhostAdd, onGhostRemove, onEventDragEnd, onEventResizeEnd } =
            useGhost(event.id, _onEventDragEnd, _onEventResizeEnd);

        const { onMouseDown } = useDraggable(
            event,
            elementRef,
            cellsRef,
            onPositionUpdate,
            onGhostAdd,
            onEventDragStart,
            onGhostRemove,
            onEventDragEnd
        );

        const handleClick = useCallback(
            (me: MouseEvent<HTMLDivElement>) => {
                me.stopPropagation();
                onEventClick?.(me, event);
            },
            [onEventClick, event]
        );

        const methods = useNoDragClick(handleClick, onMouseDown, onMouseMove);

        return (
            <Container ref={onRef} {...methods} {...props}>
                {children}

                {_onEventResizeEnd ? (
                    <VerticalResize
                        event={event}
                        cellsRef={cellsRef}
                        targetRef={elementRef}
                        onResizeEarlyStart={onGhostAdd}
                        onResizeStart={onEventResizeStart}
                        onResizeEnd={onEventResizeEnd}
                    />
                ) : null}
            </Container>
        );
    }
);

export type { EventsTargetProps };
export default EventsTarget;
