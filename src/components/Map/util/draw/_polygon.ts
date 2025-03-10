import { TShape } from "@/types/shape";
import { drawingToPoints } from ".";
import setShapeEvents from "./setShapeEvents";

const drawPolygon = (
    paths: google.maps.LatLngLiteral[][],
    map: google.maps.Map,
    onChange?: (oldShape: TShape, newShape: TShape) => void
) => {
    const polygonConfig = {
        clickable: true,
        editable: !!onChange,
        draggable: !!onChange,
        paths: paths,
        map: map,
        fillColor: "cyan",
        fillOpacity: 0.15,
        strokeWeight: 1,
        zIndex: 1,
    };

    const polygon = new google.maps.Polygon({ ...polygonConfig, map });
    const encodedOldShape = drawingToPoints(polygon);

    // Support shape drag/change
    if (onChange) {
        setShapeEvents(polygon, () =>
            onChange(encodedOldShape, drawingToPoints(polygon))
        );
    }

    return polygon;
};

export default drawPolygon;
