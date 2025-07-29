import { TShape, TPoint } from "@/types/shape";

const MIN_ZOOM_LEVEL = 6; // Minimum zoom level
const MAX_ZOOM_LEVEL = 12; // Maximum zoom level
const DEFAULT_ZOOM = 10;

/**
 * Calculates appropriate zoom level based on the shape's geographical extent
 * Ensures zoom level is not too small to maintain good visibility
 */
const getZoomFromShape = (shape: TShape | null): number => {
    if (!shape || shape.length === 0) {
        return DEFAULT_ZOOM;
    }

    // Handle circle case (y is null for circles in backend)
    if (shape.length === 2 && shape[1].y === null) {
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

        return Math.max(
            MIN_ZOOM_LEVEL,
            Math.min(MAX_ZOOM_LEVEL, calculatedZoom)
        );
    }

    // Handle polygon/rectangle cases
    const validPoints = shape.filter(
        (point): point is TPoint & { y: number } =>
            point.y !== null &&
            typeof point.x === "number" &&
            typeof point.y === "number"
    );

    if (validPoints.length < 2) {
        return DEFAULT_ZOOM;
    }

    // Calculate bounding box
    const lats = validPoints.map((point) => point.y);
    const lngs = validPoints.map((point) => point.x);

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    // Calculate the span of the shape in degrees
    const latSpan = Math.abs(maxLat - minLat);
    const lngSpan = Math.abs(maxLng - minLng);

    // Use the larger span to determine zoom
    const maxSpan = Math.max(latSpan, lngSpan);

    // Calculate zoom based on span in degrees (empirical values for good visibility)
    let calculatedZoom: number;

    if (maxSpan > 10) {
        calculatedZoom = 6;
    } else if (maxSpan > 5) {
        calculatedZoom = 7;
    } else if (maxSpan > 2) {
        calculatedZoom = 8;
    } else if (maxSpan > 1) {
        calculatedZoom = 9;
    } else if (maxSpan > 0.5) {
        calculatedZoom = 10;
    } else if (maxSpan > 0.1) {
        calculatedZoom = 11;
    } else {
        calculatedZoom = 12;
    }

    // Ensure zoom is within acceptable bounds (6-12)
    return Math.max(MIN_ZOOM_LEVEL, Math.min(MAX_ZOOM_LEVEL, calculatedZoom));
};

export default getZoomFromShape;
