import { TShape } from "@/types/shape";
import { DrawShape } from "@/components/Map/types";
import debugLog from "@/_private/debugLog";

function _drawingToPoints(draw: DrawShape): TShape {
    const pointsArray: TShape = [];

    if (draw instanceof google.maps.Rectangle) {
        // For a Rectangle, we need the bounds (northeast and southwest corners)
        const bounds = draw.getBounds();
        if (!bounds) throw new Error("Invalid bounds");

        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();

        // Add the four corners of the rectangle with inverted coordinates
        pointsArray.push({ x: sw.lat(), y: sw.lng() }); // southwest
        pointsArray.push({ x: sw.lat(), y: ne.lng() }); // southeast
        pointsArray.push({ x: ne.lat(), y: ne.lng() }); // northeast
        pointsArray.push({ x: ne.lat(), y: sw.lng() }); // northwest
    } else if (draw instanceof google.maps.Circle) {
        // For a Circle, we need the center and radius
        const center = draw.getCenter();
        if (!center) throw new Error("Invalid center");

        const radius = draw.getRadius();

        // IMPORTANT: Backend requires null for y on a circle
        // Note: For circle, y becomes x and x becomes null since we're inverting
        pointsArray.push({ x: center.lat(), y: center.lng() }); // center
        pointsArray.push({ x: radius, y: null }); // radius with null x as required
    } else if (draw instanceof google.maps.Polygon) {
        // For a Polygon, we need all path points
        const path = draw.getPath();
        for (let i = 0; i < path.getLength(); i++) {
            const point = path.getAt(i);
            pointsArray.push({ x: point.lat(), y: point.lng() });
        }
    } else {
        throw new Error("Invalid draw type [1]");
    }

    return pointsArray;
}

/**
 * Converts a google.maps.{Shape} to TShape
 * (x -> lat, y -> lng)
 */
function drawingToPoints(draw: DrawShape): TShape | null {
    try {
        if (!draw) throw new Error("Invalid draw object");
        if (typeof draw !== "object") throw new Error("Invalid draw type [0]");
        return _drawingToPoints(draw);
    } catch (ex) {
        debugLog(ex);
        return null;
    }
}

export default drawingToPoints;
