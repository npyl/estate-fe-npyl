import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { useMapContext } from "../../context";
import Box, { BoxProps } from "@mui/material/Box";

interface MapControlProps extends Omit<BoxProps, "position"> {
    position?: google.maps.ControlPosition;
}

interface MapControlRef {
    load: VoidFunction;
}

const MapControl = forwardRef<MapControlRef, MapControlProps>(
    ({ position = google.maps.ControlPosition.LEFT_CENTER, ...props }, ref) => {
        const { mapRef } = useMapContext();

        const controlDiv = useRef(document.createElement("div"));

        const load = useCallback(() => {
            if (!mapRef.current || !window.google) return;

            try {
                const controls = mapRef.current?.controls[position];
                controls.push(controlDiv.current);
            } catch (ex) {}
        }, [position]);

        useImperativeHandle(
            ref,
            () => ({
                load,
            }),
            []
        );

        return createPortal(<Box {...props} />, controlDiv.current);
    }
);

MapControl.displayName = "MapControl";

export type { MapControlRef };
export default MapControl;
