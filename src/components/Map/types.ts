import { TShape } from "@/types/shape";
import { ReactNode } from "react";

export interface IMapCoordinates {
    lat: number;
    lng: number;
}

export type IMapMarker = IMapCoordinates & { propertyId?: number };

export interface IMapAddress {
    street: string;
    number: string;
    zipCode: string;
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

    onMainMarkerDrag?: (
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
    onSearchSelect?: (lat: number, lng: number, selected: IMapAddress) => void;

    zoom?: number;
    shapes?: TShape[];
    center?: IMapCoordinates;
    mainMarker?: boolean;

    drawing?: boolean;
    search?: boolean;

    // INFO: Only for e.g. custom markers. For controls use topLeft, centerLeft etc.
    children?: ReactNode;
}

export type { IMapControls, IMapProps };
