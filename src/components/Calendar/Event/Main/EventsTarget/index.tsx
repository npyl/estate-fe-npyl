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
import WithNoDragClick from "@/components/Calendar/WithNoDragClick";
import WithDragging, { DraggableProps } from "./WithDragging";
import Container from "../../Container";

const Draggable = WithDragging(WithNoDragClick(Container) as any);

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
            onEventResizeStart,
            onEventResizeEnd,
            onEventDragEnd,
            // ...
            children,
            ...props
        },
        ref
    ) => {
        const [elementRef, { onRef }] =
            useForwardedLocalRef<HTMLDivElement>(ref);

        return (
            <Draggable ref={onRef} onEventDragEnd={onEventDragEnd} {...props}>
                {children}

                {onEventResizeEnd ? (
                    <VerticalResize
                        event={props.event}
                        targetRef={elementRef}
                        // ...
                        onResizeEarlyStart={props.onGhostAdd}
                        onResizeStart={onEventResizeStart}
                        onResizeEnd={onEventResizeEnd}
                        // ...
                        onPositionUpdate={props.onPositionUpdate}
                    />
                ) : null}
            </Draggable>
        );
    }
);

export type { EventsTargetProps };
export default EventsTarget;
