import { GoogleMap, MarkerF } from "@react-google-maps/api";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { CustomDrawingComponent } from "./Draw";
import { DrawMultiple } from "./DrawMultiple";
import SearchOnMap from "./Search";
import { DrawShape, ShapeData, StopDraw } from "./types";
import uuidv4 from "src/utils/uuidv4";
import useLoadApi from "./hook";

const containerStyle = {
    width: "100%",
    height: "100%",
};

export interface IMapCoordinates {
    lat: number;
    lng: number;
}

export type IMapMarker = IMapCoordinates;

export interface IMapAddress {
    street: string;
    number: string;
    zipCode: string;
}

interface IMapProps {
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
    onShapeChange?: (encodedOldShape: string, encodedNewShape: string) => void;
    //
    // Search
    //
    onSearchSelect?: (selected: IMapAddress, lat: number, lng: number) => void;

    markers?: IMapMarker[];
    zoom?: number;
    shape?: ShapeData;
    shapes?: ShapeData[];
    mainMarker?: IMapMarker;
    activeMarker?: number;
    setActiveMarker?: any;

    drawing?: boolean;
    multipleShapes?: boolean;
    search?: boolean;
}

const athensLatLng = { lat: 37.98381, lng: 23.727539 };

// Helper function to extract the address component value based on the type
const getAddressComponent = (
    addressComponents: google.maps.GeocoderAddressComponent[],
    type: string
) => {
    const component = addressComponents.find((component) =>
        component.types.includes(type)
    );
    return component ? component.long_name : "";
};

//--------------------------------------------------------
//
//  markers: ...
//  activeMarker:
//      The marker clicked; show a bouncing animation
//  mainMarker: ...
//      If set, centering is based on mainMarker
//      NOTE: mainMarker must be contained in markers prop if you wish for it to be visible
//
//--------------------------------------------------------

const Map = ({
    onReady,
    onClick,
    onMarkerClick,
    onDragEnd,
    onDraw,
    onShapeChange,
    onSearchSelect,
    markers,
    zoom,
    shape,
    shapes,
    mainMarker,
    activeMarker,
    setActiveMarker,
    multipleShapes = false,
    drawing = true,
    search = false,
}: IMapProps) => {
    const { isLoaded } = useLoadApi();

    const [map, setMap] = useState<google.maps.Map>();
    const geocoderRef = useRef<google.maps.Geocoder>();

    console.log("RE_RENDER");

    // center is based on mainMarker's latLng
    const center = useMemo(
        () => (mainMarker?.lat && mainMarker?.lng ? mainMarker : athensLatLng),
        [mainMarker?.lat, mainMarker?.lng]
    );

    const onLoad = useCallback((map: google.maps.Map) => {
        // geocoder
        geocoderRef.current = new window.google.maps.Geocoder();

        // map
        setMap(map);

        onReady?.(map);
    }, []);

    const onUnmount = useCallback(() => {
        // mapRef.current = undefined;
    }, []);

    const getAddressFromLatLng = useCallback(
        async (lat: number, lng: number) => {
            if (!geocoderRef.current) {
                console.error("Geocoder is not available!");
                return {};
            }

            const { results } = await geocoderRef.current.geocode({
                location: { lat, lng },
            });

            if (!results || results?.length === 0) {
                console.error("Results are faulty: ", results);
                return {};
            }

            // Access the address components from the first result
            const addressComponents = results[0].address_components;

            console.log("geo: ", results[0]);

            // Extract the desired address details from address components
            const street = getAddressComponent(addressComponents, "route");
            const number = getAddressComponent(
                addressComponents,
                "street_number"
            );
            const zipCode = getAddressComponent(
                addressComponents,
                "postal_code"
            ).replace(/\s/g, ""); // remove spaces

            return { street, number, zipCode };
        },
        []
    );

    //
    //	Map
    //
    const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
        const latLng = event.latLng;
        const lat = latLng?.lat();
        const lng = latLng?.lng();

        if (lat === undefined || lng === undefined) return;

        onClick &&
            getAddressFromLatLng(lat, lng).then((response) =>
                onClick(lat, lng, response as IMapAddress)
            );
    }, []);

    //
    // 	Markers
    //
    const onMarkerDragEnd = useCallback(
        (latLng: any, index: number) => {
            if (!markers) return;
            if (markers?.length < index) return;
            const lat = latLng.lat();
            const lng = latLng.lng();
            // also call parent callback
            onDragEnd &&
                getAddressFromLatLng(lat, lng).then((response) =>
                    onDragEnd(markers[index], lat, lng, response as IMapAddress)
                );
        },
        [markers]
    );

    const handleSearchSelect = useCallback(
        (
            addressComponent: google.maps.GeocoderAddressComponent[],
            lat: number,
            lng: number
        ) => {
            console.log("a: ", addressComponent);

            const street = getAddressComponent(addressComponent, "route");
            const number = getAddressComponent(
                addressComponent,
                "street_number"
            );
            const zipCode = getAddressComponent(
                addressComponent,
                "postal_code"
            ).replace(/\s/g, ""); // remove spaces

            onSearchSelect?.({ street, number, zipCode }, lat, lng);
        },
        []
    );

    const MARKERS = useMemo(
        () =>
            markers?.map((marker, ind) => {
                const { lat, lng } = marker;
                if (!lat || !lng) return null;

                return (
                    <MarkerF
                        key={uuidv4()}
                        position={{ lat, lng }}
                        onMouseUp={() => setActiveMarker?.(ind)}
                        animation={
                            marker !== mainMarker && activeMarker === ind
                                ? google.maps.Animation.BOUNCE
                                : undefined // Set to null when not active
                        }
                        onClick={() => {
                            onMarkerClick?.(marker);
                            // Start the bounce animation, then stop after 2 seconds
                            setActiveMarker?.(ind);
                        }}
                        draggable={marker === mainMarker}
                        onDragEnd={(e: google.maps.MapMouseEvent) =>
                            onMarkerDragEnd(e.latLng, ind)
                        }
                    />
                );
            }),
        [markers, mainMarker]
    );

    if (!isLoaded) return null;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom || 16}
            onClick={handleMapClick}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {map ? (
                <>
                    {/* Draw One */}
                    {!multipleShapes ? (
                        <CustomDrawingComponent
                            map={map}
                            drawing={drawing}
                            shape={shape}
                            onDraw={(shape) => onDraw && onDraw(shape)}
                            onShapeChange={(newEncodedShape) =>
                                onShapeChange &&
                                onShapeChange("", newEncodedShape)
                            }
                        />
                    ) : null}

                    {/* Draw Multiple */}
                    {multipleShapes ? (
                        <DrawMultiple
                            map={map}
                            drawing={drawing}
                            shapes={shapes}
                            onDraw={(shape) => onDraw && onDraw(shape)}
                            onShapeChange={(oldShape, newShape) =>
                                onShapeChange &&
                                onShapeChange(oldShape, newShape)
                            }
                        />
                    ) : null}

                    {/* Search */}
                    {search ? (
                        <SearchOnMap onSearchSelect={handleSearchSelect} />
                    ) : null}
                </>
            ) : null}

            {/* Markers */}
            {MARKERS}
        </GoogleMap>
    );
};

const areEqual = (prevProps: IMapProps, nextProps: IMapProps): boolean => {
    return (
        // ------
        // Simple
        // ------
        prevProps.zoom === nextProps.zoom &&
        prevProps.drawing === nextProps.drawing &&
        prevProps.search === nextProps.search &&
        prevProps.shape === nextProps.shape && // TODO: improve this; shallow for now
        prevProps.activeMarker === nextProps.activeMarker &&
        prevProps.multipleShapes === nextProps.multipleShapes &&
        // mainMarker
        prevProps.mainMarker?.lat === nextProps.mainMarker?.lat &&
        prevProps.mainMarker?.lng === nextProps?.mainMarker?.lng &&
        // ---------
        // Callbacks
        // ---------
        prevProps.onReady === nextProps.onReady &&
        prevProps.onClick === nextProps.onClick &&
        prevProps.onMarkerClick === nextProps.onMarkerClick &&
        prevProps.onDragEnd === nextProps.onDragEnd &&
        prevProps.onDraw === nextProps.onDraw &&
        prevProps.onShapeChange === nextProps.onShapeChange &&
        prevProps.onSearchSelect === nextProps.onSearchSelect &&
        prevProps.setActiveMarker === nextProps.setActiveMarker &&
        // --------
        // Arrays
        // --------
        // markers
        prevProps.markers?.length === nextProps.markers?.length &&
        !!prevProps.markers?.every(
            ({ lat, lng }) =>
                !!nextProps.markers?.find(
                    (nm) => nm.lat === lat && nm.lng === lng
                )
        ) &&
        // shapes
        prevProps.shapes?.length === nextProps.shapes?.length &&
        !!prevProps.shapes?.map(
            (ps) =>
                !!nextProps.shapes?.find(
                    (ns) => JSON.stringify(ps) === JSON.stringify(ns)
                )
        )
    );
};

export default React.memo(Map, areEqual);
