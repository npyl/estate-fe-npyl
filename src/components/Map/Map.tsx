import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { CustomDrawingComponent } from "./Draw";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ILocationPOST } from "src/types/location";
import { DrawShape, ShapeData, StopDraw } from "./types";
import SearchOnMap from "./Search";

const containerStyle = {
    width: "100%",
    height: "100%",
};

export interface IMapCoordinates {
    lat: number;
    lng: number;
}

export interface IMapMarker extends IMapCoordinates {
    address: string;
    main: boolean;
}

export interface IMapAddress {
    street: string;
    number: string;
    zipCode: string;
}

interface IMapProps {
    onReady?: (m: google.maps.Map) => void;
    hideMainMarker?: boolean;
    onClick?: (lat: number, lng: number, address: IMapAddress) => void;
    onDragEnd?: (
        marker: IMapMarker,
        newLat: number,
        newLng: number,
        address: IMapAddress
    ) => void;
    onDraw?: (shape: DrawShape | StopDraw) => void;
    onSearchSelect?: (selected: IMapAddress, lat: number, lng: number) => void;

    data?: ILocationPOST[];
    zoom?: number;
    shape?: ShapeData;
    mainMarker?: IMapMarker;
    activeMarker: number | null;
    setActiveMarker: any;
    drawing?: boolean;
    search?: boolean;
}

const apiKey = "AIzaSyCW6oijpbC0JhlXRwPBtNIxy9e4sn7NnwU";
const athensLatLng = { lat: 37.98381, lng: 23.727539 };
export const useLoadApi = () => {
    return useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: apiKey,
        libraries: ["drawing", "places", "geometry"],
    });
};
const Map = ({
    onReady,
    onClick,
    onDragEnd,
    onDraw,
    onSearchSelect,
    data,
    zoom,
    shape,
    mainMarker,
    activeMarker,
    setActiveMarker,
    hideMainMarker = false,
    drawing = true,
    search = false,
}: IMapProps) => {
    const { isLoaded } = useLoadApi();
    const [geocoder, setGeocoder] = useState<google.maps.Geocoder>();

    const [map, setMap] = React.useState(null);
    const [mapRef, setMapRef] = useState<any>();
    const [isOpen, setIsOpen] = useState(false);
    const [infoWindowData, setInfoWindowData] = useState<any>();

    const [markers, setMarkers] = useState<IMapMarker[]>([]);

    // center is based on mainMarker's latLng
    const center = useMemo(() => {
        return mainMarker
            ? { lat: mainMarker.lat, lng: mainMarker.lng }
            : athensLatLng;
    }, [mainMarker?.lat, mainMarker?.lng]);

    useEffect(() => {
        if (!data) return;

        setMarkers([
            ...markers,
            ...data
                .filter((location) => location !== null) // some properties are dummies
                .map((location) => ({
                    address: location.street + " " + location.number,
                    lat: location.lat!,
                    lng: location.lng!,
                    main: false,
                })),
        ]);
    }, [data]);

    useEffect(() => {
        if (!markers || !mainMarker) return;

        setMarkers([...markers, mainMarker]);
    }, []);

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

        if (onClick)
            getAddressFromLatLng(lat, lng).then((response) =>
                onClick(lat, lng, response)
            );
    };

    //
    // 	Markers
    //
    const handleMarkerClick = (id: any, lat: any, lng: any, address: any) => {
        mapRef?.panTo({ lat, lng });
        setInfoWindowData({ id, address });
        setIsOpen(true);
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
        markers[index].lat = lat;
        markers[index].lng = lng;
        setMarkers([...markers]);

        // also call parent callback
        if (onDragEnd)
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
            {drawing && (
                <CustomDrawingComponent
                    map={map}
                    shape={shape}
                    onDraw={(shape) => onDraw && onDraw(shape)}
                />
            )}
            {search && <SearchOnMap onSearchSelect={handleSearchSelect} />}

            {markers.map((marker, ind) => {
                const { address, lat, lng, main } = marker;
                if (hideMainMarker && main) {
                    return null; // Skip rendering main marker
                }
                return (
                    <Marker
                        key={ind}
                        position={{ lat, lng }}
                        onMouseUp={() => handleMarkerMouseOver(ind)}
                        animation={
                            !main && activeMarker === ind
                                ? google.maps.Animation.BOUNCE
                                : undefined
                        }
                        onClick={() =>
                            handleMarkerClick(ind, lat, lng, address)
                        }
                        draggable={main}
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
