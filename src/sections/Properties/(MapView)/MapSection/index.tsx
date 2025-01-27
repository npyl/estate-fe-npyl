import { FC, useState } from "react";
import Map, { IMapMarker } from "src/components/Map/Map";
import { DrawShape, StopDraw } from "src/components/Map/types";
import { encodeShape, convertShapeToPoints } from "src/components/Map/util";
import { useDebouncedCallback } from "use-debounce";
import { useGetPropertyLocationMarkersQuery } from "src/services/properties";
import { selectAll, setPoints, resetPoints } from "src/slices/filters";
import { useDispatch, useSelector } from "react-redux";
import { MarkerF, MarkerProps } from "@react-google-maps/api";
import getMarkerId from "../getMarkerId";
import dynamic from "next/dynamic";
import { useMarkerRefsContext } from "../context";
const PropertyInfoWindow = dynamic(() => import("./PropertyInfoWindow"));

// ----------------------------------------------------------------------------------

interface ReferencableMarkerFProps extends MarkerProps {
    propertyId: number;
}

const ReferencableMarkerF: FC<ReferencableMarkerFProps> = ({
    propertyId,
    ...props
}) => {
    const { onMarkerLoad } = useMarkerRefsContext();
    return <MarkerF onLoad={(m) => onMarkerLoad(propertyId, m)} {...props} />;
};

// ----------------------------------------------------------------------------------

const MarkerList = () => {
    const allFilters = useSelector(selectAll);

    const { data: markers } = useGetPropertyLocationMarkersQuery(allFilters);

    const [activeMarker, setActiveMarker] = useState<number>();

    return (
        <>
            {markers?.map((marker, index) => (
                <ReferencableMarkerF
                    key={getMarkerId(marker)}
                    propertyId={marker.propertyId}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    onClick={() => setActiveMarker(index)}
                    icon="/static/map/mapIcon.svg"
                >
                    {activeMarker === index ? (
                        <PropertyInfoWindow
                            marker={marker}
                            setActiveMarker={setActiveMarker}
                        />
                    ) : null}
                </ReferencableMarkerF>
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

    const handleDraw = (shape: DrawShape | StopDraw) =>
        dispatch(
            shape
                ? setPoints(convertShapeToPoints(encodeShape(shape)))
                : resetPoints()
        );

    const handleChange = useDebouncedCallback(
        (_: any, newEncodedShape: string) =>
            dispatch(setPoints(convertShapeToPoints(newEncodedShape))),
        150
    );

    const updateMainMarkerCoordinates = (lat: number, lng: number) => {
        setMainMarker({ lat, lng });
    };

    const handleSearchSelect = (_: any, lat: number, lng: number) => {
        if (!lat || !lng) return;

        updateMainMarkerCoordinates(lat, lng);
    };

    return (
        <Map
            mainMarker={mainMarker}
            drawing
            onDraw={handleDraw}
            onShapeChange={handleChange}
            onSearchSelect={handleSearchSelect}
        >
            <MarkerList />
        </Map>
    );
};

export default MapSection;
