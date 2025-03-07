import { Box, Typography } from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Map from "@/components/Map";
import { useGetMunicipalitiesQuery } from "@/services/location";
import { IDemand } from "@/types/demand";
import { toNumberSafe } from "@/utils/toNumber";
import ViewLocationMini from "./ViewLocationMini";

interface AreaOfPreferenceProps {
    demand?: IDemand;
}

const AreaOfPreferenceDemands: FC<AreaOfPreferenceProps> = ({ demand }) => {
    const { t } = useTranslation();

    const demandFilters = useMemo(
        () => demand?.filters || null,
        [demand?.filters]
    );

    const shapes = demand?.shapeList;

    const shapeData0 = useMemo(() => shapes?.[0], [shapes?.[0]]);

    const regions = useMemo(
        () => demandFilters?.regions || [],
        [demandFilters?.regions]
    );
    const cities = useMemo(
        () => demandFilters?.cities || [],
        [demandFilters?.cities]
    );
    const complexes = useMemo(
        () => demandFilters?.complexes || [],
        [demandFilters?.complexes]
    );

    const iRegion0 = toNumberSafe(regions[0]);

    const { data: municips } = useGetMunicipalitiesQuery(iRegion0, {
        skip: iRegion0 !== -1,
    });

    const [map, setMap] = useState<google.maps.Map>();

    useEffect(() => {
        if (!map) return;

        if (shapeData0) {
            // // Center the map to the first point in the shape
            // if (shapeData0.type === "Polygon") {
            //     if (
            //         shapeData0.paths.length > 0 &&
            //         shapeData0.paths[0].length > 0
            //     ) {
            //         const [firstPath] = shapeData0.paths;
            //         const [firstCoord] = firstPath;
            //         const { lat, lng } = firstCoord;
            //         map.setCenter(new google.maps.LatLng(lat, lng));
            //     }
            // } else if (shapeData0.type === "Circle") {
            //     const { lat, lng } = shapeData0;
            //     map.setCenter(new google.maps.LatLng(lat, lng));
            // } else if (shapeData0.type === "Rectangle") {
            //     const { nelat, nelng } = shapeData0;
            //     map.setCenter(new google.maps.LatLng(nelat, nelng));
            // } else if (!shapeData0) {
            //     return;
            // }
        } else {
            if (!cities[0]) return;
            const city = municips?.filter((m) => m.areaID === +cities[0])[0];

            map.setCenter(
                new google.maps.LatLng(city?.latitude!, city?.longitude!)
            );

            map.setZoom(12);
        }
    }, [shapeData0, map]);

    return (
        <>
            <Box
                sx={{
                    px: 3,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "left",
                }}
            >
                <Typography variant="h6">{t("Area of Preference")}</Typography>
            </Box>
            <ViewLocationMini
                regionCodes={regions}
                cityCodes={cities}
                complexCodes={complexes}
            />
            <Box height={`calc(100vh - 266px)`} width={"100%"}>
                <Map
                    zoom={12}
                    multipleShapes
                    drawing={false}
                    shapes={shapes}
                    onReady={setMap}
                />
            </Box>
        </>
    );
};

export default AreaOfPreferenceDemands;
