import { TShape } from "@/types/shape";
import { DrawShape } from "../../types";

/**
 * Converts a google.maps.{Shape} to TShape
 * (x -> lat, y -> lng)
 */
function drawingToPoints(draw: DrawShape): TShape {
    const pointsArray: TShape = [];
    if (draw instanceof google.maps.Rectangle) {
        // For a Rectangle, we need the bounds (northeast and southwest corners)
        const bounds = draw.getBounds();
        if (bounds) {
            const ne = bounds.getNorthEast();
            const sw = bounds.getSouthWest();

            // Add the four corners of the rectangle with inverted coordinates
            pointsArray.push({ x: sw.lat(), y: sw.lng() }); // southwest
            pointsArray.push({ x: sw.lat(), y: ne.lng() }); // southeast
            pointsArray.push({ x: ne.lat(), y: ne.lng() }); // northeast
            pointsArray.push({ x: ne.lat(), y: sw.lng() }); // northwest
        }
    } else if (draw instanceof google.maps.Circle) {
        // For a Circle, we need the center and radius
        const center = draw.getCenter();
        const radius = draw.getRadius();
        if (center) {
            // IMPORTANT: Backend requires null for y on a circle
            // Note: For circle, y becomes x and x becomes null since we're inverting
            pointsArray.push({ x: center.lat(), y: center.lng() }); // center
            pointsArray.push({ x: radius, y: null }); // radius with null x as required
        }
    } else if (draw instanceof google.maps.Polygon) {
        // For a Polygon, we need all path points
        const path = draw.getPath();
        for (let i = 0; i < path.getLength(); i++) {
            const point = path.getAt(i);
            pointsArray.push({ x: point.lat(), y: point.lng() });
        }
    }
    return pointsArray;
}

export default drawingToPoints;
