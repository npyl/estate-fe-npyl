import { type MouseEvent, RefObject, useCallback, useRef } from "react";
import { CellPosition } from "../types";
import calculateNewDates from "./calculateNewDates";
import { TCalendarEvent } from "@/components/Calendar/types";
import updateDurationLabelAsync from "./updateDuration";
import getOverlapRatio from "./getOverlapRatio";

const DRAG_THRESHOLD = 5; // pixels
const CELL_CLASSNAME = "PPCalendar-Cell";

const useDraggable = (
    event: TCalendarEvent,
    elementRef: RefObject<HTMLDivElement>,
    cellsRef: RefObject<CellPosition[]>,
    onDragEnd:
        | ((event: TCalendarEvent, startDate: string, endDate: string) => void)
        | undefined
) => {
    const dragRef = useRef({
        isDragging: false,
        startPosition: { x: 0, y: 0 },
        initialTransform: { x: 0, y: 0 },
        rafId: 0,
    });

    const updatePosition = useCallback((e: globalThis.MouseEvent) => {
        const drag = dragRef.current;
        if (!drag.isDragging || !elementRef.current) return;

        // Update element position using requestAnimationFrame
        drag.rafId = requestAnimationFrame(() => {
            if (!elementRef.current) return;

            const newX =
                drag.initialTransform.x + (e.clientX - drag.startPosition.x);
            const newY =
                drag.initialTransform.y + (e.clientY - drag.startPosition.y);

            elementRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
        });
    }, []);

    const handleMouseUp = useCallback(
        (e: globalThis.MouseEvent) => {
            if (!elementRef.current) return;

            unregisterMovement();

            const drag = dragRef.current;
            if (!drag.isDragging) return;
            drag.isDragging = false;

            // Calculate total movement to determine if this was a click or drag
            const totalMovement = Math.hypot(
                e.clientX - drag.startPosition.x,
                e.clientY - drag.startPosition.y
            );

            // Handle click vs drag
            if (totalMovement <= DRAG_THRESHOLD) {
                // Create a synthetic event using React's SyntheticEvent pattern
                const syntheticEvent = new MouseEvent("click", {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                });

                // Dispatch the click event on the element
                elementRef.current.dispatchEvent(syntheticEvent);
                return;
            }

            // Find the PPCell that contains the center of the draggable element
            const elementRect = elementRef.current.getBoundingClientRect();
            const elementCenter = elementRect.left + elementRect.width / 2;
            const cells = document.getElementsByClassName(CELL_CLASSNAME);

            for (const cell of cells) {
                const cellRect = cell.getBoundingClientRect();
                if (
                    elementCenter >= cellRect.left &&
                    elementCenter <= cellRect.right
                ) {
                    const result = calculateNewDates(
                        cell as HTMLElement,
                        elementRect
                    );
                    if (!result || !onDragEnd) return;

                    const { startDate, endDate } = result;
                    onDragEnd(event, startDate, endDate);
                    return;
                }
            }
        },
        [onDragEnd]
    );

    const onMouseDown = useCallback((e: MouseEvent) => {
        e.stopPropagation();
        if (!elementRef.current) return;

        // Get current transform once
        const transform = window.getComputedStyle(elementRef.current).transform;
        const matrix = new DOMMatrix(transform);

        // Store only what we need
        const drag = dragRef.current;
        drag.isDragging = true;
        drag.startPosition = { x: e.clientX, y: e.clientY };
        drag.initialTransform = { x: matrix.m41, y: matrix.m42 };

        registerMovement();
    }, []);

    const registerMovement = useCallback(() => {
        document.addEventListener("mousemove", updatePosition);
        document.addEventListener("mouseup", handleMouseUp);
    }, []);

    const unregisterMovement = useCallback(() => {
        document.removeEventListener("mousemove", updatePosition);
        document.removeEventListener("mouseup", handleMouseUp);
        cancelAnimationFrame(dragRef.current.rafId);
    }, []);

    return { onMouseDown };
};

export { CELL_CLASSNAME };
export default useDraggable;
