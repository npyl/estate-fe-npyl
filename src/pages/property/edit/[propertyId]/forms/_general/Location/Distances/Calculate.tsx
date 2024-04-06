import useResponsive from "@/hooks/useResponsive";
import { LoadingButton } from "@mui/lab";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const SERVICES = [
    { service: "hospital", RHFName: "distances.hospital" },
    { service: "transit_station", RHFName: "distances.publicTransport" },
    { service: "sea", RHFName: "distances.sea" },
    { service: "school", RHFName: "distances.schools" },
    { service: "supermarket", RHFName: "distances.supermarket" },
    { service: "restaurant", RHFName: "distances.cafeRestaurant" },
    { service: "airport", RHFName: "distances.airport" },
];

interface Props {
    map?: google.maps.Map;
}

const CalculateDistances = ({ map }: Props) => {
    const { t } = useTranslation();
    const { watch, setValue } = useFormContext();

    const [loading, setLoading] = useState(false);

    const lat = watch("location.lat");
    const lng = watch("location.lng");

    const serviceRef = useRef<google.maps.places.PlacesService>();

    const belowMd = useResponsive("down", "md");

    const handleCalculate = useCallback(() => {
        if (!(lat > 0 && lng > 0)) {
            toast.error(t("Fill in property location first"));
            return;
        }

        if (!serviceRef.current) {
            console.error("Service is null");
            return;
        }

        const currentLocation = new google.maps.LatLng(lat, lng);

        const searchPromises = SERVICES.map(({ service, RHFName }) => {
            return new Promise((resolve, reject) => {
                const request = {
                    location: currentLocation,
                    radius: 10000, // Specify the radius in meters
                    type: service,
                };

                serviceRef.current!.nearbySearch(
                    request,
                    (
                        results: google.maps.places.PlaceResult[] | null,
                        status: google.maps.places.PlacesServiceStatus
                    ) => {
                        // ZERO RESULTS
                        if (
                            status ===
                            google.maps.places.PlacesServiceStatus.ZERO_RESULTS
                        ) {
                            resolve(0);
                            return;
                        }

                        // INVALID RESULTS
                        if (
                            !results ||
                            status !== google.maps.places.PlacesServiceStatus.OK
                        ) {
                            console.error(
                                "Got no results or some other error!"
                            );
                            reject("Got no results or some other error!");
                            return;
                        }

                        let closestPlace = null;
                        let shortestDistance = Number.MAX_VALUE;

                        // find min distance
                        results.forEach((place) => {
                            if (!place.geometry || !place.geometry.location)
                                return;

                            const distance =
                                google.maps.geometry.spherical.computeDistanceBetween(
                                    currentLocation,
                                    place.geometry.location
                                );

                            if (distance < shortestDistance) {
                                shortestDistance = distance;
                                closestPlace = place;
                            }
                        });

                        // Set result
                        if (closestPlace) {
                            setValue(RHFName, shortestDistance.toFixed(1));
                        }

                        resolve(shortestDistance.toFixed(1)); // Resolve the promise with the result
                    }
                );
            });
        });

        //
        //  Execute
        //
        setLoading(true);
        Promise.all(searchPromises)
            .then((d) => setLoading(false))
            .catch((error) => {
                console.error("An error occurred during the search:", error);
                setLoading(false);
            });
    }, [t, lat, lng]);

    // CLEAR
    useEffect(() => {
        if (!lat || !lng) return;
        SERVICES.forEach(({ RHFName }) => setValue(RHFName, undefined));
    }, [lat, lng]);

    // INITIALISE
    useEffect(() => {
        if (!map) return;
        serviceRef.current = new google.maps.places.PlacesService(map);
    }, [map]);

    return (
        <LoadingButton
            loading={loading}
            variant="outlined"
            onClick={handleCalculate}
        >
            {belowMd ? t("Calculate") : `${t("Calculate (within")} 10km)`}
        </LoadingButton>
    );
};

export default CalculateDistances;
