import { TShape } from "@/types/shape";
import { drawingToPoints } from ".";
import setShapeEvents from "./setShapeEvents";

const drawRectangle = (
    nelat: number,
    nelng: number,
    swlat: number,
    swlng: number,
    map: google.maps.Map,
    onChange: ((oldShape: TShape, newShape: TShape) => void) | null
) => {
    const rectangleBounds = {
        north: nelat,
        south: swlat,
        east: nelng,
        west: swlng,
    };

    const rectangleConfig = {
        clickable: true,
        editable: !!onChange,
        draggable: !!onChange,
        bounds: rectangleBounds,
        map: map,
        fillColor: "cyan",
        fillOpacity: 0.15,
        strokeWeight: 1,
        zIndex: 1,
    };

    const rectangle = new google.maps.Rectangle({ ...rectangleConfig, map });
    const encodedOldShape = drawingToPoints(rectangle);

    // Support shape drag/change
    if (onChange) {
        setShapeEvents(rectangle, () =>
            onChange(encodedOldShape, drawingToPoints(rectangle))
        );
    }

    return rectangle;
};

export default drawRectangle;
