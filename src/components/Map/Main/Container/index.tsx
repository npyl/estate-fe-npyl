import { GoogleMap } from "@react-google-maps/api";
import {
    CSSProperties,
    FC,
    forwardRef,
    useCallback,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import useLoadApi from "@/components/Map/hook";
import {
    ContentProps,
    IMapProps,
    MapContainerProps,
} from "@/components/Map/types";
import { MapProvider, useMapContext } from "../context";
import Controls from "./Controls";
import { MAP_ID, patrasLatLng } from "@/components/Map/constants";
import dynamic from "next/dynamic";
import useZoom from "./useZoom";
import useCenter from "./useCenter";
import useClick from "./useClick";
const MainMarker = dynamic(() => import("./MainMarker"));

interface ContentRef {
    load: VoidFunction;
}

const Content = forwardRef<ContentRef, ContentProps>(
    (
        {
            geocoderRef,
            // ...
            onMainMarkerDrag,
            mainMarker,
            // ...
            center,
            // ..
            centerTop,
            leftCenter,
            leftTop,
            rightTop,
            // ...
            children,
        },
        ref
    ) => {
        const [isReady, setIsReady] = useState(false);

        const load = useCallback(() => setIsReady(true), []);
        useImperativeHandle(ref, () => ({ load }), []);

        if (!isReady) return null;

        return (
            <>
                <Controls
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
            </>
        );
    }
);

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

    const { mapRef } = useMapContext();
    const geocoderRef = useRef<google.maps.Geocoder>();
    const contentRef = useRef<ContentRef>();

    const { isLoaded } = useLoadApi();

    const center = useCenter(_center);
    const zoom = useZoom(props.shapes, _zoom);

    const onMutualLoad = useCallback(() => {
        // content
        contentRef.current?.load();

        onReady?.(mapRef.current!);
    }, [onReady]);

    const onMapRef = useCallback((map: google.maps.Map) => {
        map.getDiv().setAttribute("data-testid", MAP_ID);

        // map
        mapRef.current = map;

        // geocoder
        geocoderRef.current = new window.google.maps.Geocoder();

        // attempt mutual ref
        if (!contentRef.current) return;
        onMutualLoad();
    }, []);

    const onContentRef = useCallback((c: ContentRef | null) => {
        if (!c) return;
        contentRef.current = c;

        // attempt mutual ref
        if (!mapRef.current) return;
        onMutualLoad();
    }, []);

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
