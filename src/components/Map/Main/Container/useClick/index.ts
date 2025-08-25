import { RefObject, useCallback } from "react";
import { IMapAddress } from "../../../types";
import getAddressFromLatLng from "./getAddressFromLatLng";

const useClick = (
    geocoderRef: RefObject<google.maps.Geocoder | undefined>,
    onClick?: (lat: number, lng: number, address: IMapAddress) => void
) =>
    useCallback(
        async (event: google.maps.MapMouseEvent) => {
            if (!geocoderRef.current) return;
            if (!onClick) return;

            const latLng = event.latLng;
            const lat = latLng?.lat();
            const lng = latLng?.lng();

            if (lat === undefined || lng === undefined) return;

            const response = await getAddressFromLatLng(
                geocoderRef.current,
                lat,
                lng
            );

            if (!response) return;

            onClick(lat, lng, response);
        },
        [onClick]
    );

export default useClick;
