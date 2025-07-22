import { DrawShape } from "../../types";
import { TPoint, TShape } from "@/types/shape";
import drawCircle from "./_circle";
import drawRectangle from "./_rectangle";
import drawPolygon from "./_polygon";

// --------------------------------------------------------------------------------

type TShapeType = "Circle" | "Rectangle" | "Polygon";

const isNullPoint = (p: TPoint) => Boolean(p.x) && !Boolean(p.y);

const isNonNullShape = (s: TShape) => {
    if (s.some(isNullPoint)) return false;
    return true;
};

const getShapeType = (s: TShape): TShapeType | null => {
    if (s.length === 2 && s[1].y === null) return "Circle";
    if (s.length === 4 && isNonNullShape(s)) return "Rectangle";
    if (s.length > 4 && isNonNullShape(s)) return "Polygon";
    return null;
};

/**
 * This method is REALLY important! Backend has asked us to treat a 0.0 value as null; This is important for circles where y is null for radius.
 * @param s a shape as received from Backend
 */
const normaliseShape = (s: TShape) => {
    if (s.length === 2 && s[1].y === 0.0)
        return [
            { x: s[0].x, y: s[0].y },
            { x: s[1].x, y: null },
        ];
    else return s;
};

// --------------------------------------------------------------------------------

/**
 * Draws a (visible) shape to a google map & returns the object that was generated
 */
const drawShape = (
    s: TShape,
    map: google.maps.Map,
    changeable: boolean
): DrawShape | null => {
    if (!s || s.length === 0) return null;

    const shape = normaliseShape(s);

    const type = getShapeType(shape);

    if (type === "Circle") {
        // For circles: shape[0] is center point [x, y], shape[1] is [radius, null]
        const centerLat = shape[0].x; // y-coordinate is latitude
        const centerLng = shape[0].y; // x-coordinate is longitude
        const radius = shape[1].x; // radius is x-coordinate of second point

        if (centerLat === null || !centerLng || !radius) return null;

        return drawCircle(centerLat, centerLng, radius, map, changeable);
    }
    // Check if shape is a rectangle (4 points forming a rectangle)
    else if (type === "Rectangle") {
        // Find the northeast and southwest corners
        let minLat = Infinity,
            minLng = Infinity;
        let maxLat = -Infinity,
            maxLng = -Infinity;

        for (const point of shape) {
            const lat = point.x;
            const lng = point.y;

            if (lng === null) return null; // All points in a rectangle must have valid lat

            minLat = Math.min(minLat, lat);
            minLng = Math.min(minLng, lng);
            maxLat = Math.max(maxLat, lat);
            maxLng = Math.max(maxLng, lng);
        }

        return drawRectangle(maxLat, maxLng, minLat, minLng, map, changeable);
    }
    // Otherwise, treat as polygon
    else if (type === "Polygon") {
        // Convert TShape to google.maps.LatLngLiteral[][] format
        const points: google.maps.LatLngLiteral[] = [];

        for (const point of shape) {
            const lat = point.x;
            const lng = point.y;

            // All points in a polygon must have valid lat
            if (lng === null) return null;

            points.push({ lat, lng });
        }

        if (points.length === 0) return null;

        // Wrap points in an array to match google.maps.LatLngLiteral[][]
        const paths: google.maps.LatLngLiteral[][] = [points];

        return drawPolygon(paths, map, changeable);
    } else {
        return null;
    }
};

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

/**
 * Checks if two shapes are equal
 * @param s0 First shape
 * @param s1 Second shape
 * @returns Boolean indicating whether the shapes are equal
 */
const areShapesEqual = (s0: TShape, s1: TShape): boolean => {
    // Different lengths means different shapes
    if (s0.length !== s1.length) {
        return false;
    }

    // Empty shapes are considered equal
    if (s0.length === 0) {
        return true;
    }

    // For circles (points with null y-coordinate), we only compare x coordinates
    // which represent radius
    const isCircle =
        s0.some((point) => point.y === null) ||
        s1.some((point) => point.y === null);

    if (isCircle) {
        // For circles, make sure both shapes have null y values
        const s0HasNullY = s0.some((point) => point.y === null);
        const s1HasNullY = s1.some((point) => point.y === null);

        if (s0HasNullY !== s1HasNullY) {
            return false;
        }

        // For circles, we only need to compare the x values (radius)
        const s0Radii = s0.map((point) => point.x);
        const s1Radii = s1.map((point) => point.x);

        // Check if the arrays contain the same values
        return (
            s0Radii.length === s1Radii.length &&
            s0Radii.every((radius) => s1Radii.includes(radius))
        );
    }

    // For non-circle shapes, compare all points
    // We'll check if each point in s0 exists in s1
    return (
        s0.every((point0) => {
            return s1.some(
                (point1) => point0.x === point1.x && point0.y === point1.y
            );
        }) &&
        // And also check if each point in s1 exists in s0 (to ensure both directions)
        s1.every((point1) => {
            return s0.some(
                (point0) => point1.x === point0.x && point1.y === point0.y
            );
        })
    );
};

export {
    normaliseShape,
    // ...
    drawShape,
    getShapeType,
    // ...
    drawingToPoints,
    // ...
    areShapesEqual,
};
