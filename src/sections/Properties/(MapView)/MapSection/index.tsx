import { FC, useCallback, useMemo, useRef, useState } from "react";
import Map from "@/components/Map";
import { DrawShape, StopDraw } from "src/components/Map/types";
import { drawingToPoints, getShapeCenter } from "@/components/Map/util";
import { useDebouncedCallback } from "use-debounce";
import { useGetPropertyLocationMarkersQuery } from "src/services/properties";
import getMarkerId from "../getMarkerId";
import dynamic from "next/dynamic";
import { useMarkerRefsContext } from "../context";
import { TShape } from "@/types/shape";
import Marker, { MarkerProps } from "@/components/Map/Marker";
import { ZOOM_LEVELS } from "@/components/Map/constants";
import {
    useAllFilters,
    useFiltersContext,
    usePoints,
} from "../../FiltersContext";
const PropertyInfoWindow = dynamic(() => import("./PropertyInfoWindow"));

// ----------------------------------------------------------------------------------

interface ReferencableMarkerProps extends MarkerProps {
    propertyId: number;
}

const ReferencableMarker: FC<ReferencableMarkerProps> = ({
    propertyId,
    ...props
}) => {
    const { onMarkerLoad } = useMarkerRefsContext();
    return <Marker onLoad={(m) => onMarkerLoad(propertyId, m)} {...props} />;
};

// ----------------------------------------------------------------------------------

const MarkerList = () => {
    const allFilters = useAllFilters();

    const { data: markers } = useGetPropertyLocationMarkersQuery(allFilters);

    const [activeMarker, setActiveMarker] = useState<number>();

    return (
        <>
            {markers?.map((marker, index) => (
                <ReferencableMarker
                    key={getMarkerId(marker)}
                    propertyId={marker.propertyId}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    onClick={() => setActiveMarker(index)}
                >
                    {activeMarker === index ? (
                        <PropertyInfoWindow
                            marker={marker}
                            setActiveMarker={setActiveMarker}
                        />
                    ) : null}
                </ReferencableMarker>
            ))}
        </>
    );
};

// ------------------------------------------------------------------------------------

const MapSection = () => {
    const mapRef = useRef<google.maps.Map>();
    const setRef = useCallback(
        (m: google.maps.Map) => (mapRef.current = m),
        []
    );

    const { setPoints, resetPoints } = useFiltersContext();

    const handleDraw = useCallback((shape: DrawShape | StopDraw) => {
        if (shape) {
            setPoints(drawingToPoints(shape));
        } else {
            resetPoints();
        }
    }, []);

    const handleChange = useDebouncedCallback((_: any, newShape: TShape) => {
        setPoints(newShape);
    }, 150);

    const shape = usePoints();
    const center = useMemo(() => getShapeCenter(shape), [shape]);
    const zoom = shape ? ZOOM_LEVELS.REGION : ZOOM_LEVELS.DEFAULT;

    return (
        <Map
            onReady={setRef}
            drawing
            zoom={zoom}
            shapes={[shape]}
            center={center}
            onDraw={handleDraw}
            onShapeChange={handleChange}
        >
            <MarkerList />
        </Map>
    );
};

export default MapSection;
