import { ComponentType, forwardRef, RefObject, useCallback } from "react";
import useResponsiveCellPositions from "./useResponsiveCellPositions";
import updateDurationLabelAsync from "./updateDuration";
import useForwardedLocalRef from "@/hooks/useForwadedLocalRef";
import { CellPosition } from "../EventsTarget/types";

type OmitList = "cellsRef" | "onPositionUpdate";

type Responder = {
    cellsRef: RefObject<CellPosition[]>;
    onPositionUpdate: VoidFunction;
};

type WrappableComponent<T extends Responder> = ComponentType<T>;
type WithLabelUpdateProps<T extends Responder> = Omit<T, OmitList>;

const WithLabelUpdate = <T extends Responder>(
    Component: WrappableComponent<T>
) => {
    const WrappedComponent = forwardRef<
        HTMLDivElement,
        WithLabelUpdateProps<T>
    >((props, ref) => {
        const { cellsRef } = useResponsiveCellPositions();

        const [elementRef, { onRef }] =
            useForwardedLocalRef<HTMLDivElement>(ref);

        const onPositionUpdate = useCallback(() => {
            updateDurationLabelAsync(elementRef.current, cellsRef);
        }, []);

        // Type assertion to tell TypeScript that we're reconstructing T correctly
        const componentProps = {
            ref: onRef,
            cellsRef,
            onPositionUpdate,
            ...props,
        } as unknown as T & { ref: (node: HTMLDivElement | null) => void };

        return <Component {...componentProps} />;
    });

    WrappedComponent.displayName = `WithLabelUpdate(${Component.displayName || Component.name})`;

    return WrappedComponent;
};

export default WithLabelUpdate;
