import { FC, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { useMapContext } from "../../context";
import Box, { BoxProps } from "@mui/material/Box";

interface MapControlProps extends Omit<BoxProps, "position"> {
    position?: google.maps.ControlPosition;
}

const MapControl: FC<MapControlProps> = ({
    position = google.maps.ControlPosition.LEFT_CENTER,
    ...props
}) => {
    const { mapRef } = useMapContext();

    const controlDiv = useRef(document.createElement("div"));

    const onLoad = useCallback(() => {
        if (!mapRef.current || !window.google) {
            console.log("Problem is: ", mapRef.current, " ss: ", window.google);
            return;
        }

        try {
            const controls = mapRef.current?.controls[position];
            controls.push(controlDiv.current);
        } catch (ex) {}
    }, [position]);

    return createPortal(<Box ref={onLoad} {...props} />, controlDiv.current);
};

MapControl.displayName = "MapControl";

export default MapControl;
