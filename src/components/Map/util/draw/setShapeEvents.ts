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
        const l2 = google.maps.event.addListener(
            shape,
            "center_changed",
            onChange
        );

        return [l0, l1, l2];
    }

    if (shape instanceof google.maps.Rectangle) {
        const l0 = google.maps.event.addListener(
            shape,
            "bounds_changed",
            onChange
        );
        const l1 = google.maps.event.addListener(shape, "dragend", onChange);

        return [l0, l1];
    }

    if (shape instanceof google.maps.Polygon) {
        const vertices = shape.getPath();

        // Listen to path modifications
        const l0 = vertices.addListener("set_at", onChange);
        const l1 = vertices.addListener("insert_at", onChange);
        const l2 = vertices.addListener("remove_at", onChange);

        // Listen to polygon drag events
        const l3 = google.maps.event.addListener(shape, "dragend", onChange);
        const l4 = google.maps.event.addListener(shape, "dragstart", onChange);

        const l5 = google.maps.event.addListener(
            shape,
            "paths_changed",
            onChange
        );

        return [l0, l1, l2, l3, l4, l5];
    }

    debugLog("Unknown shape type.");
    return [];
};

export default setShapeEvents;
