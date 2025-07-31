declare type Libraries = (
    | "drawing"
    | "geometry"
    | "localContext"
    | "places"
    | "visualization"
)[];

const apiKey = "AIzaSyDKNARWExRGZXIsA3oKhRW0aZQmtXGuVbk";
const libraries = ["drawing", "places", "geometry"] as Libraries;

const patrasLatLng = { lat: 38.2466, lng: 21.7346 };

enum ZOOM_LEVELS {
    DEFAULT = 8,
    REGION = 10,
    MUNICIP = 13,
    NEIGHB = 16,
}

const MAP_ID = "map-testid";

export { apiKey, libraries, patrasLatLng, ZOOM_LEVELS, MAP_ID };
