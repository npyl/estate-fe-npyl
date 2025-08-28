import { TShape } from "@/types/shape";

const _drawCircle = (
    lat: number,
    lng: number,
    radius: number,
    map: google.maps.Map,
    changeable: boolean
) => {
    const circleConfig: google.maps.CircleOptions = {
        map,
        clickable: true,
        editable: changeable,
        draggable: changeable,
        center: { lat, lng }, // Center of the circle
        radius: radius, // Radius (in meters)
        fillColor: "cyan",
        fillOpacity: 0.15,
        strokeWeight: 1,
        zIndex: 1,
    };

    return new google.maps.Circle(circleConfig);
};

const drawCircle = (
    shape: TShape,
    map: google.maps.Map,
    changeable: boolean
) => {
    // For circles: shape[0] is center point [x, y], shape[1] is [radius, null]
    const centerLat = shape[0].x; // y-coordinate is latitude
    const centerLng = shape[0].y; // x-coordinate is longitude
    const radius = shape[1].x; // radius is x-coordinate of second point

    if (centerLat === null || !centerLng || !radius) return null;

    return _drawCircle(centerLat, centerLng, radius, map, changeable);
};

export default drawCircle;
