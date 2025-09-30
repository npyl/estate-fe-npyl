import { TCalendarEvent } from "@/components/Calendar/types";
import { RefObject } from "react";
import { EventProps } from "@/components/Calendar/Event/types";

interface DragState {
    isDragging: boolean;
    startX: number;
    startY: number;
    elementX: number;
    elementY: number;
    totalMovement: number;
}

interface CellPosition {
    left: number;
    top: number;
    width: number;
    height: number;
    element: HTMLElement;
}

// ---------------------------------------------------------------------------------------

interface EventContainerProps extends Omit<EventProps, "bgcolor" | "event"> {
    bgcolor: string;
}

interface DraggableProps
    extends Omit<EventContainerProps, "onClick" | "onMouseDown"> {
    event: TCalendarEvent;
    cellsRef: RefObject<CellPosition[]>;
    onPositionUpdate: VoidFunction;
    onGhostAdd: VoidFunction;
    onGhostRemove: VoidFunction;
}

interface ResizableProps extends DraggableProps {}

interface EventsTargetProps extends ResizableProps {}

// ---------------------------------------------------------------------------------------

export type {
    EventContainerProps,
    DraggableProps,
    ResizableProps,
    EventsTargetProps,
    // ...
    DragState,
    CellPosition,
};
