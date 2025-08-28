import { TShape } from "@/types/shape";
import { MAX_ZOOM_LEVEL, MIN_ZOOM_LEVEL } from "./constant";

const getZoomFromCircle = (shape: TShape) => {
    // For circles, calculate zoom based on radius
    // shape[0] is center point, shape[1] has radius in x property (in meters)
    const radiusInMeters = shape[1].x; // radius in meters

    // Calculate diameter in meters
    const diameterInMeters = radiusInMeters * 2;

    let calculatedZoom: number;

    // Zoom levels based on diameter in meters
    // Adjusted for typical diameters > 10km
    if (diameterInMeters > 500000) {
        // > 500km diameter
        calculatedZoom = 6;
    } else if (diameterInMeters > 200000) {
        // > 200km diameter
        calculatedZoom = 7;
    } else if (diameterInMeters > 100000) {
        // > 100km diameter
        calculatedZoom = 8;
    } else if (diameterInMeters > 50000) {
        // > 50km diameter
        calculatedZoom = 10;
    } else if (diameterInMeters > 10000) {
        // > 10km diameter
        calculatedZoom = 11;
    } else if (diameterInMeters > 5000) {
        // <= 10km diameter
        calculatedZoom = 12;
    } else {
        // <= 10km diameter
        calculatedZoom = 16;
    }

    return Math.max(MIN_ZOOM_LEVEL, Math.min(MAX_ZOOM_LEVEL, calculatedZoom));
};

export default getZoomFromCircle;
