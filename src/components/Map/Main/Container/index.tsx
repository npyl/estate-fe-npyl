import { GoogleMap } from "@react-google-maps/api";
import { CSSProperties, FC, useCallback, useRef } from "react";
import useLoadApi from "../../hook";
import { IMapProps, MapContainerProps } from "../../types";
import { MapProvider, useMapContext } from "../context";
import Controls, { ControlsRef } from "./Controls";
import { patrasLatLng } from "../../constants";
import dynamic from "next/dynamic";
import useZoom from "./useZoom";
import useCenter from "./useCenter";
import useClick from "./useClick";
const MainMarker = dynamic(() => import("./MainMarker"));

const containerStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    position: "relative",
};

const MapContainer: FC<MapContainerProps> = ({
    onReady,
    // ...
    onClick,
    onMainMarkerDrag,
    // ...
    zoom: _zoom,
    mainMarker = false,
    center: _center = patrasLatLng,
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

    const center = useCenter(_center);
    const zoom = useZoom(props.shapes, _zoom);

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

    const handleMapClick = useClick(geocoderRef, onClick);

    if (!isLoaded) return null;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
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
