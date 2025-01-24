import { MouseEvent, RefObject, useCallback, useRef } from "react";
import getOverlapRatio from "./getOverlapRatio";
import { CellPosition } from "../types";
import calculateNewDates from "./calculateNewDates";
import { TCalendarEvent } from "@/components/Calendar/types";
import updateDurationLabelAsync from "./updateDuration";

const DRAG_THRESHOLD = 5; // pixels
const SNAP_THRESHOLD = 0.5; // 50% overlap required for snapping

const useDraggable = (
    event: TCalendarEvent,
    elementRef: RefObject<HTMLDivElement>,
    cellsRef: RefObject<CellPosition[]>,
    onClick: ((e: MouseEvent<HTMLDivElement>) => void) | undefined,
    onDragEnd:
        | ((event: TCalendarEvent, startDate: string, endDate: string) => void)
        | undefined
) => {
    const dragRef = useRef({
        isDragging: false,
        startPos: { x: 0, y: 0 },
        elementPos: { x: 0, y: 0 },
        movement: 0,
    });

    const onMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
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

        updateDurationLabelAsync(e.currentTarget, cellsRef);
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

                //
                // Calculate new date with time
                //

                if (!onDragEnd) return;

                const { startDate, endDate } =
                    calculateNewDates(target.cell, elementRect) || {};

                // TODO: maybe reset event's position to the one before drag!
                if (!startDate || !endDate) return;

                onDragEnd(event, startDate, endDate);
            }
        },
        [onClick, onDragEnd]
    );

    return { onMouseDown, onMouseMove, onMouseUp };
};

export default useDraggable;
