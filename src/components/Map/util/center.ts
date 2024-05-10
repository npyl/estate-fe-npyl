import { ShapeData } from "../types";

function getPolygonCentroid(
    paths: google.maps.LatLngLiteral[][]
): google.maps.LatLngLiteral {
    let lat = 0,
        lng = 0,
        totalPoints = 0;
    for (const path of paths) {
        for (const point of path) {
            lat += point.lat;
            lng += point.lng;
            totalPoints++;
        }
    }
    return { lat: lat / totalPoints, lng: lng / totalPoints };
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

export const getShapeCenter = (s: ShapeData) => {
    if (s.type === "Polygon") return getPolygonCentroid(s.paths);
    if (s.type === "Circle") return { lat: s.lat, lng: s.lng };
    if (s.type === "Rectangle")
        return getRectangleCenter(s.nelat, s.nelng, s.swlat, s.swlng);
};
