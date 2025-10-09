import {
    MutableRefObject,
    RefObject,
    useCallback,
    useLayoutEffect,
    useRef,
} from "react";
import { DragInfo } from "./types";
import { GRID_VIEW_ID } from "@/components/BaseCalendar/constants";
import { CellPosition } from "../../../types";

const useGuards = (
    cellsRef: RefObject<CellPosition[]>,
    dragInfo: MutableRefObject<DragInfo>
) => {
    const rectRef = useRef<DOMRect>();
    useLayoutEffect(() => {
        const el = document.getElementById(GRID_VIEW_ID);
        if (!el) return;
        rectRef.current = el.getBoundingClientRect();
    }, []);

    const isOutsideHorizontalBounds = useCallback((newLeft: number) => {
        const r = rectRef.current;
        if (!r) return true;
        const calc = dragInfo.current.startPosition.x + newLeft;
        return calc < r.x || calc > r.x + r.width;
    }, []);
    const isOutsideVerticalBounds = useCallback((newTop: number) => {
        const c = cellsRef.current?.at(0);
        if (!c) return;
        const calc = c.top + newTop;
        return calc < c.top || calc > c.top + c.height;
    }, []);

    return { isOutsideHorizontalBounds, isOutsideVerticalBounds };
};

export default useGuards;
