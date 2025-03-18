import debugLog from "@/_private/debugLog";
import { DrawShape } from "../../types";

const setShapeEvents = (shape: DrawShape, onChange: VoidFunction) => {
    if (shape instanceof google.maps.Circle) {
        const l0 = google.maps.event.addListener(shape, "dragend", onChange);
        const l1 = google.maps.event.addListener(
            shape,
            "radius_changed",
            onChange
        );

        return [l0, l1];
    } else if (shape instanceof google.maps.Rectangle) {
        const l0 = google.maps.event.addListener(
            shape,
            "bounds_changed",
            onChange
        );

        return [l0];
    } else if (shape instanceof google.maps.Polygon) {
        const vertices = shape.getPath();

        const l0 = vertices.addListener("set_at", onChange);
        const l1 = vertices.addListener("insert_at", onChange);

        return [l0, l1];
    } else {
        debugLog("Unknown shape type.");
        return [];
    }
};

export default setShapeEvents;
