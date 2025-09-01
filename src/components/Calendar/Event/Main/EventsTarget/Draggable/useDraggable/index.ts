import { RefObject, useCallback, useLayoutEffect, useRef } from "react";
import { CellPosition } from "../../types";
import { CELL_HOUR_HEIGHT, END_HOUR, START_HOUR } from "@/constants/calendar";
import {
    TCalendarEvent,
    TOnEventDragEnd,
    TOnEventDragStart,
} from "@/components/Calendar/types";
import calculateNewDates from "./calculateNewDates";
import { CELL_CLASSNAME } from "@/components/Calendar/constants";
import { BASE_VIEW_ID } from "@/components/BaseCalendar/View";

const INTERVAL_HEIGHT = CELL_HOUR_HEIGHT / 4; // 4 * 15min intervals per hour (15px each)
const DRAG_THRESHOLD = 5; // pixels, for distinguishing between click and drag

const hoursTotal = END_HOUR - START_HOUR;
const intervalsPerHour = 4; // 15-minute intervals in an hour
const totalIntervals = hoursTotal * intervalsPerHour;

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
    const dragInfo = useRef({
        isDragging: false,
        startPosition: { x: 0, y: 0 },
        initialTransform: { x: 0, y: 0 },
    });

    const gridRef = useRef<HTMLElement>();
    useLayoutEffect(() => {
        const el = document.getElementById(BASE_VIEW_ID);
        if (!el) return;
        gridRef.current = el;
    }, []);

    // INFO: if after 100ms we are still dragging (a.k.a. it wasn't a click) fire the onEventDragStart event
    const evaluateDragStart = useCallback(() => {
        if (!dragInfo.current.isDragging) return;
        onEventDragStart?.();
    }, [onEventDragStart]);

    const handleMouseMove = useCallback(
        async (e: globalThis.MouseEvent) => {
            const grid = gridRef.current;
            const eventElement = eventRef.current;
            if (!grid || !eventElement) return;

            // Get cell width information
            const dayWidth = cellsRef.current?.at(0)?.width ?? 100;

            // Calculate horizontal movement from start position (KEEP ORIGINAL LOGIC)
            const horizontalMovement =
                e.clientX - dragInfo.current.startPosition.x;

            // INFO: Only snap to new day if we've moved more than half a day width; this prevents accidental jumps
            const dayOffset =
                Math.abs(horizontalMovement) >= dayWidth / 2
                    ? Math.sign(horizontalMovement) *
                      Math.floor(
                          (Math.abs(horizontalMovement) + dayWidth / 2) /
                              dayWidth
                      )
                    : 0;

            const newX =
                dragInfo.current.initialTransform.x + dayOffset * dayWidth;

            // FIXED: Calculate Y movement from start position (like horizontal)
            const verticalMovement =
                e.clientY - dragInfo.current.startPosition.y;
            const newY = dragInfo.current.initialTransform.y + verticalMovement;

            // For vertical snapping, we need to ensure we're truly aligning to 15-minute intervals
            // Force snapping to exact multiples of INTERVAL_HEIGHT (15px)
            const rawInterval = newY / INTERVAL_HEIGHT;
            const newInterval = Math.max(
                0,
                Math.min(totalIntervals - 1, Math.floor(rawInterval + 0.5)) // Proper rounding
            );

            // Calculate new position with snapping
            const newLeft = newX;
            const newTop = newInterval * INTERVAL_HEIGHT; // This must be exactly divisible by 15

            // Update DOM element position
            eventElement.style.left = `${newLeft}px`;
            eventElement.style.top = `${newTop}px`;

            onPositionUpdate();
        },
        [onPositionUpdate, cellsRef]
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

            // FIXED: Get current transform from computed style if no inline style exists
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
