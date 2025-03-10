import { TShape } from "@/types/shape";
import { ReactNode } from "react";

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

interface IMapControls {
    leftTop?: ReactNode;
    leftCenter?: ReactNode;

    rightTop?: ReactNode;

    centerTop?: ReactNode;
}

interface IMapProps extends IMapControls {
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
    onDraw?: (shape: DrawShape) => void;
    onShapesClear?: VoidFunction;
    onShapeChange?: (oldShape: TShape, newShape: TShape) => void;
    //
    // Search
    //
    onSearchSelect?: (selected: IMapAddress, lat: number, lng: number) => void;

    zoom?: number;
    shapes?: TShape[];
    mainMarker?: IMapMarker;

    drawing?: boolean;
    search?: boolean;

    // INFO: Only for e.g. custom markers. For controls use topLeft, centerLeft etc.
    children?: ReactNode;
}

export type { IMapControls, IMapProps };
