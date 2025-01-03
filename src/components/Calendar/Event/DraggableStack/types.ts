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

export type { DragState, CellPosition };
