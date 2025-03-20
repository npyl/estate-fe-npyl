declare type Libraries = (
    | "drawing"
    | "geometry"
    | "localContext"
    | "places"
    | "visualization"
)[];

const apiKey = "AIzaSyDKNARWExRGZXIsA3oKhRW0aZQmtXGuVbk";
const libraries = ["drawing", "places", "geometry"] as Libraries;

const athensLatLng = { lat: 37.98381, lng: 23.727539 };

enum ZOOM_LEVELS {
    DEFAULT = 8,
    REGION = 10,
    MUNICIP = 13,
    NEIGHB = 16,
}

export { apiKey, libraries, athensLatLng, ZOOM_LEVELS };
