import { GoogleMap, MarkerF } from "@react-google-maps/api";
import React, {
    CSSProperties,
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { DrawShape, IMapCoordinates, ShapeData, StopDraw } from "./types";
import useLoadApi from "./hook";
import dynamic from "next/dynamic";
import getAddressComponent from "./util/getAddressComponent";
import MapControl from "./MapControl";

// plugins
const Draw = dynamic(() => import("./plugins/Draw"));
const Search = dynamic(() => import("./plugins/Search"));
const DrawMultiple = dynamic(() => import("./plugins/DrawMultiple"));

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

    children?: ReactNode;
}

const athensLatLng = { lat: 37.98381, lng: 23.727539 };

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
    children,
}: IMapProps) => {
    const { isLoaded } = useLoadApi();

    const [map, setMap] = useState<google.maps.Map>();
    const geocoderRef = useRef<google.maps.Geocoder>();
    const [isFullscreen, setIsFullscreen] = useState(false);

    console.log("fullScreen:", isFullscreen);
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => {
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            );
        };
    }, []);

    const containerStyle: CSSProperties = {
        width: "100%",
        height: isFullscreen ? "100vh" : "100%", // Handle fullscreen
        position: "relative",
    };

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
    const handleMapClick = useCallback(
        async (event: google.maps.MapMouseEvent) => {
            if (!onClick) return;

            const latLng = event.latLng;
            const lat = latLng?.lat();
            const lng = latLng?.lng();

            if (lat === undefined || lng === undefined) return;

            const response = await getAddressFromLatLng(lat, lng);

            onClick(lat, lng, response as IMapAddress);
        },
        [onClick]
    );

    //
    // 	Markers
    //
    const onMarkerDragEnd = useCallback(
        async (latLng: any, index: number) => {
            if (!onDragEnd) return;
            if (!markers) return;
            if (markers?.length < index) return;

            const lat = latLng.lat();
            const lng = latLng.lng();

            const response = await getAddressFromLatLng(lat, lng);

            onDragEnd(markers[index], lat, lng, response as IMapAddress);
        },
        [markers, onDragEnd]
    );

    const MARKERS = useMemo(
        () =>
            markers?.map((marker, ind) => {
                const { lat, lng } = marker;
                if (!lat || !lng) return null;

                return (
                    <MarkerF
                        key={JSON.stringify({ lat, lng })}
                        position={{ lat, lng }}
                        onMouseUp={() => setActiveMarker?.(ind)}
                        icon={"/static/map/mapIcon.svg"}
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
                        draggable={onDragEnd && marker === mainMarker}
                        onDragEnd={(e) => onMarkerDragEnd(e.latLng, ind)}
                    />
                );
            }),
        [markers, mainMarker, onDragEnd]
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

                fullscreenControl: true, // Enable the built-in fullscreen control
            }}
        >
            {map ? (
                <>
                    {/* // MapControl used so drawings are rendered within the Google Map and remain visible when  map enters fullscreen. */}
                    <MapControl
                        position={window.google.maps.ControlPosition.LEFT_TOP}
                        map={map}
                    >
                        {!multipleShapes ? (
                            <Draw
                                map={map}
                                drawing={drawing}
                                shape={shape}
                                onDraw={(shape) => onDraw && onDraw(shape)}
                                onShapeChange={(newEncodedShape) =>
                                    onShapeChange &&
                                    onShapeChange("", newEncodedShape)
                                }
                            />
                        ) : (
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
                        )}
                    </MapControl>
                    {search && <Search onSearchSelect={onSearchSelect} />}

                    {/* Markers */}
                    {MARKERS}

                    {children}
                </>
            ) : null}
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
