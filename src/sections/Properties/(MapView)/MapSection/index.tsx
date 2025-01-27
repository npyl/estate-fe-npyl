import { useState } from "react";
import Map, { IMapMarker } from "src/components/Map/Map";
import { DrawShape, StopDraw } from "src/components/Map/types";
import { encodeShape, convertShapeToPoints } from "src/components/Map/util";
import { useDebouncedCallback } from "use-debounce";
import { useGetPropertyLocationMarkersQuery } from "src/services/properties";
import { selectAll, setPoints, resetPoints } from "src/slices/filters";
import { useDispatch, useSelector } from "react-redux";
import { MarkerF } from "@react-google-maps/api";
import getMarkerId from "../getMarkerId";
import dynamic from "next/dynamic";
const PropertyInfoWindow = dynamic(() => import("./PropertyInfoWindow"));

const MapSection = () => {
    const dispatch = useDispatch();

    const [activeMarker, setActiveMarker] = useState<number | undefined>(
        undefined
    );
    const [mainMarker, setMainMarker] = useState<IMapMarker>({
        lat: 38.246639,
        lng: 21.734573,
    });

    const allFilters = useSelector(selectAll);

    const { data: markers } = useGetPropertyLocationMarkersQuery(allFilters);

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
            activeMarker={activeMarker}
            setActiveMarker={setActiveMarker}
            // search
            drawing={true}
            onDraw={handleDraw}
            onShapeChange={handleChange}
            onSearchSelect={handleSearchSelect}
        >
            {markers?.map((marker, index) => (
                <MarkerF
                    key={getMarkerId(marker)}
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
                </MarkerF>
            ))}
        </Map>
    );
};

export default MapSection;
