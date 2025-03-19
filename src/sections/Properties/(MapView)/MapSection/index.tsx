import { FC, useCallback, useState } from "react";
import Map, { IMapMarker } from "@/components/Map";
import { DrawShape, StopDraw } from "src/components/Map/types";
import { drawingToPoints } from "src/components/Map/util";
import { useDebouncedCallback } from "use-debounce";
import { useGetPropertyLocationMarkersQuery } from "src/services/properties";
import {
    selectAll,
    setPoints,
    resetPoints,
    selectPoints,
} from "src/slices/filters";
import { useDispatch, useSelector } from "react-redux";
import getMarkerId from "../getMarkerId";
import dynamic from "next/dynamic";
import { useMarkerRefsContext } from "../context";
import { TShape } from "@/types/shape";
import Marker, { MarkerProps } from "@/components/Map/Marker";
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
    const allFilters = useSelector(selectAll);

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

const MapSection = () => {
    const dispatch = useDispatch();

    const [mainMarker, setMainMarker] = useState<IMapMarker>({
        lat: 38.246639,
        lng: 21.734573,
    });

    const handleDraw = useCallback((shape: DrawShape | StopDraw) => {
        const cb = shape ? setPoints(drawingToPoints(shape)) : resetPoints();
        dispatch(cb);
    }, []);

    const handleChange = useDebouncedCallback((_: any, newShape: TShape) => {
        dispatch(setPoints(newShape));
    }, 150);

    const updateMainMarkerCoordinates = (lat: number, lng: number) => {
        if (!lat || !lng) return;
        setMainMarker({ lat, lng });
    };

    const shape = useSelector(selectPoints) as unknown as TShape;

    return (
        <Map
            drawing
            shapes={[shape]}
            center={mainMarker}
            onDraw={handleDraw}
            onShapeChange={handleChange}
            onSearchSelect={updateMainMarkerCoordinates}
        >
            <MarkerList />
        </Map>
    );
};

export default MapSection;
