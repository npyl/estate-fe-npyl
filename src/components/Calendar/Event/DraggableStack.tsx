import { forwardRef, MouseEvent, useCallback, useRef } from "react";
import { Stack, StackProps } from "@mui/material";

interface DragState {
    isDragging: boolean;
    startX: number;
    startY: number;
    elementX: number;
    elementY: number;
    totalMovement: number;
}

const stopPropagation = (e: MouseEvent) => e.stopPropagation();

const DRAG_THRESHOLD = 5; // pixels

export interface DraggableStackProps extends Omit<StackProps, "onDragEnd"> {
    onDragEnd?: () => void;
}

const DraggableStack = forwardRef<HTMLDivElement, DraggableStackProps>(
    ({ sx, onClick, onDragEnd, ...props }, ref) => {
        const isEnabled = Boolean(onDragEnd);

        const elementRef = useRef<HTMLDivElement>();

        const dragState = useRef<DragState>({
            isDragging: false,
            startX: 0,
            startY: 0,
            elementX: 0,
            elementY: 0,
            totalMovement: 0,
        });

        const updatePosition = useCallback((x: number, y: number) => {
            if (!elementRef.current) return;
            elementRef.current.style.transform = `translate(${x}px, ${y}px)`;
            dragState.current.elementX = x;
            dragState.current.elementY = y;
        }, []);

        const handleMouseDown = useCallback((e: MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();

            const state = dragState.current;
            state.isDragging = true;
            state.startX = e.clientX;
            state.startY = e.clientY;
            state.totalMovement = 0;

            if (elementRef.current) {
                elementRef.current.style.transition = "none";
                elementRef.current.style.cursor = "grabbing";
            }
        }, []);

        const handleMouseMove = useCallback((e: MouseEvent) => {
            e.stopPropagation();

            const state = dragState.current;
            if (!state.isDragging || !elementRef.current) return;

            const deltaX = e.clientX - state.startX;
            const deltaY = e.clientY - state.startY;

            // Calculate total movement
            state.totalMovement += Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            updatePosition(state.elementX + deltaX, state.elementY + deltaY);

            state.startX = e.clientX;
            state.startY = e.clientY;
        }, []);

        const handleMouseUp = useCallback(
            (e: MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();

                if (!dragState.current.isDragging) return;

                dragState.current.isDragging = false;

                if (elementRef.current) {
                    elementRef.current.style.transition = "transform 0.2s ease";
                    elementRef.current.style.cursor = "grab";
                }

                const wasDragged =
                    dragState.current.totalMovement > DRAG_THRESHOLD;

                if (wasDragged) {
                    onDragEnd?.();
                } else {
                    onClick?.(e);
                }
            },
            [onDragEnd, onClick]
        );

        const setRefs = useCallback((node: HTMLDivElement | null) => {
            if (node) elementRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
        }, []);

        const mouseDownCb = isEnabled ? handleMouseDown : undefined;
        const mouseMoveCb = isEnabled ? handleMouseMove : undefined;
        const mouseUpCb = isEnabled ? handleMouseUp : undefined;

        const onClickCb = !isEnabled ? undefined : stopPropagation; // INFO: ignore the actual onClick event!

        return (
            <Stack
                ref={setRefs}
                sx={{
                    position: "absolute",
                    cursor: "grab",
                    transition: "transform 0.2s ease",
                    ...sx,
                }}
                onMouseDown={mouseDownCb}
                onMouseMove={mouseMoveCb}
                onMouseUp={mouseUpCb}
                // ...
                onClick={onClickCb}
                // ...
                {...props}
            />
        );
    }
);

export default DraggableStack;
