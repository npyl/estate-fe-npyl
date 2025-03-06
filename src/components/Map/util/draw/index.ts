import { DrawShape } from "../../types";
import { TShape } from "@/types/shape";
import drawCircle from "./_circle";
import drawRectangle from "./_rectangle";
import drawPolygon from "./_polygon";

// --------------------------------------------------------------------------------

type TShapeType = "Circle" | "Rectangle" | "Polygon";

const isNullPoint = (p: [number | null, number | null]) => !p[0] || !p[1];

const isNonNullShape = (s: TShape) => {
    if (s.some(isNullPoint)) return false;
    return true;
};

const getShapeType = (s: TShape): TShapeType | null => {
    if (s.length === 2 && s[1][1] === null) return "Circle";
    if (s.length === 2 && isNonNullShape(s)) return "Rectangle";
    if (s.length > 2 && isNonNullShape(s)) return "Polygon";
    return null;
};

// --------------------------------------------------------------------------------

/**
 * Draws a (visible) shape to a google map & returns the object that was generated
 */
const drawShape = (
    shape: TShape,
    map: google.maps.Map,
    onChange: ((oldShape: TShape, newShape: TShape) => void) | null
): DrawShape | null => {
    if (!shape || shape.length === 0) return null;

    const type = getShapeType(shape);

    if (type === "Circle") {
        // For circles: shape[0] is center point [x, y], shape[1] is [radius, null]
        const centerLat = shape[0][1]; // y-coordinate is latitude
        const centerLng = shape[0][0]; // x-coordinate is longitude
        const radius = shape[1][0]; // radius is x-coordinate of second point

        if (centerLat === null || !centerLng || !radius) return null;

        return drawCircle(centerLat, centerLng, radius, map, onChange);
    }
    // Check if shape is a rectangle (4 points forming a rectangle)
    else if (type === "Rectangle") {
        // Find the northeast and southwest corners
        let minLat = Infinity,
            minLng = Infinity;
        let maxLat = -Infinity,
            maxLng = -Infinity;

        for (const point of shape) {
            const lat = point[1];
            const lng = point[0];

            if (lat === null) return null; // All points in a rectangle must have valid lat

            minLat = Math.min(minLat, lat);
            minLng = Math.min(minLng, lng);
            maxLat = Math.max(maxLat, lat);
            maxLng = Math.max(maxLng, lng);
        }

        return drawRectangle(maxLat, maxLng, minLat, minLng, map, onChange);
    }
    // Otherwise, treat as polygon
    else if (type === "Polygon") {
        // Convert TShape to google.maps.LatLngLiteral[][] format
        const points: google.maps.LatLngLiteral[] = [];

        for (const point of shape) {
            const lng = point[0];
            const lat = point[1];

            // All points in a polygon must have valid lat
            if (lat === null) return null;

            points.push({ lat, lng });
        }

        if (points.length === 0) return null;

        // Wrap points in an array to match google.maps.LatLngLiteral[][]
        const paths: google.maps.LatLngLiteral[][] = [points];

        return drawPolygon(paths, map, onChange);
    } else {
        return null;
    }
};

/**
 * Converts a google.maps.{Shape} to TShape
 */
function drawingToPoints(draw: DrawShape): TShape {
    const pointsArray: any = [];
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
        s0.some((point) => point[1] === null) ||
        s1.some((point) => point[1] === null);

    if (isCircle) {
        // For circles, make sure both shapes have null y values
        const s0HasNullY = s0.some((point) => point[1] === null);
        const s1HasNullY = s1.some((point) => point[1] === null);

        if (s0HasNullY !== s1HasNullY) {
            return false;
        }

        // For circles, we only need to compare the x values (radius)
        const s0Radii = s0.map((point) => point[0]);
        const s1Radii = s1.map((point) => point[0]);

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
                (point1) => point0[0] === point1[0] && point0[1] === point1[1]
            );
        }) &&
        // And also check if each point in s1 exists in s0 (to ensure both directions)
        s1.every((point1) => {
            return s0.some(
                (point0) => point1[0] === point0[0] && point1[1] === point0[1]
            );
        })
    );
};

export {
    drawShape,
    getShapeType,
    // ...
    drawingToPoints,
    // ...
    areShapesEqual,
};
