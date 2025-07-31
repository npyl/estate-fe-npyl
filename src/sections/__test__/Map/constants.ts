import { TMarker } from "./type";

const MARKERS: TMarker[] = [
    {
        propertyId: 323,
        lat: 38.2679,
        lng: 21.7412,
    },
    {
        propertyId: 2408,
        lat: 38.2577036,
        lng: 21.7429353,
    },
    {
        propertyId: 3244,
        lat: 38.26432547603325,
        lng: 21.748536811051878,
    },
    {
        propertyId: 3692,
        lat: 38.25737296212507,
        lng: 21.743098597692967,
    },
];

const MAP_ID = "map-testid";

// INFO: zoom into lowest level so that we can click a street and help geolocation recognize it
const ZOOM = 16;
const CLICK_RES_ID = "click-res-testid";

const SHAPE_RES_ID = "shape-res-testid";

export { MARKERS, MAP_ID, ZOOM, CLICK_RES_ID, SHAPE_RES_ID };
