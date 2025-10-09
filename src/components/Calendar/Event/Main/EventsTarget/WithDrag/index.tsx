import useForwardedLocalRef from "@/hooks/useForwadedLocalRef";
import useDraggable from "./useDraggable";
import { MouseEvent, ComponentType, forwardRef, useCallback } from "react";
import { DraggableProps, EventContainerProps } from "../types";

type AnyContainer = ComponentType<EventContainerProps>;

const WithDrag = (Container: AnyContainer) => {
    const Wrapped = forwardRef<HTMLDivElement, DraggableProps>(
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

            return (
                <Container
                    ref={onRef}
                    // ...
                    onClick={handleClick}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    // ...
                    {...props}
                />
            );
        }
    );

    Wrapped.displayName = "Wrapped";

    return Wrapped;
};

export default WithDrag;
