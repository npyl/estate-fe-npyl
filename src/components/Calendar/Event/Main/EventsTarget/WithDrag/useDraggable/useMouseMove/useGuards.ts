import { MutableRefObject, RefObject, useCallback, useRef } from "react";
import { DragInfo } from "./types";
import { GRID_VIEW_ID } from "@/components/BaseCalendar/constants";
import { CellPosition } from "../../../types";
import { getDividerId } from "@/components/Calendar/Views/Numbering";
import { CELL_HOUR_HEIGHT, END_HOUR, START_HOUR } from "@/constants/calendar";

// ------------------------------------------------------------------------------------

const getHorizontalBounds = () => {
    const b = document.getElementById(GRID_VIEW_ID);
    const rect = b?.getBoundingClientRect();
    const leftBound = rect?.left ?? 0;
    const rightBound = (rect?.left ?? 0) + (rect?.width ?? 0);
    return { leftBound, rightBound };
};

// INFO: this is not expected to change (=> no observer needed)
const useHorizontalBounds = () => useRef(getHorizontalBounds());

// ------------------------------------------------------------------------------------

const getRects = () => {
    const b0 = document.getElementById(getDividerId(START_HOUR));
    const b1 = document.getElementById(getDividerId(END_HOUR));
    const firstBound = b0?.getBoundingClientRect();
    const lastBound = b1?.getBoundingClientRect();
    return { firstBound, lastBound };
};

const getVerticalBounds = () => {
    const b = getRects();
    const topBound = b.firstBound?.y ?? 0;
    const bottomBound = (b.lastBound?.y ?? 0) - CELL_HOUR_HEIGHT;
    return { topBound, bottomBound };
};

// INFO: this is expected to change; (=> leverage of the external re-render to re-calculate this)
const useVerticalBounds = () => getVerticalBounds();

// ------------------------------------------------------------------------------------

const useGuards = (
    cellsRef: RefObject<CellPosition[]>,
    dragInfo: MutableRefObject<DragInfo>
) => {
    const horizontalBounds = useHorizontalBounds();
    const verticalBounds = useVerticalBounds();

    const isOutsideHorizontalBounds = useCallback((newLeft: number) => {
        const b = horizontalBounds.current;
        if (!b) return true;
        const calc = dragInfo.current.startPosition.x + newLeft;
        return calc < b.leftBound || calc > b.rightBound;
    }, []);
    const isOutsideVerticalBounds = useCallback(
        (newTop: number) => {
            const c = cellsRef.current?.at(0);
            if (!c) return true;
            const calc = c.top + newTop;
            return (
                calc < verticalBounds.topBound ||
                calc > verticalBounds.bottomBound
            );
        },
        [verticalBounds]
    );

    return { isOutsideHorizontalBounds, isOutsideVerticalBounds };
};

export default useGuards;
