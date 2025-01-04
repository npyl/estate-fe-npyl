import { MouseEvent, RefObject, useCallback, useRef } from "react";
import getOverlapRatio from "./getOverlapRatio";
import { CellPosition } from "./types";

const DRAG_THRESHOLD = 5; // pixels
const SNAP_THRESHOLD = 0.5; // 50% overlap required for snapping

const calculateNewDate = (targetCell: HTMLElement) => {
    const cellDate = targetCell.getAttribute("data-date");

    if (!cellDate) {
        console.warn("No date attribute found on target cell");
        return null;
    }

    return cellDate; // Already in ISO string format
};

const useDraggable = (
    elementRef: RefObject<HTMLDivElement>,
    cellsRef: RefObject<CellPosition[]>,
    onClick: ((e: MouseEvent<HTMLDivElement>) => void) | undefined,
    onDragEnd: ((newStartDate: string) => void) | undefined
) => {
    const dragRef = useRef({
        isDragging: false,
        startPos: { x: 0, y: 0 },
        elementPos: { x: 0, y: 0 },
        movement: 0,
    });

    const onMouseMove = useCallback((e: MouseEvent) => {
        const drag = dragRef.current;
        if (!drag.isDragging || !elementRef.current) return;

        const deltaX = e.clientX - drag.startPos.x;
        const deltaY = e.clientY - drag.startPos.y;

        // Update movement tracking
        drag.movement += Math.hypot(deltaX, deltaY);

        // Update element position
        const newPos = {
            x: drag.elementPos.x + deltaX,
            y: drag.elementPos.y + deltaY,
        };
        elementRef.current.style.transform = `translate(${newPos.x}px, ${newPos.y}px)`;

        drag.startPos = { x: e.clientX, y: e.clientY };
        drag.elementPos = newPos;
    }, []);

    const findSnapTarget = useCallback(() => {
        if (!elementRef.current) return null;

        const elementRect = elementRef.current.getBoundingClientRect();

        return cellsRef.current?.reduce((best, cell) => {
            const overlap = getOverlapRatio(elementRect, cell);

            return overlap > (best?.overlap ?? 0) && overlap >= SNAP_THRESHOLD
                ? { cell: cell.element, overlap }
                : best;
        }, null as { cell: HTMLElement; overlap: number } | null);
    }, []);

    const onMouseDown = useCallback((e: MouseEvent) => {
        e.stopPropagation();
        const drag = dragRef.current;

        drag.isDragging = true;
        drag.startPos = { x: e.clientX, y: e.clientY };
        drag.movement = 0;

        if (elementRef.current) {
            elementRef.current.style.transition = "none";
            elementRef.current.style.cursor = "grabbing";
        }
    }, []);

    const onMouseUp = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            const drag = dragRef.current;

            if (!drag.isDragging) return;
            drag.isDragging = false;

            if (elementRef.current) {
                elementRef.current.style.transition = "transform 0.2s ease";
                elementRef.current.style.cursor = "grab";
            }

            // Handle click vs drag
            if (drag.movement <= DRAG_THRESHOLD) {
                onClick?.(e);
                return;
            }

            // Handle snap
            const target = findSnapTarget();
            if (target && elementRef.current) {
                const elementRect = elementRef.current.getBoundingClientRect();
                const cellRect = target.cell.getBoundingClientRect();

                const newX =
                    cellRect.left -
                    elementRect.left +
                    drag.elementPos.x +
                    (cellRect.width - elementRect.width) / 2;

                elementRef.current.style.transform = `translate(${newX}px, ${drag.elementPos.y}px)`;
                drag.elementPos.x = newX;
            }

            //
            // onDragEnd calculations
            //

            if (!target?.cell || !onDragEnd) {
                console.log("No target cell or onDragEnd handler");
                return;
            }

            const newStartDate = calculateNewDate(target.cell) || "";

            onDragEnd?.(newStartDate);
        },
        [onClick, onDragEnd]
    );

    return { onMouseDown, onMouseMove, onMouseUp };
};

export default useDraggable;
