interface DragInfo {
    isDragging: boolean;
    startPosition: {
        x: number;
        y: number;
    };
    initialTransform: {
        x: number;
        y: number;
    };
}

export type { DragInfo };
