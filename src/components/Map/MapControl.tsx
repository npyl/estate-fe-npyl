import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface MapControlProps {
    map: google.maps.Map | null;
    position?: google.maps.ControlPosition | null;
    children: React.ReactNode;
}

// Custom MapControl component to add controls on the map
const MapControl: React.FC<MapControlProps> = ({
    map,
    position = google?.maps?.ControlPosition?.LEFT_CENTER ?? null,
    children,
}) => {
    const controlDiv = useRef(document.createElement("div")); // Create the control div only once using useRef

    useEffect(() => {
        if (!map || !window.google || position === null) return; // Ensure map, google, and position are available

        const controls = map.controls[position]; // Get the controls array for the specified position
        controls.push(controlDiv.current); // Add the control div to the map at the specified position

        return () => {
            // Cleanup: Remove the control when the component is unmounted
            const index = controls.getArray().indexOf(controlDiv.current);
            if (index > -1) controls.removeAt(index);
        };
    }, [map, position]); // Only run this effect when the map or position changes

    return createPortal(
        <div style={{ marginLeft: 16, marginTop: 16 }}>{children}</div>,
        controlDiv.current
    );
};

export default MapControl;
