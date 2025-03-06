export interface IMapCoordinates {
    lat: number;
    lng: number;
    propertyId?: number;
}

export type DrawShape =
    | google.maps.Rectangle
    | google.maps.Circle
    | google.maps.Polygon;

export type StopDraw = null;
