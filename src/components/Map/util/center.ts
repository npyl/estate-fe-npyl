import { TShape } from "@/types/shape";
import { getShapeType, normaliseShape } from "./draw";
import { patrasLatLng } from "../constants";

function getPolygonCentroid(shape: TShape): google.maps.LatLngLiteral {
    let area = 0;
    let sumLat = 0;
    let sumLng = 0;

    // For each pair of adjacent vertices
    for (let i = 0; i < shape.length; i++) {
        const current = shape[i];
        const next = shape[(i + 1) % shape.length]; // Wrap to first point if on last point

        // Skip any points with null coordinates (shouldn't happen for polygons, but just in case)
        if (current.y === null || next.y === null) {
            continue;
        }

        // Calculate the "shoelace" formula components
        // Note: For geographic coordinates in the shoelace formula,
        // we use lng (y) for x-coordinates and lat (x) for y-coordinates in the formula
        const factor = current.y! * next.x - next.y! * current.x;
        area += factor;

        // Weighted sums for centroid calculation
        sumLat += (current.x + next.x) * factor;
        sumLng += (current.y! + next.y!) * factor;
    }

    // Finalize area calculation (taking absolute value as area may be negative depending on vertex order)
    area = Math.abs(area / 2);

    // Calculate centroid coordinates
    // If area is essentially zero, calculate average of all points instead
    if (Math.abs(area) < 1e-10) {
        let validPointCount = 0;
        let totalLat = 0;
        let totalLng = 0;

        for (const point of shape) {
            if (point.y !== null) {
                totalLat += point.x;
                totalLng += point.y;
                validPointCount++;
            }
        }

        return {
            lat: totalLat / validPointCount,
            lng: totalLng / validPointCount,
        };
    }

    // Compute the centroid coordinates using the standard formula
    return {
        lat: sumLat / (6 * area),
        lng: sumLng / (6 * area),
    };
}

function getRectangleCenter(shape: TShape): google.maps.LatLngLiteral {
    // Find the bounding box of all points
    let minLat = Infinity,
        minLng = Infinity;
    let maxLat = -Infinity,
        maxLng = -Infinity;

    for (const point of shape) {
        const lat = point.x;
        const lng = point.y;

        if (lng === null) continue; // Skip invalid points

        minLat = Math.min(minLat, lat);
        minLng = Math.min(minLng, lng);
        maxLat = Math.max(maxLat, lat);
        maxLng = Math.max(maxLng, lng);
    }

    return {
        lat: (maxLat + minLat) / 2,
        lng: (maxLng + minLng) / 2,
    };
}

const getShapeCenter = (shape: TShape): google.maps.LatLngLiteral => {
    if (!shape || shape.length === 0) return patrasLatLng;

    const s = normaliseShape(shape);
    const type = getShapeType(s);

    if (type === "Circle") {
        // For circles: s[0] is center point [lat, lng], s[1] is [radius, null]
        const centerLat = s[0].x;
        const centerLng = s[0].y;

        if (centerLat === null || centerLng === null) return patrasLatLng;

        return { lat: centerLat, lng: centerLng };
    }

    if (type === "Rectangle") {
        return getRectangleCenter(s);
    }

    if (type === "Polygon") {
        return getPolygonCentroid(s);
    }

    return patrasLatLng;
};

export { getShapeCenter };
