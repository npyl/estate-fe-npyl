import { TShape } from "@/types/shape";
import { MutableRefObject, ReactNode } from "react";

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
    rightTop?: ReactNode;
    centerTop?: ReactNode;

    leftCenter?: ReactNode;
}

interface ContentProps extends IMapControls {
    geocoderRef: MutableRefObject<google.maps.Geocoder | undefined>;

    mainMarker?: boolean;
    onMainMarkerDrag?: (
        newLat: number,
        newLng: number,
        address: IMapAddress
    ) => void;

    center: IMapCoordinates;

    // INFO: Only for e.g. custom markers. For controls use topLeft, centerLeft etc.
    children?: ReactNode;
}

interface MapContainerProps
    extends Omit<ContentProps, "center" | "geocoderRef"> {
    onReady?: (m: google.maps.Map) => void;
    onClick?: (lat: number, lng: number, address: IMapAddress) => void;

    zoom?: number;
    center?: IMapCoordinates;
    shapes?: TShape[];
}

interface IMapProps extends MapContainerProps {
    drawing?: boolean;
    search?: boolean;

    //
    // Shape
    //
    onDraw?: (shape: DrawShape | StopDraw) => void;
    onShapeChange?: (oldShape: TShape, newShape: TShape) => void;

    //
    // Search
    //
    onSearchSelect?: (lat: number, lng: number, selected: IMapAddress) => void;
}

export type { ContentProps, MapContainerProps, IMapControls, IMapProps };
