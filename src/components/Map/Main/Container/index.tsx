import { GoogleMap } from "@react-google-maps/api";
import { CSSProperties, FC, useCallback, useLayoutEffect, useRef } from "react";
import useLoadApi from "@/components/Map/hook";
import { IMapProps, MapContainerProps } from "@/components/Map/types";
import { MapProvider, useMapContext } from "../context";
import { MAP_ID, patrasLatLng } from "@/components/Map/constants";
import useZoom from "./useZoom";
import useCenter from "./useCenter";
import useClick from "./useClick";
import Content, { ContentRef } from "./Content";

const useMutualLoad = (onReady?: (m: google.maps.Map) => void) => {
    const { mapRef } = useMapContext();
    const geocoderRef = useRef<google.maps.Geocoder>();
    const contentRef = useRef<ContentRef>();

    const onMutualLoad = useCallback(() => {
        // content
        contentRef.current?.load();

        onReady?.(mapRef.current!);

        console.log("MUTUAL_LOAD!");
    }, [onReady]);

    const onMapRef = useCallback((map: google.maps.Map) => {
        map.getDiv().setAttribute("data-testid", MAP_ID);

        // map
        mapRef.current = map;

        // geocoder
        geocoderRef.current = new window.google.maps.Geocoder();

        console.log("EDW 1!");

        // attempt mutual load
        if (!contentRef.current) return;
        onMutualLoad();

        console.log("EDW 1.1!");
    }, []);

    const onContentRef = useCallback((c: ContentRef | null) => {
        if (!c) return;
        contentRef.current = c;

        console.log("EDW 2!");

        // attempt mutual load
        if (!mapRef.current) return;
        onMutualLoad();

        console.log("EDW 2.1!");
    }, []);

    useLayoutEffect(() => {
        return () => {
            mapRef.current = undefined;
        };
    }, []);

    return { geocoderRef, onMapRef, onContentRef };
};

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
    const contentProps = {
        onMainMarkerDrag,
        mainMarker,
        // ...
        leftTop,
        leftCenter,
        rightTop,
        centerTop,
        // ...
        children,
    };

    const { isLoaded } = useLoadApi();
    const { geocoderRef, onMapRef, onContentRef } = useMutualLoad(onReady);

    const center = useCenter(_center);
    const zoom = useZoom(props.shapes, _zoom);

    const handleMapClick = useClick(geocoderRef, onClick);

    if (!isLoaded) return null;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
            onClick={handleMapClick}
            onLoad={onMapRef}
            options={{
                gestureHandling: "auto",
                scrollwheel: true,
                disableDefaultUI: false,
                zoomControl: true,
                fullscreenControl: true,
            }}
            {...props}
        >
            <Content
                ref={onContentRef}
                center={center}
                geocoderRef={geocoderRef}
                {...contentProps}
            >
                {children}
            </Content>
        </GoogleMap>
    );
};

const MapContainerWrapped: FC<IMapProps> = (props) => (
    <MapProvider>
        <MapContainer {...props} />
    </MapProvider>
);

export default MapContainerWrapped;
