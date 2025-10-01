import { useCallback } from "react";
import { drawingToPoints } from "@/components/Map/util";
import { DrawShape } from "@/components/Map/types";
import { TShape } from "@/types/shape";
import useWaitForStop from "@/hooks/useWaitForStop"; // Update with correct path

const CHANGE_DELAY = 300; // 300ms

const useShapeChange = (
    s: TShape,
    onShapeChange?: (oldShape: TShape, newShape: TShape) => void
) => {
    const doNothing = useCallback((res: DrawShape) => res, []);

    const onStop = useCallback(
        (res: DrawShape) => () => {
            const newS = drawingToPoints(res);
            if (!newS) return;
            onShapeChange?.(s, newS);
        },
        [onShapeChange, s]
    );

    return useWaitForStop(doNothing, onStop, CHANGE_DELAY);
};

export default useShapeChange;
