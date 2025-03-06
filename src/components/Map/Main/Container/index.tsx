import { GoogleMap } from "@react-google-maps/api";
import {
    CSSProperties,
    FC,
    MutableRefObject,
    useCallback,
    useRef,
} from "react";
import useLoadApi from "../../hook";
import getAddressFromLatLng from "./getAddressFromLatLng";
import FullscreenPlugin from "../plugins/Fullscreen";
import {
    IMapAddress,
    IMapCoordinates,
    IMapMarker,
    IMapProps,
} from "../../types";
import Marker from "./Marker";

const containerStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    position: "relative",
};

const getMarker =
    (
        onMarkerDragEnd: (latLng: any, index: number) => void,
        onClick: (m: IMapCoordinates, index: number) => void
    ) =>
    (m: IMapCoordinates, index: number) => {
        const key = `${m.lat}-${m.lng}-${m.propertyId}`;

        // const animation =
        //     m !== mainMarker && activeMarker === ind
        //         ? google.maps.Animation.BOUNCE
        //         : undefined; // Set to null when not active

        return (
            <Marker
                key={key}
                m={m}
                // onMouseUp={() => setActiveMarker?.(index)}
                // animation={animation}
                onClick={() => onClick(m, index)}
                // draggable={onDragEnd && m === mainMarker}
                onDragEnd={(e) => onMarkerDragEnd(e.latLng, index)}
            />
        );
    };

interface MarkersProps {
    geocoderRef: MutableRefObject<google.maps.Geocoder | undefined>;

    onMarkerClick?: (marker: IMapMarker) => void;

    setActiveMarker?: (index: number) => void;

    onDragEnd?: (
        marker: IMapMarker,
        newLat: number,
        newLng: number,
        address: IMapAddress
    ) => void;

    markers: IMapMarker[];
}

const Markers: FC<MarkersProps> = ({
    geocoderRef,
    markers,
    onMarkerClick,
    setActiveMarker,
    onDragEnd,
}) => {
    const handleClick = (m: IMapCoordinates, index: number) => {
        onMarkerClick?.(m);
        // Start the bounce animation, then stop after 2 seconds
        setActiveMarker?.(index);
    };

    //
    // 	Markers
    //
    const onMarkerDragEnd = useCallback(
        async (latLng: any, index: number) => {
            if (!onDragEnd) return;
            if (!markers) return;

            const lat = latLng.lat();
            const lng = latLng.lng();

            const response = await getAddressFromLatLng(
                lat,
                lng,
                geocoderRef.current
            );

            if (!response) return;

            onDragEnd(markers[index], lat, lng, response);
        },
        [markers, onDragEnd]
    );

    return (
        <>
            {/* Markers */}
            {markers.map(getMarker(onMarkerDragEnd, handleClick))}
        </>
    );
};

const athensLatLng = { lat: 37.98381, lng: 23.727539 };

const MapContainer: FC<IMapProps> = ({
    onReady,
    onClick,
    onMarkerClick,
    onDragEnd,
    // ...
    markers = [],
    zoom,
    mainMarker,
    activeMarker,
    setActiveMarker,
    // ...
    children,
    ...props
}) => {
    const mapRef = useRef<google.maps.Map>();
    const geocoderRef = useRef<google.maps.Geocoder>();

    const { isLoaded } = useLoadApi();

    // center is based on mainMarker's latLng
    const center =
        mainMarker?.lat && mainMarker?.lng ? mainMarker : athensLatLng;

    const onLoad = useCallback((map: google.maps.Map) => {
        // map
        mapRef.current = map;

        // geocoder
        geocoderRef.current = new window.google.maps.Geocoder();

        onReady?.(map);
    }, []);

    const handleMapClick = useCallback(
        async (event: google.maps.MapMouseEvent) => {
            if (!onClick) return;

            const latLng = event.latLng;
            const lat = latLng?.lat();
            const lng = latLng?.lng();

            if (lat === undefined || lng === undefined) return;

            const response = await getAddressFromLatLng(
                lat,
                lng,
                geocoderRef.current
            );

            if (!response) return;

            onClick(lat, lng, response);
        },
        [onClick]
    );

    if (!isLoaded) return null;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom || 8}
            onClick={handleMapClick}
            onLoad={onLoad}
            options={{
                gestureHandling: "auto",
                scrollwheel: true,
                disableDefaultUI: false,
                zoomControl: true,
                fullscreenControl: true,
            }}
            {...props}
        >
            <FullscreenPlugin mapRef={mapRef} />

            {children}

            <Markers
                geocoderRef={geocoderRef}
                markers={markers}
                onMarkerClick={onMarkerClick}
                onDragEnd={onDragEnd}
                setActiveMarker={setActiveMarker}
            />
        </GoogleMap>
    );
};

export default MapContainer;
