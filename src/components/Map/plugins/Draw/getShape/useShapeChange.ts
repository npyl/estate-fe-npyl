import { useCallback, useRef } from "react";
import { drawingToPoints } from "@/components/Map/util";
import { DrawShape } from "@/components/Map/types";
import { TShape } from "@/types/shape";

const CHANGE_DELAY = 300; // 300ms

const useTimeout = () => {
    const timeout = useRef<number>();
    const clear = useCallback(() => {
        if (!timeout.current) return;
        window.clearTimeout(timeout.current);
        timeout.current = undefined;
    }, []);
    const set = useCallback((onTimeout: VoidFunction) => {
        timeout.current = window.setTimeout(onTimeout, CHANGE_DELAY);
    }, []);
    return { set, clear };
};

const useShapeChange = (
    s: TShape,
    onShapeChange?: (oldShape: TShape, newShape: TShape) => void
) => {
    const { set, clear } = useTimeout();

    const onTimeout = useCallback(
        (res: DrawShape) => () => {
            // clear timeout
            clear();

            // onShapeChange
            const newS = drawingToPoints(res);
            if (!newS) return;
            onShapeChange?.(s, newS);
        },
        [onShapeChange, s]
    );

    return useCallback(
        (res: DrawShape) => () => {
            clear();
            set(onTimeout(res));
        },
        [onShapeChange, s]
    );
};

export default useShapeChange;
