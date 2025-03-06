import { TShape } from "@/types/shape";
import { getShapeType } from "./draw";

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
        const factor = current.x * next.y - next.x * current.y;
        area += factor;

        // Weighted sums for centroid calculation
        sumLat += (current.x + next.x) * factor;
        sumLng += (current.y + next.y) * factor;
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

function getRectangleCenter(
    nelat: number,
    nelng: number,
    swlat: number,
    swlng: number
): google.maps.LatLngLiteral {
    return {
        lat: (nelat + swlat) / 2,
        lng: (nelng + swlng) / 2,
    };
}

const getShapeCenter = (s: TShape) => {
    const type = getShapeType(s);

    if (type === "Circle") return { lat: s[0].x, lng: s[0].y! };
    if (type === "Rectangle")
        return getRectangleCenter(s[0].x, s[0].y!, s[1].x, s[1].y!);
    if (type === "Polygon") return getPolygonCentroid(s);
};

export { getShapeCenter };
