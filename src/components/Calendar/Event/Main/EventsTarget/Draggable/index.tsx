import { forwardRef, MouseEvent, RefObject, useCallback } from "react";
import Container, { EventContainerProps } from "../../../Container";
import useForwardedLocalRef from "@/hooks/useForwadedLocalRef";
import { TCalendarEvent } from "../../../../types";
import useDraggable from "./useDraggable";
import useNoDragClick from "../../../../useNoDragClick";
import { CellPosition } from "../types";

interface DraggableProps
    extends Omit<EventContainerProps, "onClick" | "onMouseDown"> {
    event: TCalendarEvent;
    cellsRef: RefObject<CellPosition[]>;
    onPositionUpdate: VoidFunction;
    onGhostAdd: VoidFunction;
    onGhostRemove: VoidFunction;
}

const Draggable = forwardRef<HTMLDivElement, DraggableProps>(
    (
        {
            event,
            cellsRef,
            onPositionUpdate,
            onGhostAdd,
            onGhostRemove,
            onEventClick,
            onEventDragStart,
            onEventDragEnd,
            onMouseMove,
            ...props
        },
        ref
    ) => {
        const [elementRef, { onRef }] =
            useForwardedLocalRef<HTMLDivElement>(ref);

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

        return <Container ref={onRef} {...methods} {...props} />;
    }
);

Draggable.displayName = "Draggable";

export default Draggable;
