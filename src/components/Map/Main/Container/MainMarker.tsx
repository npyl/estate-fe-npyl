import { FC, MutableRefObject, useCallback } from "react";
import { IMapAddress, IMapCoordinates, IMapMarker } from "../../types";
import getAddressFromLatLng from "./getAddressFromLatLng";
import Marker from "@/components/Map/Marker";

interface Props {
    geocoderRef: MutableRefObject<google.maps.Geocoder | undefined>;

    center: IMapCoordinates;

    onMainMarkerDrag?: (
        newLat: number,
        newLng: number,
        address: IMapAddress
    ) => void;
}

const MainMarker: FC<Props> = ({ geocoderRef, center, onMainMarkerDrag }) => {
    const draggable = Boolean(onMainMarkerDrag);

    const onDragEnd = useCallback(
        async (e: google.maps.MapMouseEvent) => {
            if (!geocoderRef.current) return;
            if (!onMainMarkerDrag) return;

            const latLng = e.latLng;
            if (!latLng) return;

            const lat = latLng.lat();
            const lng = latLng.lng();

            const response = await getAddressFromLatLng(
                geocoderRef.current,
                lat,
                lng
            );
            if (!response) return;

            onMainMarkerDrag?.(lat, lng, response);
        },
        [onMainMarkerDrag]
    );

    return (
        <Marker draggable={draggable} position={center} onDragEnd={onDragEnd} />
    );
};

export default MainMarker;
