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

export type ShapeData =
    | {
          type: "Polygon";
          paths: google.maps.LatLngLiteral[][];
      }
    | { type: "Circle"; lat: number; lng: number; radius: number }
    | {
          type: "Rectangle";
          nelat: number;
          nelng: number;
          swlat: number;
          swlng: number;
      };
