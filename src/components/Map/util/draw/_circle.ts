import { TShape } from "@/types/shape";
import { drawingToPoints } from ".";
import setShapeEvents from "./setShapeEvents";

const drawCircle = (
    lat: number,
    lng: number,
    radius: number,
    map: google.maps.Map,
    onChange: ((oldShape: TShape, newShape: TShape) => void) | null
) => {
    const circleConfig = {
        clickable: true,
        editable: !!onChange,
        draggable: !!onChange,
        center: { lat, lng }, // Center of the circle
        radius: radius, // Radius (in meters)
        fillColor: "cyan",
        fillOpacity: 0.15,
        strokeWeight: 1,
        zIndex: 1,
    };

    const circle = new google.maps.Circle({ ...circleConfig, map });
    const encodedOldShape = drawingToPoints(circle);

    // Support shape drag/change
    if (onChange) {
        setShapeEvents(circle, () =>
            onChange(encodedOldShape, drawingToPoints(circle))
        );
    }

    return circle;
};

export default drawCircle;
