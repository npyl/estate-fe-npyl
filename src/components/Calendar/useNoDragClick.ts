import { useRef, MouseEvent, useCallback } from "react";

const threshold = 5;

/**
 * Custom hook that detects drag operations and prevents click events from firing after dragging
 * @param threshold The minimum pixel movement to consider as a drag (default: 5px)
 * @param onClick The original click handler to be called only when not dragging
 * @returns An object with event handlers to be spread on the target element
 */
const useNoDragClick = (
    onClick?: (e: MouseEvent<HTMLDivElement>) => void,
    onMouseDown?: (e: MouseEvent<HTMLDivElement>) => void,
    onMouseMove?: (e: MouseEvent<HTMLDivElement>) => void
) => {
    const isDragging = useRef(false);
    const mouseDownPos = useRef({ x: 0, y: 0 });

    const handleMouseDown = useCallback((e: MouseEvent<HTMLDivElement>) => {
        // Store the initial position when mouse down occurs
        mouseDownPos.current = { x: e.clientX, y: e.clientY };
        isDragging.current = false;

        onMouseDown?.(e);
    }, []);

    const handleMouseMove = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            // If mouse has moved more than the threshold, consider it a drag
            if (!isDragging.current) {
                const deltaX = Math.abs(e.clientX - mouseDownPos.current.x);
                const deltaY = Math.abs(e.clientY - mouseDownPos.current.y);

                if (deltaX > threshold || deltaY > threshold) {
                    isDragging.current = true;
                }
            }

            onMouseMove?.(e);
        },
        [onMouseMove]
    );

    const handleClick = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            if (isDragging.current) return;
            onClick?.(e);
        },
        [onClick]
    );

    return {
        onMouseDown: handleMouseDown,
        onMouseMove: handleMouseMove,
        onClick: handleClick,
    };
};

export default useNoDragClick;
