import { GoogleMap } from "@react-google-maps/api";
import { CSSProperties, FC, useCallback, useRef } from "react";
import useLoadApi from "../../hook";
import getAddressFromLatLng from "./getAddressFromLatLng";
import { IMapProps } from "../../types";
import { MapProvider, useMapContext } from "../context";
import Controls, { ControlsRef } from "./Controls";
import { athensLatLng } from "../../constants";
import dynamic from "next/dynamic";
const MainMarker = dynamic(() => import("./MainMarker"));

const containerStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    position: "relative",
};

const MapContainer: FC<IMapProps> = ({
    onReady,
    // ...
    onClick,
    onMainMarkerDrag,
    // ...
    zoom,
    mainMarker = false,
    center = athensLatLng,
    // ...
    leftTop,
    leftCenter,
    rightTop,
    centerTop,
    // ...
    children,
    ...props
}) => {
    const { mapRef } = useMapContext();
    const geocoderRef = useRef<google.maps.Geocoder>();
    const controlsRef = useRef<ControlsRef>(null);

    const { isLoaded } = useLoadApi();

    const onLoad = useCallback(
        (map: google.maps.Map) => {
            // map
            mapRef.current = map;

            // geocoder
            geocoderRef.current = new window.google.maps.Geocoder();

            // load controls
            controlsRef.current?.load();

            onReady?.(map);
        },
        [onReady]
    );

    const handleMapClick = useCallback(
        async (event: google.maps.MapMouseEvent) => {
            if (!geocoderRef.current) return;
            if (!onClick) return;

            const latLng = event.latLng;
            const lat = latLng?.lat();
            const lng = latLng?.lng();

            if (lat === undefined || lng === undefined) return;

            const response = await getAddressFromLatLng(
                geocoderRef.current,
                lat,
                lng
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
            <Controls
                ref={controlsRef}
                // ...
                centerTop={centerTop}
                leftCenter={leftCenter}
                leftTop={leftTop}
                rightTop={rightTop}
            />

            {mainMarker ? (
                <MainMarker
                    geocoderRef={geocoderRef}
                    center={center}
                    onMainMarkerDrag={onMainMarkerDrag}
                />
            ) : null}

            {children}
        </GoogleMap>
    );
};

const MapContainerWrapped: FC<IMapProps> = (props) => (
    <MapProvider>
        <MapContainer {...props} />
    </MapProvider>
);

export default MapContainerWrapped;
