import { TShape } from "@/types/shape";

const _drawPolygon = (
    paths: google.maps.LatLngLiteral[][],
    map: google.maps.Map,
    changeable: boolean
) => {
    const polygonConfig = {
        clickable: true,
        editable: changeable,
        draggable: changeable,
        paths: paths,
        map: map,
        fillColor: "cyan",
        fillOpacity: 0.15,
        strokeWeight: 1,
        zIndex: 1,
    };

    return new google.maps.Polygon({ ...polygonConfig, map });
};

const drawPolygon = (
    shape: TShape,
    map: google.maps.Map,
    changeable: boolean
) => {
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

    return _drawPolygon(paths, map, changeable);
};

export default drawPolygon;
