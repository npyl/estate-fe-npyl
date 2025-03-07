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
    const circleConfig: google.maps.CircleOptions = {
        map,
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

    const circle = new google.maps.Circle(circleConfig);
    const oldShape = drawingToPoints(circle);

    // Support shape drag/change
    if (onChange) {
        const shape = drawingToPoints(circle);
        const cb = () => onChange(oldShape, shape);
        setShapeEvents(circle, cb);
    }

    return circle;
};

export default drawCircle;
