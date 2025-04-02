import { type MouseEvent, RefObject, useCallback, useRef } from "react";
import getOverlapRatio from "./getOverlapRatio";
import { CellPosition } from "../types";
import calculateNewDates from "./calculateNewDates";
import { TCalendarEvent } from "@/components/Calendar/types";
import updateDurationLabelAsync from "./updateDuration";

const DRAG_THRESHOLD = 5; // pixels
const SNAP_THRESHOLD = 0.5; // 50% overlap required for snapping
const UPDATE_INTERVAL = 16; // ~60fps

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
        lastX: 0,
        lastY: 0,
        startX: 0,
        startY: 0,
        initialTransform: { x: 0, y: 0 },
        rafId: 0,
        lastUpdate: 0,
    });

    const updatePosition = useCallback((e: globalThis.MouseEvent) => {
        const drag = dragRef.current;
        if (!drag.isDragging || !elementRef.current) return;

        const now = performance.now();
        if (now - drag.lastUpdate < UPDATE_INTERVAL) return;

        // Calculate delta directly from last position
        const deltaX = e.clientX - drag.lastX;
        const deltaY = e.clientY - drag.lastY;

        // Skip tiny movements for performance
        if (Math.abs(deltaX) < 1 && Math.abs(deltaY) < 1) return;

        // Update element position using requestAnimationFrame
        drag.rafId = requestAnimationFrame(() => {
            if (!elementRef.current) return;

            const newX = drag.initialTransform.x + (e.clientX - drag.startX);
            const newY = drag.initialTransform.y + (e.clientY - drag.startY);

            elementRef.current.style.transform = `translate(${newX}px, ${newY}px)`;

            // Update duration label less frequently
            if (now - drag.lastUpdate > UPDATE_INTERVAL * 2) {
                updateDurationLabelAsync(elementRef.current, cellsRef);
                drag.lastUpdate = now;
            }
        });

        // Only save the last mouse position
        drag.lastX = e.clientX;
        drag.lastY = e.clientY;
    }, []);

    const findSnapTarget = useCallback(() => {
        if (!elementRef.current || !cellsRef.current?.length) return null;

        const elementRect = elementRef.current.getBoundingClientRect();
        let bestCell = null;
        let bestOverlap = 0;

        // Manual loop is more efficient than reduce for this case
        for (const cell of cellsRef.current) {
            const overlap = getOverlapRatio(elementRect, cell);
            if (overlap > bestOverlap && overlap >= SNAP_THRESHOLD) {
                bestOverlap = overlap;
                bestCell = cell.element;
            }
        }

        return bestCell ? { cell: bestCell, overlap: bestOverlap } : null;
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
                e.clientX - drag.startX,
                e.clientY - drag.startY
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

            // Handle snap
            const target = findSnapTarget();
            if (!target || !elementRef.current) return;

            const elementRect = elementRef.current.getBoundingClientRect();
            const cellRect = target.cell.getBoundingClientRect();

            // Center element horizontally in the cell
            const newX =
                drag.initialTransform.x +
                (cellRect.left - elementRect.left + drag.initialTransform.x) +
                (cellRect.width - elementRect.width) / 2;

            elementRef.current.style.transform = `translate(${newX}px, ${
                drag.initialTransform.y + (e.clientY - drag.startY)
            }px)`;

            if (!onDragEnd) return;

            const result = calculateNewDates(target.cell, elementRect);
            if (!result) return;

            const { startDate, endDate } = result;
            onDragEnd(event, startDate, endDate);
        },
        [onDragEnd, findSnapTarget]
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
        drag.startX = e.clientX;
        drag.startY = e.clientY;
        drag.lastX = e.clientX;
        drag.lastY = e.clientY;
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

export default useDraggable;
