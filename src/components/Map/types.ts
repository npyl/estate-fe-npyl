import { TShape } from "@/types/shape";
import { PropsWithChildren } from "react";

export type IMapMarker = IMapCoordinates;

export interface IMapAddress {
    street: string;
    number: string;
    zipCode: string;
}

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

interface IMapProps extends PropsWithChildren {
    onReady?: (m: google.maps.Map) => void;
    onClick?: (lat: number, lng: number, address: IMapAddress) => void;
    //
    // Marker
    //
    onMarkerClick?: (marker: IMapMarker) => void;
    onDragEnd?: (
        marker: IMapMarker,
        newLat: number,
        newLng: number,
        address: IMapAddress
    ) => void;
    //
    // Shape
    //
    onDraw?: (shape: DrawShape | StopDraw) => void;
    onShapeChange?: (oldShape: TShape, newShape: TShape) => void;
    //
    // Search
    //
    onSearchSelect?: (selected: IMapAddress, lat: number, lng: number) => void;

    markers?: IMapMarker[];
    zoom?: number;
    shape?: TShape;
    shapes?: TShape[];
    mainMarker?: IMapMarker;
    activeMarker?: number;
    setActiveMarker?: any;

    drawing?: boolean;
    multipleShapes?: boolean;
    search?: boolean;
}

export type { IMapProps };
