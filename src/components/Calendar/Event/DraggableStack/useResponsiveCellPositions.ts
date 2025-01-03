import { useCallback, useRef, useLayoutEffect } from "react";
import { CellPosition } from "./types";

const useResponsiveCellPositions = () => {
    const cellsRef = useRef<CellPosition[]>([]);

    // Update cells positions cache
    const updateCellsPositions = useCallback(() => {
        const cells = Array.from(
            document.getElementsByClassName("PPCell")
        ) as HTMLElement[];

        cellsRef.current = cells.map((cell) => {
            const rect = cell.getBoundingClientRect();
            return {
                left: rect.left,
                top: rect.top,
                width: rect.width,
                height: rect.height,
                element: cell,
            };
        });
    }, []);

    useLayoutEffect(() => {
        updateCellsPositions();
        window.addEventListener("resize", updateCellsPositions);
        return () => window.removeEventListener("resize", updateCellsPositions);
    }, []);

    return { cellsRef };
};

export default useResponsiveCellPositions;
