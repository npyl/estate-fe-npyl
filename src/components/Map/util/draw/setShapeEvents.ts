import debugLog from "@/_private/debugLog";
import { DrawShape } from "../../types";

const setShapeEvents = (shape: DrawShape, callback: () => void) => {
    if (shape instanceof google.maps.Circle) {
        google.maps.event.addListener(shape, "dragend", callback);
        google.maps.event.addListener(shape, "radius_changed", callback);
    } else if (shape instanceof google.maps.Rectangle) {
        google.maps.event.addListener(shape, "bounds_changed", callback);
    } else if (shape instanceof google.maps.Polygon) {
        const vertices = shape.getPath();

        vertices.addListener("set_at", callback);
        vertices.addListener("insert_at", callback);
    } else {
        debugLog("Unknown shape type.");
    }
};

export default setShapeEvents;
