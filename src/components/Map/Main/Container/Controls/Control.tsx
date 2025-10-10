import { FC, ReactNode, useEffect, useRef } from "react";
import { useMapContext } from "../../context";
import { createRoot, Root } from "react-dom/client";
import Box, { BoxProps } from "@mui/material/Box";

interface MapControlProps extends Omit<BoxProps, "position" | "children"> {
    position?: google.maps.ControlPosition;
    children: ReactNode;
}

const MapControl: FC<MapControlProps> = ({
    position = google.maps.ControlPosition.LEFT_CENTER,
    children,
    ...props
}) => {
    const { mapRef } = useMapContext();

    const rootRef = useRef<Root>();

    useEffect(() => {
        if (!mapRef.current || !window.google) return;

        try {
            const container = document.createElement("div");

            const root = createRoot(container);
            rootRef.current = root;

            root.render(<Box {...props}>{children}</Box>);

            const controls = mapRef.current?.controls[position];
            controls.push(container);
        } catch (ex) {}

        return () => {
            rootRef.current?.unmount();
            rootRef.current = undefined;
        };
    }, [position, children]);

    return null;
};

MapControl.displayName = "MapControl";

export default MapControl;
