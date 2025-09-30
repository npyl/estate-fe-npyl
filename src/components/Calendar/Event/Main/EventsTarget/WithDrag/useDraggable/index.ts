import { RefObject, useCallback, useRef } from "react";
import { CellPosition } from "../../types";
import {
    TCalendarEvent,
    TOnEventDragEnd,
    TOnEventDragStart,
} from "@/components/Calendar/types";
import calculateNewDates from "./calculateNewDates";
import { CELL_CLASSNAME } from "@/components/Calendar/constants";
import useMouseMove, { DragInfo } from "./useMouseMove";

const DRAG_THRESHOLD = 5; // pixels, for distinguishing between click and drag

const useDraggable = (
    event: TCalendarEvent,
    eventRef: RefObject<HTMLDivElement | null>,
    cellsRef: RefObject<CellPosition[]>,
    onPositionUpdate: VoidFunction,
    onEventDragEarlyStart?: VoidFunction,
    onEventDragStart?: TOnEventDragStart,
    onEventDragEarlyEnd?: VoidFunction,
    onEventDragEnd?: TOnEventDragEnd
) => {
    const mouseOffset = useRef({ x: 0, y: 0 });
    const dragInfo = useRef<DragInfo>({
        isDragging: false,
        startPosition: { x: 0, y: 0 },
        initialTransform: { x: 0, y: 0 },
    });

    // INFO: if after 100ms we are still dragging (a.k.a. it wasn't a click) fire the onEventDragStart event
    const evaluateDragStart = useCallback(() => {
        if (!dragInfo.current.isDragging) return;
        onEventDragStart?.();
    }, [onEventDragStart]);

    const handleMouseMove = useMouseMove(
        eventRef,
        cellsRef,
        dragInfo,
        onPositionUpdate
    );

    const handleMouseUp = useCallback(
        (e: globalThis.MouseEvent) => {
            document.removeEventListener("mousemove", handleMouseMove, true);
            document.removeEventListener("mouseup", handleMouseUp, true);
            dragInfo.current.isDragging = false;

            if (!eventRef.current) return;

            // Calculate total movement to determine if this was a click or drag
            const totalMovement = Math.hypot(
                e.clientX - dragInfo.current.startPosition.x,
                e.clientY - dragInfo.current.startPosition.y
            );

            // If it's just a click (under threshold), don't proceed with the drag end logic
            if (totalMovement <= DRAG_THRESHOLD) {
                onEventDragEarlyEnd?.();
                return;
            }

            // Find the PPCell that contains the center of the draggable element
            const elementRect = eventRef.current.getBoundingClientRect();
            if (!elementRect) return;
            const elementCenter = elementRect.left + elementRect.width / 2;
            const cells = document.getElementsByClassName(CELL_CLASSNAME);

            for (const cell of cells) {
                const cellRect = cell.getBoundingClientRect();
                if (
                    elementCenter >= cellRect.left &&
                    elementCenter <= cellRect.right
                ) {
                    const { startDate, endDate } =
                        calculateNewDates(cell as HTMLElement, elementRect) ||
                        {};

                    if (!startDate || !endDate) return;

                    onEventDragEnd?.(event, startDate, endDate);

                    return;
                }
            }
        },
        [event, onEventDragEarlyEnd, onEventDragEnd, handleMouseMove]
    );

    const onMouseDown = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();

            if (!onEventDragStart) return;

            const eventElement = eventRef.current;
            if (!eventElement) return;

            // Calculate and store the initial mouse position relative to the element
            const eventRect = eventElement.getBoundingClientRect();

            // Store the offset where the mouse clicked within the element (KEEP ORIGINAL)
            mouseOffset.current = {
                x: e.clientX - eventRect.left,
                y: e.clientY - eventRect.top,
            };

            // Store the starting position for transform calculation
            dragInfo.current.startPosition = { x: e.clientX, y: e.clientY };

            // Get current transform from computed style if no inline style exists
            const computedStyle = window.getComputedStyle(eventElement);
            const currentLeft = parseFloat(
                eventElement.style.left || computedStyle.left || "0"
            );
            const currentTop = parseFloat(
                eventElement.style.top || computedStyle.top || "0"
            );

            dragInfo.current.initialTransform = {
                x: currentLeft,
                y: currentTop,
            };

            onEventDragEarlyStart?.();

            document.addEventListener("mousemove", handleMouseMove, true);
            document.addEventListener("mouseup", handleMouseUp, true);

            dragInfo.current.isDragging = true;
            setTimeout(evaluateDragStart, 100);
        },
        [
            handleMouseMove,
            handleMouseUp,
            onEventDragStart,
            onEventDragEarlyStart,
            evaluateDragStart,
        ]
    );

    return { onMouseDown };
};

export default useDraggable;
