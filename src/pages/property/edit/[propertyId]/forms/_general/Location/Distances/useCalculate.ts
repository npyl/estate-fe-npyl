import useDialog from "@/hooks/useDialog";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { SERVICES } from "./constants";
import { TService } from "./types";

type TExtendedService = TService & { location: google.maps.LatLng };

const useCalculate = (map?: google.maps.Map) => {
    const { t } = useTranslation();

    const { setValue, watch } = useFormContext();

    const [loading, startLoading, stopLoading] = useDialog();

    const [serviceRef, setService] =
        useState<google.maps.places.PlacesService>();

    const handleResults = useCallback(
        (
            results: google.maps.places.PlaceResult[] | null,
            status: google.maps.places.PlacesServiceStatus,
            RHFName: string,
            resolve: (s: string) => void,
            reject: VoidFunction
        ) => {
            if (!results || status !== "OK") {
                reject();
                return;
            }

            const placeLocation = results[0]?.geometry?.location;
            if (!placeLocation) {
                reject();
                return;
            }

            const lat = watch("location.lat");
            const lng = watch("location.lng");
            const currentLocation = new google.maps.LatLng(lat, lng);

            const distance =
                google.maps.geometry.spherical.computeDistanceBetween(
                    currentLocation,
                    placeLocation
                );

            setValue(RHFName, distance.toFixed(1));

            resolve("OK");
        },
        []
    );

    const getSearchPromise = useCallback(
        ({ service, RHFName, location }: TExtendedService) =>
            new Promise((resolve, reject) => {
                // INFO: this makes sure we find the closest to our location
                const DISTANCE_RANKING = google.maps.places.RankBy.DISTANCE;

                const request: google.maps.places.PlaceSearchRequest = {
                    location,
                    type: service,
                    rankBy: DISTANCE_RANKING,
                };

                serviceRef?.nearbySearch(request, (r, s, _) =>
                    handleResults(r, s, RHFName, resolve, reject)
                );
            }),
        [serviceRef]
    );

    // CALCULATE
    const calculateDistances = useCallback(async () => {
        const lat = watch("location.lat");
        const lng = watch("location.lng");

        if (!(lat > 0 && lng > 0)) {
            toast.error(t("Fill in property location first"));
            return;
        }

        const location = new google.maps.LatLng(lat, lng);

        const searchPromises = SERVICES.map((s) =>
            getSearchPromise({ ...s, location })
        );

        startLoading();
        await Promise.all(searchPromises);
        stopLoading();
    }, [t, getSearchPromise]);

    // INITIALISE
    useEffect(() => {
        if (!map) return;
        setService(new google.maps.places.PlacesService(map));
    }, [map]);

    return {
        isLoaded: Boolean(serviceRef),
        isCalculating: loading,
        calculateDistances,
    };
};

export default useCalculate;
