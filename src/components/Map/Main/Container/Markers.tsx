import { FC, MutableRefObject, useCallback } from "react";
import getAddressFromLatLng from "./getAddressFromLatLng";
import { IMapAddress, IMapCoordinates, IMapMarker } from "../../types";
import Marker from "./Marker";

const getMarker =
    (
        onMarkerDragEnd: (latLng: any, index: number) => void,
        onClick: (m: IMapCoordinates, index: number) => void
    ) =>
    (m: IMapCoordinates, index: number) => {
        const key = `${m.lat}-${m.lng}-${m.propertyId}`;

        return (
            <Marker
                key={key}
                m={m}
                onClick={() => onClick(m, index)}
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

export default Markers;
