import { TPoint, TShape } from "@/types/shape";
import { DEFAULT_ZOOM, MAX_ZOOM_LEVEL, MIN_ZOOM_LEVEL } from "./constant";

const getZoomFromNGon = (shape: TShape) => {
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

export default getZoomFromNGon;
