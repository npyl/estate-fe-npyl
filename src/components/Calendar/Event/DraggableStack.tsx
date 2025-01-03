import { forwardRef, MouseEvent, useCallback, useRef } from "react";
import { Stack, StackProps } from "@mui/material";

interface Position {
    x: number;
    y: number;
}

interface DragState {
    isDragging: boolean;
    startPosition: Position;
    startElementPosition: Position;
}

const boundaryPadding = 0;
const gridSnap = 1;

const snapToGrid = (value: number): number => {
    return Math.round(value / gridSnap) * gridSnap;
};

const DraggableStack = forwardRef<HTMLDivElement, StackProps>(
    ({ sx, children, ...props }, ref) => {
        const elementRef = useRef<HTMLDivElement>();
        const positionRef = useRef<Position>({ x: 0, y: 0 });

        const dragState = useRef<DragState>({
            isDragging: false,
            startPosition: { x: 0, y: 0 },
            startElementPosition: { x: 0, y: 0 },
        });

        const updateElementPosition = (x: number, y: number) => {
            if (!elementRef.current) return;
            elementRef.current.style.transform = `translate(${x}px, ${y}px)`;
            positionRef.current = { x, y };
        };

        const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();

            const { x, y } = positionRef.current;

            dragState.current = {
                isDragging: true,
                startPosition: { x: e.clientX, y: e.clientY },
                startElementPosition: { x, y },
            };

            if (elementRef.current) {
                elementRef.current.style.transition = "none";
                elementRef.current.style.cursor = "grabbing";
            }
        };

        const handleMouseMove = useCallback(
            (e: MouseEvent | globalThis.MouseEvent) => {
                if (!dragState.current.isDragging || !elementRef.current)
                    return;

                const deltaX = e.clientX - dragState.current.startPosition.x;
                const deltaY = e.clientY - dragState.current.startPosition.y;

                // Get screen boundaries
                const screenWidth = window.innerWidth;
                const screenHeight = window.innerHeight;
                const elementRect = elementRef.current.getBoundingClientRect();

                // Calculate new positions with boundary checks
                let newX = dragState.current.startElementPosition.x + deltaX;
                let newY = dragState.current.startElementPosition.y + deltaY;

                // Apply grid snapping if enabled
                if (gridSnap > 1) {
                    newX = snapToGrid(newX);
                    newY = snapToGrid(newY);
                }

                // Apply boundary constraints if needed
                if (boundaryPadding > 0) {
                    newX = Math.max(
                        boundaryPadding,
                        Math.min(
                            newX,
                            screenWidth - elementRect.width - boundaryPadding
                        )
                    );
                    newY = Math.max(
                        boundaryPadding,
                        Math.min(
                            newY,
                            screenHeight - elementRect.height - boundaryPadding
                        )
                    );
                }

                updateElementPosition(newX, newY);
            },
            []
        );

        const handleMouseUp = useCallback(() => {
            if (!dragState.current.isDragging) return;

            dragState.current.isDragging = false;

            if (elementRef.current) {
                elementRef.current.style.transition = "transform 0.2s ease";
                elementRef.current.style.cursor = "grab";
            }
        }, []);

        return (
            <Stack
                ref={(node) => {
                    if (typeof ref === "function") {
                        ref(node);
                    } else if (ref) {
                        ref.current = node;
                    }

                    if (node) elementRef.current = node;
                }}
                sx={{
                    position: "absolute",
                    cursor: "grab",
                    transition: "transform 0.2s ease",
                    ...sx,
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                {...props}
            >
                {children}
            </Stack>
        );
    }
);

export default DraggableStack;
