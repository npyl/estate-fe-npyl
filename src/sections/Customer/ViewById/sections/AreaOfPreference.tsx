import { Box, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Map from "src/components/Map/Map";
import { ShapeData } from "src/components/Map/types";
import { decodeShape } from "src/components/Map/util";
import {
    useGetMunicipalitiesQuery,
    useGetNeighbourhoodsQuery,
    useGetRegionsQuery,
} from "src/services/location";

import { Grid, List } from "@mui/material";
import { ListItem } from "src/components/List";
import useGetCustomer from "@/hooks/customer";
import useHumanReadable from "@/components/Location/hook";

interface AreaOfPreferenceProps {
    index: number; // index of demand
}

interface ViewLocationMiniProps {
    regionCode?: string;
    cityCode?: string;
    complexCode?: string;
}

const isNumberString = (input: string): boolean => !isNaN(Number(input));

export const ViewLocationMini = ({
    regionCode,
    cityCode,
    complexCode,
}: ViewLocationMiniProps) => {
    const { t } = useTranslation();

    const { data: regions } = useGetRegionsQuery();
    const { data: municips } = useGetMunicipalitiesQuery(+regionCode!, {
        skip: !regionCode || !isNumberString(regionCode),
    });
    const { data: neighbs } = useGetNeighbourhoodsQuery(+cityCode!, {
        skip: !cityCode || !isNumberString(cityCode),
    });

    // region is most of the types a code; translate to human readable form; otherwise just return the string
    const region = useHumanReadable(regionCode, regions);

    // city is most of the types a code; translate to human readable form; otherwise just return the string
    const city = useHumanReadable(cityCode, municips);

    // neighb is most of the types a code; translate to human readable form; otherwise just return the string
    const neighb = useHumanReadable(complexCode, neighbs);

    return (
        <Grid container>
            <Grid item xs={6}>
                <List>
                    {region && <ListItem label={t("Region")} value={region} />}
                    {neighb && (
                        <ListItem label={t("Neighborhood")} value={neighb} />
                    )}
                </List>
            </Grid>
            <Grid item xs={6}>
                <List>
                    {city && <ListItem label={t("City")} value={city} />}
                </List>
            </Grid>
        </Grid>
    );
};

const AreaOfPreference: React.FC<AreaOfPreferenceProps> = ({ index }) => {
    const { t } = useTranslation();

    const { customer: data } = useGetCustomer();

    const demand = useMemo(
        () => data?.demands[index] || null,
        [data?.demands[index]]
    );
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

    const { data: municips } = useGetMunicipalitiesQuery(+regions[0], {
        skip: !regions[0] && !isNumberString(regions[0]),
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
    }, [shapeData0, index, map]);

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
                regionCode={regions[0]}
                cityCode={cities[0]}
                complexCode={complexes[0]}
            />
            <Box height={`calc(100vh - 266px)`} width={"100%"}>
                <Map
                    key={index}
                    zoom={12}
                    multipleShapes
                    drawing={false}
                    shapes={shapeData}
                    onReady={(m) => setMap(m)}
                />
            </Box>
        </>
    );
};

export default AreaOfPreference;
