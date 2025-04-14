import { forwardRef, MouseEvent, MutableRefObject, useCallback } from "react";
import { Stack, StackProps } from "@mui/material";
import useForwardedLocalRef from "@/hooks/useForwadedLocalRef";
import updateDurationLabelAsync from "./useDraggable/updateDuration";
import { CellPosition } from "./types";

interface DurationUpdateStackProps extends Omit<StackProps, "onMouseMove"> {
    cellsRef: MutableRefObject<CellPosition[]>;
}

const DurationUpdateStack = forwardRef<
    HTMLDivElement,
    DurationUpdateStackProps
>(
    (
        {
            cellsRef,
            onMouseDown: _onMouseDown,
            onMouseUp: _onMouseUp,
            ...props
        },
        ref
    ) => {
        const [elementRef, { onRef }] =
            useForwardedLocalRef<HTMLDivElement>(ref);

        const onMouseMove = useCallback(
            () => updateDurationLabelAsync(elementRef.current!, cellsRef),
            []
        );

        const onMouseDown = useCallback(
            (e: MouseEvent<HTMLDivElement>) => {
                if (!elementRef.current) return;
                document.addEventListener("mousemove", onMouseMove);
                _onMouseDown?.(e);
            },
            [_onMouseDown]
        );

        const onMouseUp = useCallback(
            (e: MouseEvent<HTMLDivElement>) => {
                document.removeEventListener("mousemove", onMouseMove);
                _onMouseUp?.(e);
            },
            [_onMouseUp]
        );

        return (
            <Stack
                ref={onRef}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                {...props}
            />
        );
    }
);

export default DurationUpdateStack;
