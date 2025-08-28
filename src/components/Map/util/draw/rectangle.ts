import { TShape } from "@/types/shape";

const _drawRectangle = (
    nelat: number,
    nelng: number,
    swlat: number,
    swlng: number,
    map: google.maps.Map,
    changeable: boolean
) => {
    const rectangleBounds = {
        north: nelat,
        south: swlat,
        east: nelng,
        west: swlng,
    };

    const rectangleConfig = {
        map,
        clickable: true,
        editable: changeable,
        draggable: changeable,
        bounds: rectangleBounds,
        fillColor: "cyan",
        fillOpacity: 0.15,
        strokeWeight: 1,
        zIndex: 1,
    };

    return new google.maps.Rectangle({ ...rectangleConfig, map });
};

const drawRectangle = (
    shape: TShape,
    map: google.maps.Map,
    changeable: boolean
) => {
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

    return _drawRectangle(maxLat, maxLng, minLat, minLng, map, changeable);
};

export default drawRectangle;
