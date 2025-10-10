import {
    FC,
    PropsWithChildren,
    ReactPortal,
    useLayoutEffect,
    useState,
} from "react";
import { createPortal } from "react-dom";
import { useMapContext } from "../../context";
import Box from "@mui/material/Box";

interface MapControlProps extends PropsWithChildren {
    position?: google.maps.ControlPosition;
}

const MapControl: FC<MapControlProps> = ({
    position = google.maps.ControlPosition.LEFT_CENTER,
    children,
}) => {
    const { mapRef } = useMapContext();

    const [content, setContent] = useState<ReactPortal>();

    useLayoutEffect(() => {
        // Create Content
        const controlDiv = document.createElement("div");
        const c = createPortal(<Box p={1}>{children}</Box>, controlDiv);

        const controls = mapRef.current?.controls[position];
        if (!controls) return;

        const index = controls.push(controlDiv) - 1;

        setContent(c);

        return () => {
            controls.removeAt(index);
            controlDiv.remove();
        };
    }, [position, children]);

    if (!content) return null;

    return content;
};

MapControl.displayName = "MapControl";

export default MapControl;
