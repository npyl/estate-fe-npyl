import { DrawShape, ShapeData } from "../types";

export const setShapeEvents = (shape: DrawShape, callback: () => void) => {
    if (shape instanceof google.maps.Circle) {
        console.log("The shape is a Circle.");

        google.maps.event.addListener(shape, "dragend", callback);
        google.maps.event.addListener(shape, "radius_changed", callback);
    } else if (shape instanceof google.maps.Rectangle) {
        console.log("The shape is a Rectangle.");

        google.maps.event.addListener(shape, "bounds_changed", callback);
    } else if (shape instanceof google.maps.Polygon) {
        console.log("The shape is a Polygon.");

        const vertices = shape.getPath();

        vertices.addListener("set_at", callback);
        vertices.addListener("insert_at", callback);
    } else {
        console.log("Unknown shape type.");
    }
};

const drawCircle = (
    lat: number,
    lng: number,
    radius: number,
    map: google.maps.Map,
    onChange: ((oldShape: string, newShape: string) => void) | null
) => {
    const circleConfig = {
        clickable: true,
        editable: !!onChange,
        draggable: !!onChange,
        center: { lat, lng }, // Center of the circle
        radius: radius, // Radius (in meters)
        fillColor: "cyan",
        fillOpacity: 0.15,
        strokeWeight: 1,
        zIndex: 1,
    };

    const circle = new google.maps.Circle({ ...circleConfig, map });
    const encodedOldShape = encodeShape(circle);

    // Support shape drag/change
    onChange &&
        setShapeEvents(circle, () =>
            onChange(encodedOldShape, encodeShape(circle))
        );

    return circle;
};
const drawRectangle = (
    nelat: number,
    nelng: number,
    swlat: number,
    swlng: number,
    map: google.maps.Map,
    onChange: ((oldShape: string, newShape: string) => void) | null
) => {
    const rectangleBounds = {
        north: nelat,
        south: swlat,
        east: nelng,
        west: swlng,
    };

    const rectangleConfig = {
        clickable: true,
        editable: !!onChange,
        draggable: !!onChange,
        bounds: rectangleBounds,
        map: map,
        fillColor: "cyan",
        fillOpacity: 0.15,
        strokeWeight: 1,
        zIndex: 1,
    };

    const rectangle = new google.maps.Rectangle({ ...rectangleConfig, map });
    const encodedOldShape = encodeShape(rectangle);

    // Support shape drag/change
    onChange &&
        setShapeEvents(rectangle, () =>
            onChange(encodedOldShape, encodeShape(rectangle))
        );

    return rectangle;
};
const drawPolygon = (
    paths: google.maps.LatLngLiteral[][],
    map: google.maps.Map,
    onChange: ((oldShape: string, newShape: string) => void) | null
) => {
    const polygonConfig = {
        clickable: true,
        editable: !!onChange,
        draggable: !!onChange,
        paths: paths,
        map: map,
        fillColor: "cyan",
        fillOpacity: 0.15,
        strokeWeight: 1,
        zIndex: 1,
    };

    const polygon = new google.maps.Polygon({ ...polygonConfig, map });
    const encodedOldShape = encodeShape(polygon);

    // Support shape drag/change
    onChange &&
        setShapeEvents(polygon, () =>
            onChange(encodedOldShape, encodeShape(polygon))
        );

    return polygon;
};

export const drawShape = (
    shapeData: ShapeData,
    map: google.maps.Map,
    onChange: ((oldShape: string, newShape: string) => void) | null
): DrawShape | null => {
    switch (shapeData.type) {
        case "Circle":
            const { lat, lng, radius } = shapeData;
            if (!lat || !lng || !radius) return null;
            return drawCircle(lat, lng, radius, map, onChange);

        case "Rectangle":
            const { nelat, nelng, swlat, swlng } = shapeData;
            if (!nelat || !nelng || !swlat || !swlng) return null;
            return drawRectangle(nelat, nelng, swlat, swlng, map, onChange);

        case "Polygon":
            if (!shapeData.paths || shapeData.paths.length === 0) return null;
            return drawPolygon(shapeData.paths, map, onChange);

        default:
            // Technically unreachable with the given types, but good for robustness
            return null;
    }
};

export const isPointInsideShape = (
    lat: number,
    lng: number,
    shape: DrawShape
): boolean => {
    const point = new google.maps.LatLng(lat, lng);

    if (shape instanceof google.maps.Polygon) {
        return google.maps.geometry.poly.containsLocation(point, shape);
    }

    if (shape instanceof google.maps.Circle) {
        const center = shape.getCenter();
        if (center) {
            const distance =
                google.maps.geometry.spherical.computeDistanceBetween(
                    center,
                    point
                );
            return distance <= shape.getRadius();
        }
    }

    if (shape instanceof google.maps.Rectangle) {
        return shape.getBounds()!.contains(point);
    }

    return false;
};

export const isPointInsideShapeData = (
    lat: number,
    lng: number,
    shapeData: ShapeData
): boolean => {
    const point = new google.maps.LatLng(lat, lng);

    switch (shapeData.type) {
        case "Polygon":
            const polygon = new google.maps.Polygon({
                paths: shapeData.paths,
            });
            return google.maps.geometry.poly.containsLocation(point, polygon);
        case "Circle":
            const center = new google.maps.LatLng(shapeData.lat, shapeData.lng);
            const distance =
                google.maps.geometry.spherical.computeDistanceBetween(
                    center,
                    point
                );
            return distance <= shapeData.radius;
        case "Rectangle":
            const bounds = new google.maps.LatLngBounds(
                new google.maps.LatLng(shapeData.swlat, shapeData.swlng), // Southwest corner
                new google.maps.LatLng(shapeData.nelat, shapeData.nelng) // Northeast corner
            );
            return bounds.contains(point);
        default:
            return false;
    }
};

export const encodeShape = (s: DrawShape) => {
    // encodes in form: {T}{lat}_{lng}_..._{whatever}
    // where T is a character out of P, R, C that signifies the type
    // and whatever can be non-latLng data such as radius

    // 0 decimal places: 111 km (or 69 miles) - country or large region level
    // 1 decimal place: 11.1 km - city or town level
    // 2 decimal places: 1.11 km - village or town level
    // 3 decimal places: 111 m - neighborhood level

    const cutDigits = (n: number) => parseFloat(n.toFixed(4));

    if (s instanceof google.maps.Polygon) {
        let str = "P";
        s.getPaths().forEach((path) => {
            path.forEach(
                (latLng) =>
                    (str = `${str}${cutDigits(latLng.lat())}_${cutDigits(
                        latLng.lng()
                    )}_`)
            );
        });
        // remove trailing '_'
        str = str.substring(0, str.length - 2);
        return str;
    } else if (s instanceof google.maps.Circle) {
        const lat = cutDigits(s.getCenter()?.lat() || -1);
        const lng = cutDigits(s.getCenter()?.lng() || -1);
        const radius = cutDigits(s.getRadius());
        return `C${lat}_${lng}_${radius}`;
    } else if (s instanceof google.maps.Rectangle) {
        const nelat = cutDigits(s.getBounds()?.getNorthEast()?.lat() || -1);
        const nelng = cutDigits(s.getBounds()?.getNorthEast()?.lng() || -1);
        const swlat = cutDigits(s.getBounds()?.getSouthWest()?.lat() || -1);
        const swlng = cutDigits(s.getBounds()?.getSouthWest()?.lng() || -1);
        return `R${nelat}_${nelng}_${swlat}_${swlng}`;
    } else return "";
};

export const decodeShape = (input: string | null): ShapeData | null => {
    if (!input) return null;

    if (input[0] === "C") {
        const regex = /^C(-?\d+\.\d+)_(-?\d+\.\d+)_(\d+(\.\d+)?)/;
        const match = input.match(regex);

        if (!match) return null;

        const [, lat, lng, radius] = match;

        return { type: "Circle", lat: +lat, lng: +lng, radius: +radius };
    } else if (input[0] === "R") {
        const regex = /^R(-?\d+\.\d+)_(-?\d+\.\d+)_(-?\d+\.\d+)_(-?\d+\.\d+)/;
        const match = input.match(regex);

        if (!match) return null;

        const [, nelat, nelng, swlat, swlng] = match;

        return {
            type: "Rectangle",
            nelat: +nelat,
            nelng: +nelng,
            swlat: +swlat,
            swlng: +swlng,
        };
    } else if (input[0] === "P") {
        // Remove the starting 'P' and split by '__' to separate different paths.
        const paths = input.substring(1).split("__");

        // Decode each path.
        const decodedPaths: google.maps.LatLngLiteral[][] = paths.map(
            (pathStr) => {
                // Split each path string into lat_lng pairs.
                const latLngPairs = pathStr.split("_");

                const decodedPairs: google.maps.LatLngLiteral[] = [];
                for (let i = 0; i < latLngPairs.length; i += 2) {
                    const lat = parseFloat(latLngPairs[i]);
                    const lng = parseFloat(latLngPairs[i + 1]);
                    decodedPairs.push({ lat, lng });
                }

                return decodedPairs;
            }
        );

        return { type: "Polygon", paths: decodedPaths };
    }

    return null;
};

export function convertShapeToPoints(shapeString: string) {
    const pointsArray = [];
    const coordinates = shapeString.substr(1).split("_"); // Remove the "P" at the beginning

    for (let i = 0; i < coordinates.length; i += 2) {
        const x = parseFloat(coordinates[i]); // Remove the first character
        const y = parseFloat(coordinates[i + 1]);
        pointsArray.push({ x, y });
    }

    return pointsArray;
}
