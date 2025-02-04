import { Box, Typography } from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Map from "src/components/Map/Map";
import { ShapeData } from "src/components/Map/types";
import { decodeShape } from "src/components/Map/util";
import { useGetMunicipalitiesQuery } from "src/services/location";
import { IDemand } from "@/types/demand";
import { toNumberSafe } from "@/utils/toNumber";
import ViewLocationMini from "./ViewLocationMini";

// TODO: reuse a general AreaOfPreference

interface AreaOfPreferenceProps {
    demand?: IDemand;
}

const AreaOfPreferenceDemands: React.FC<AreaOfPreferenceProps> = ({
    demand,
}) => {
    const { t } = useTranslation();

    const demandFilters = useMemo(
        () => demand?.filters || null,
        [demand?.filters]
    );

    const shapes = useMemo(() => demand?.shapes || [], [demand?.shapes]);
    const shapeData = useMemo(
        () =>
            shapes
                ?.map((shape) => decodeShape(shape))
                .filter((decoded) => !!decoded) as ShapeData[],
        [shapes]
    );
    const shapeData0 = useMemo(() => shapeData[0], [shapeData[0]]); // take shapeData with index 0 as reference

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
            // Center the map to the first point in the shape
            if (shapeData0.type === "Polygon") {
                if (
                    shapeData0.paths.length > 0 &&
                    shapeData0.paths[0].length > 0
                ) {
                    const [firstPath] = shapeData0.paths;
                    const [firstCoord] = firstPath;
                    const { lat, lng } = firstCoord;
                    map.setCenter(new google.maps.LatLng(lat, lng));
                }
            } else if (shapeData0.type === "Circle") {
                const { lat, lng } = shapeData0;
                map.setCenter(new google.maps.LatLng(lat, lng));
            } else if (shapeData0.type === "Rectangle") {
                const { nelat, nelng } = shapeData0;
                map.setCenter(new google.maps.LatLng(nelat, nelng));
            } else if (!shapeData0) {
                return;
            }
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
                    // key={demand.id}
                    zoom={12}
                    multipleShapes
                    drawing={false}
                    shapes={shapeData}
                    onReady={setMap}
                />
            </Box>
        </>
    );
};

export default AreaOfPreferenceDemands;
