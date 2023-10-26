import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React, { useCallback, useMemo, useState } from "react";
import { CustomDrawingComponent } from "./Draw";
import { DrawMultiple } from "./DrawMultiple";
import SearchOnMap from "./Search";
import { DrawShape, ShapeData, StopDraw } from "./types";

export declare type Libraries = (
    | "drawing"
    | "geometry"
    | "localContext"
    | "places"
    | "visualization"
)[];

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
    activeMarker: number | null;
    setActiveMarker: any;

    drawing?: boolean;
    multipleShapes?: boolean;
    search?: boolean;
}

const apiKey = "AIzaSyCW6oijpbC0JhlXRwPBtNIxy9e4sn7NnwU";
const athensLatLng = { lat: 37.98381, lng: 23.727539 };
const libraries = ["drawing", "places", "geometry"] as Libraries;

export const useLoadApi = () => {
    return useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: apiKey,
        libraries: libraries,
    });
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
    const [geocoder, setGeocoder] = useState<google.maps.Geocoder>();

    const [map, setMap] = React.useState(null);
    const [mapRef, setMapRef] = useState<any>();

    // center is based on mainMarker's latLng
    const center = useMemo(() => {
        return mainMarker
            ? { lat: mainMarker.lat, lng: mainMarker.lng }
            : athensLatLng;
    }, [mainMarker?.lat, mainMarker?.lng]);

    const onLoad = useCallback((map: any) => {
        const bounds = new window.google.maps.LatLngBounds(center);
        setGeocoder(new window.google.maps.Geocoder());

        if (map.current) {
            map.current.fitBounds(bounds);
        }

        setMap(map);

        onReady && onReady(map);
    }, []);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

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

    const getAddressFromLatLng = async (
        lat: number,
        lng: number
    ): Promise<IMapAddress> => {
        if (!geocoder) throw new Error("Geocoder is not initialised!");

        const { results } = await geocoder.geocode({
            location: { lat, lng },
        });

        if (!results || results.length === 0 || !results[0])
            throw new Error("Geocoder failed");

        // Access the address components from the first result
        const addressComponents = results[0].address_components;

        // Extract the desired address details from address components
        const street = getAddressComponent(addressComponents, "route");
        const number = getAddressComponent(addressComponents, "street_number");
        const zipCode = getAddressComponent(
            addressComponents,
            "postal_code"
        ).replace(/\s/g, ""); // remove spaces

        return { street, number, zipCode };
    };

    //
    //	Map
    //
    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        const latLng = event.latLng;
        const lat = latLng?.lat();
        const lng = latLng?.lng();

        if (!lat || !lng) return;

        onClick &&
            getAddressFromLatLng(lat, lng).then((response) =>
                onClick(lat, lng, response)
            );
    };

    //
    // 	Markers
    //
    const handleMarkerClick = (marker: IMapMarker) => {
        setTimeout(() => {
            mapRef?.panTo({ lat: marker.lat, lng: marker.lng });
        }, 500);

        onMarkerClick && onMarkerClick(marker); // <-- Directly use onMarkerClick
    };

    const handleMarkerMouseOver = (marker: any) => {
        setActiveMarker(marker);
    };
    const onMarkerDragEnd = (
        latLng: any,
        index: number,
        markers: IMapMarker[]
    ) => {
        const lat = latLng.lat();
        const lng = latLng.lng();

        // also call parent callback
        onDragEnd &&
            getAddressFromLatLng(lat, lng).then((response) =>
                onDragEnd(markers[index], lat, lng, response)
            );
    };

    const handleSearchSelect = (
        addressComponent: google.maps.GeocoderAddressComponent[],
        lat: number,
        lng: number
    ) => {
        console.log("a: ", addressComponent);

        const street = getAddressComponent(addressComponent, "route");
        const number = getAddressComponent(addressComponent, "street_number");
        const zipCode = getAddressComponent(
            addressComponent,
            "postal_code"
        ).replace(/\s/g, ""); // remove spaces

        onSearchSelect?.({ street, number, zipCode }, lat, lng);
    };

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom || 16}
            onClick={handleMapClick}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {!multipleShapes && (
                <CustomDrawingComponent
                    map={map}
                    drawing={drawing}
                    shape={shape}
                    onDraw={(shape) => onDraw && onDraw(shape)}
                    onShapeChange={(newEncodedShape) =>
                        onShapeChange && onShapeChange("", newEncodedShape)
                    }
                />
            )}
            {multipleShapes && (
                <DrawMultiple
                    map={map}
                    drawing={drawing}
                    shapes={shapes}
                    onDraw={(shape) => onDraw && onDraw(shape)}
                    onShapeChange={(oldShape, newShape) =>
                        onShapeChange && onShapeChange(oldShape, newShape)
                    }
                />
            )}
            {search && <SearchOnMap onSearchSelect={handleSearchSelect} />}

            {markers?.map((marker, ind) => {
                const { lat, lng } = marker;

                if (!lat || !lng) return <></>;

                return (
                    <Marker
                        key={ind}
                        position={{ lat, lng }}
                        onMouseUp={() => handleMarkerMouseOver(ind)}
                        animation={
                            marker !== mainMarker && activeMarker === ind
                                ? google.maps.Animation.BOUNCE
                                : undefined // Set to null when not active
                        }
                        onClick={() => {
                            handleMarkerClick(marker);
                            // Start the bounce animation, then stop after 2 seconds
                            setActiveMarker(ind);
                        }}
                        draggable={marker === mainMarker}
                        onDragEnd={(e: google.maps.MapMouseEvent) =>
                            onMarkerDragEnd(e.latLng, ind, markers)
                        }
                    />
                );
            })}
        </GoogleMap>
    ) : (
        <></>
    );
};

export default React.memo(Map);
