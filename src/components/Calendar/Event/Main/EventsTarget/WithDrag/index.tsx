import useForwardedLocalRef from "@/hooks/useForwadedLocalRef";
import useDraggable from "./useDraggable";
import {
    MouseEvent,
    ComponentType,
    forwardRef,
    RefObject,
    useCallback,
} from "react";
import { EventContainerProps } from "../../Container";
import { TCalendarEvent } from "@/components/Calendar/types";
import { CellPosition } from "../types";

interface DraggableProps
    extends Omit<EventContainerProps, "onClick" | "onMouseDown"> {
    event: TCalendarEvent;
    cellsRef: RefObject<CellPosition[]>;
    onPositionUpdate: VoidFunction;
    onGhostAdd: VoidFunction;
    onGhostRemove: VoidFunction;
}

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

export type { DraggableProps };
export default WithDrag;
