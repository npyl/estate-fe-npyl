import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import MapControl, { MapControlRef } from "./Control";
import { IMapControls } from "@/components/Map/types";

interface ControlsRef {
    load: VoidFunction;
}

const Controls = forwardRef<ControlsRef, IMapControls>(
    ({ centerTop, leftCenter, leftTop, rightTop }, ref) => {
        const controlsLeftTop = useRef<MapControlRef>(null);
        const controlsLeftCenter = useRef<MapControlRef>(null);
        const controlsRightTop = useRef<MapControlRef>(null);
        const controlsCenterTop = useRef<MapControlRef>(null);

        const load = useCallback(() => {
            controlsLeftTop.current?.load();
            controlsLeftCenter.current?.load();
            controlsRightTop.current?.load();
            controlsCenterTop.current?.load();
        }, []);

        useImperativeHandle(
            ref,
            () => ({
                load,
            }),
            []
        );

        return (
            <>
                {leftTop ? (
                    <MapControl
                        ref={controlsLeftTop}
                        position={google.maps.ControlPosition.TOP_LEFT}
                        p={1}
                    >
                        {leftTop}
                    </MapControl>
                ) : null}
                {leftCenter ? (
                    <MapControl
                        ref={controlsLeftCenter}
                        position={google.maps.ControlPosition.LEFT_CENTER}
                        p={1}
                    >
                        {leftCenter}
                    </MapControl>
                ) : null}
                {rightTop ? (
                    <MapControl
                        ref={controlsRightTop}
                        position={google.maps.ControlPosition.TOP_RIGHT}
                        p={1}
                    >
                        {rightTop}
                    </MapControl>
                ) : null}
                {centerTop ? (
                    <MapControl
                        ref={controlsCenterTop}
                        position={google.maps.ControlPosition.TOP_CENTER}
                        p={1}
                    >
                        {centerTop}
                    </MapControl>
                ) : null}
            </>
        );
    }
);

export type { ControlsRef };
export default Controls;
