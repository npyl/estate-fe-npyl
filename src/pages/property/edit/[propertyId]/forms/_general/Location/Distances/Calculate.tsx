import { Button } from "@mui/material";
import { useCallback, useEffect, useRef } from "react";
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
    const { watch } = useFormContext();

    const lat = watch("location.lat");
    const lng = watch("location.lng");

    const serviceRef = useRef<google.maps.places.PlacesService>();

    const handleCalculate = useCallback(() => {
        if (!(lat > 0 && lng > 0)) {
            toast.error(t("Fill in property location first"));
            return;
        }

        if (!serviceRef.current) {
            console.error("Service is null");
            return;
        }

        SERVICES.forEach(({ service, RHFName }) => {
            const request = {
                location: new google.maps.LatLng(lat, lng),
                radius: 10000, // Specify the radius in meters
                type: service,
            };

            serviceRef.current!.nearbySearch(
                request,
                (
                    results: google.maps.places.PlaceResult[] | null,
                    status: google.maps.places.PlacesServiceStatus
                ) => {
                    if (!results) return;

                    console.log("service: ", service, " results: ", results);

                    // 1. find closest
                    // 2. set rhfname
                }
            );
        });
    }, [t, lat, lng]);

    // INITIALISE
    useEffect(() => {
        if (!map) return;
        serviceRef.current = new google.maps.places.PlacesService(map);
    }, [map]);

    return (
        <Button variant="outlined" onClick={handleCalculate}>
            {t("Calculate")}
        </Button>
    );
};

export default CalculateDistances;
