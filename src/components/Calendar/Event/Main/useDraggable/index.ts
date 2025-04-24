import { RefObject, useCallback, useLayoutEffect, useRef } from "react";
import { CellPosition } from "../../Main/types";
import { CELL_HOUR_HEIGHT, END_HOUR, START_HOUR } from "@/constants/calendar";
import { TCalendarEvent, TOnEventDragEnd } from "@/components/Calendar/types";
import calculateNewDates from "./calculateNewDates";
import { CELL_CLASSNAME } from "../../_constants";

const INTERVAL_HEIGHT = CELL_HOUR_HEIGHT / 4; // 4 * 15min intervals per hour (15px each)

const hoursTotal = END_HOUR - START_HOUR;
const intervalsPerHour = 4; // 15-minute intervals in an hour
const totalIntervals = hoursTotal * intervalsPerHour;

const useDraggable = (
    event: TCalendarEvent,
    eventRef: RefObject<HTMLDivElement | null>,
    cellsRef: RefObject<CellPosition[]>,
    onPositionUpdate: () => void,
    onEventDragEnd?: TOnEventDragEnd
) => {
    const gridRef = useRef<HTMLElement>();
    useLayoutEffect(() => {
        const el = document.getElementById("BaseCalendarView");
        if (!el) return;
        gridRef.current = el;
    }, []);

    // Add mouseOffset ref to track the initial click position relative to the element
    const mouseOffset = useRef({ x: 0, y: 0 });

    const handleMouseMove = useCallback(
        (e: globalThis.MouseEvent) => {
            const grid = gridRef.current;
            const element = eventRef.current;
            if (!grid || !element) return;

            const gridRect = grid.getBoundingClientRect();

            // Get cell width information
            const dayWidth = cellsRef.current?.at(0)?.width ?? 100;

            // Calculate new position relative to grid, accounting for the initial offset
            const newX =
                e.clientX -
                gridRect.left +
                grid.scrollLeft -
                mouseOffset.current.x;
            const newY =
                e.clientY -
                gridRect.top +
                grid.scrollTop -
                mouseOffset.current.y;

            // Snap to days (horizontal)
            const newDay = Math.floor(newX / dayWidth);

            // For vertical snapping, we need to ensure we're truly aligning to 15-minute intervals
            // Force snapping to exact multiples of INTERVAL_HEIGHT (15px)
            const rawInterval = newY / INTERVAL_HEIGHT;
            const newInterval = Math.max(
                0,
                Math.min(totalIntervals - 1, Math.floor(rawInterval + 0.5)) // Proper rounding
            );

            // Calculate new position with snapping
            const newLeft = newDay * dayWidth;
            const newTop = newInterval * INTERVAL_HEIGHT; // This must be exactly divisible by 15

            // Update DOM element position
            element.style.left = `${newLeft}px`;
            element.style.top = `${newTop}px`;

            onPositionUpdate();
        },
        [onPositionUpdate]
    );

    const handleMouseUp = useCallback(() => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);

        // Find the PPCell that contains the center of the draggable element
        const elementRect = eventRef.current?.getBoundingClientRect();
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
                    calculateNewDates(cell as HTMLElement, elementRect) || {};

                if (!startDate || !endDate) return;

                onEventDragEnd?.(event, startDate, endDate);

                return;
            }
        }
    }, [event, handleMouseMove, onEventDragEnd]);

    const onMouseDown = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            const element = eventRef.current;
            if (!element) return;

            // Calculate and store the initial mouse position relative to the element
            const elementRect = element.getBoundingClientRect();

            // INFO: Store the offset where the mouse clicked within the element
            // (This will help prevent jumps)
            mouseOffset.current = {
                x: e.clientX - elementRect.left,
                y: e.clientY - elementRect.top,
            };

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        },
        [handleMouseMove, handleMouseUp]
    );

    return { onMouseDown };
};

export default useDraggable;
