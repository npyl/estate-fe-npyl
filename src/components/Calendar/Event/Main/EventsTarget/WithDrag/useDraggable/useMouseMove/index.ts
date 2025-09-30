import { MutableRefObject, RefObject, useCallback } from "react";
import { CellPosition } from "../../../types";
import { CELL_HOUR_HEIGHT } from "@/constants/calendar";
import { DragInfo } from "./types";
import useGuards from "./useGuards";

const INTERVAL_HEIGHT = CELL_HOUR_HEIGHT / 4; // 4 * 15min intervals per hour (15px each)

const useMouseMove = (
    eventRef: RefObject<HTMLDivElement | null>,
    cellsRef: RefObject<CellPosition[]>,
    dragInfo: MutableRefObject<DragInfo>,
    onPositionUpdate: VoidFunction
) => {
    const { isOutsideHorizontalBounds, isOutsideVerticalBounds } = useGuards(
        cellsRef,
        dragInfo
    );

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

            if (isOutsideHorizontalBounds(newLeft)) return;

            // Update DOM element position
            eventElement.style.left = `${newLeft}px`;
        },
        []
    );

    const moveVertically = useCallback(
        (clientY: number, eventElement: HTMLDivElement) => {
            // Calculate Y movement from start position
            const verticalMovement = clientY - dragInfo.current.startPosition.y;

            // INFO: allow mouse to make minor movements before actually changing position!
            if (Math.abs(verticalMovement) < INTERVAL_HEIGHT) return;

            const rawY = dragInfo.current.initialTransform.y + verticalMovement;

            // HARD SNAP: Calculate which interval we're in based on raw mouse position
            // Round to nearest interval for immediate snapping
            const targetInterval = Math.floor(rawY / INTERVAL_HEIGHT);

            // Calculate exact snapped position
            const snappedTop = targetInterval * INTERVAL_HEIGHT;

            if (isOutsideVerticalBounds(snappedTop)) return;

            // Update DOM element position with hard snap
            eventElement.style.top = `${snappedTop}px`;

            // Notify that position has changed
            setTimeout(onPositionUpdate, 150);
        },
        []
    );

    return useCallback(
        async (e: globalThis.MouseEvent) => {
            if (!dragInfo.current.isDragging) return;

            const eventElement = eventRef.current;
            if (!eventElement) return;

            // Calculate new position with snapping
            moveHorizontally(e.clientX, eventElement);
            moveVertically(e.clientY, eventElement);
        },
        [moveHorizontally, moveVertically]
    );
};

export type { DragInfo };
export default useMouseMove;
