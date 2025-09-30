import {
    MutableRefObject,
    RefObject,
    useCallback,
    useLayoutEffect,
    useRef,
} from "react";
import { CellPosition } from "../../types";
import { CELL_HOUR_HEIGHT, END_HOUR, START_HOUR } from "@/constants/calendar";
import { BASE_VIEW_ID } from "@/components/BaseCalendar/View";

const hoursTotal = END_HOUR - START_HOUR;
const intervalsPerHour = 4; // 15-minute intervals in an hour

const INTERVAL_HEIGHT = CELL_HOUR_HEIGHT / 4; // 4 * 15min intervals per hour (15px each)
const totalIntervals = hoursTotal * intervalsPerHour;

interface DragInfo {
    isDragging: boolean;
    startPosition: {
        x: number;
        y: number;
    };
    initialTransform: {
        x: number;
        y: number;
    };
}

const useGridRef = () => {
    const gridRef = useRef<HTMLElement>();
    useLayoutEffect(() => {
        const el = document.getElementById(BASE_VIEW_ID);
        if (!el) return;
        gridRef.current = el;
    }, []);
    return gridRef;
};

const useMouseMove = (
    eventRef: RefObject<HTMLDivElement | null>,
    cellsRef: RefObject<CellPosition[]>,
    dragInfo: MutableRefObject<DragInfo>,
    onPositionUpdate: VoidFunction
) => {
    const gridRef = useGridRef();

    const moveHorizontally = useCallback(
        (clientX: number, eventElement: HTMLDivElement) => {
            // Get cell width information
            const dayWidth = cellsRef.current?.at(0)?.width ?? 100;

            // Calculate horizontal movement from start position (KEEP ORIGINAL LOGIC)
            const horizontalMovement =
                clientX - dragInfo.current.startPosition.x;

            // INFO: Only snap to new day if we've moved more than half a day width; this prevents accidental jumps
            const dayOffset =
                Math.abs(horizontalMovement) >= dayWidth / 2
                    ? Math.sign(horizontalMovement) *
                      Math.floor(
                          (Math.abs(horizontalMovement) + dayWidth / 2) /
                              dayWidth
                      )
                    : 0;

            const newLeft =
                dragInfo.current.initialTransform.x + dayOffset * dayWidth;

            // Update DOM element position
            eventElement.style.left = `${newLeft}px`;
        },
        []
    );

    const moveVertically = useCallback(
        (clientY: number, eventElement: HTMLDivElement) => {
            // Calculate Y movement from start position
            const verticalMovement = clientY - dragInfo.current.startPosition.y;

            // Ignore small vertical movements; only accept multiples of INTERVAL_HEIGHT
            const shouldIgnore =
                Math.abs(verticalMovement) % INTERVAL_HEIGHT !== 0;
            if (shouldIgnore) return;

            const rawY = dragInfo.current.initialTransform.y + verticalMovement;

            // HARD SNAP: Calculate which interval we're in based on raw mouse position
            // Round to nearest interval for immediate snapping
            const targetInterval = Math.round(rawY / INTERVAL_HEIGHT);

            // Clamp to valid range
            const clampedInterval = Math.max(
                0,
                Math.min(totalIntervals - 1, targetInterval)
            );

            // Calculate exact snapped position
            const snappedTop = clampedInterval * INTERVAL_HEIGHT;

            // Update DOM element position with hard snap
            eventElement.style.top = `${snappedTop}px`;

            // Notify that position has changed
            onPositionUpdate();
        },
        [onPositionUpdate]
    );

    return useCallback(
        async (e: globalThis.MouseEvent) => {
            if (!dragInfo.current.isDragging) return;

            const grid = gridRef.current;
            const eventElement = eventRef.current;
            if (!grid || !eventElement) return;

            // Calculate new position with snapping
            moveHorizontally(e.clientX, eventElement);
            moveVertically(e.clientY, eventElement);
        },
        [moveHorizontally, moveVertically]
    );
};

export type { DragInfo };
export default useMouseMove;
