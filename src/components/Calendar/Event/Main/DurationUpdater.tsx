import { FC, RefObject, useCallback, useEffect } from "react";
import updateDurationLabelAsync from "./updateDuration";
import { CellPosition } from "./types";

interface DurationUpdaterProps {
    elementRef: RefObject<HTMLDivElement>;
    cellsRef: RefObject<CellPosition[]>;
}

const DurationUpdater: FC<DurationUpdaterProps> = ({
    elementRef,
    cellsRef,
}) => {
    const onMouseMove = useCallback(
        () => updateDurationLabelAsync(elementRef.current!, cellsRef),
        []
    );

    const onMouseDown = useCallback(() => {
        if (!elementRef.current) return;
        document.addEventListener("mousemove", onMouseMove);
    }, []);

    const onMouseUp = useCallback(() => {
        document.removeEventListener("mousemove", onMouseMove);
    }, []);

    useEffect(() => {
        if (!elementRef.current) return;
        elementRef.current.onmousedown = onMouseDown;
        elementRef.current.onmouseup = onMouseUp;
        return () => {
            if (!elementRef.current) return;
            elementRef.current.onmousedown = null;
            elementRef.current.onmouseup = null;
        };
    }, []);

    return null;
};

export default DurationUpdater;
