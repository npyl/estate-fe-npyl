import { ComponentType, forwardRef, useCallback } from "react";
import useResponsiveCellPositions from "./useResponsiveCellPositions";
import updateDurationLabelAsync from "./updateDuration";
import useForwardedLocalRef from "@/hooks/useForwadedLocalRef";
import { GhostableProps } from "../Ghostable";

type OmitList = "cellsRef" | "onPositionUpdate";
type WrappableComponent = ComponentType<GhostableProps>;
type WithLabelUpdateProps = Omit<GhostableProps, OmitList>;

const WithLabelUpdate = (Ghostable: WrappableComponent) => {
    const WrappedComponent = forwardRef<HTMLDivElement, WithLabelUpdateProps>(
        (props, ref) => {
            const { cellsRef } = useResponsiveCellPositions();

            const [elementRef, { onRef }] =
                useForwardedLocalRef<HTMLDivElement>(ref);

            const onPositionUpdate = useCallback(() => {
                updateDurationLabelAsync(elementRef.current, cellsRef);
            }, []);

            return (
                <Ghostable
                    ref={onRef}
                    cellsRef={cellsRef}
                    onPositionUpdate={onPositionUpdate}
                    {...props}
                />
            );
        }
    );

    WrappedComponent.displayName = `WithLabelUpdate(${Ghostable.displayName || Ghostable.name})`;

    return WrappedComponent;
};

export default WithLabelUpdate;
