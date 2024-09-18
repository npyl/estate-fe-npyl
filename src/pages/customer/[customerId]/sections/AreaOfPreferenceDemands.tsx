import { Box, Typography } from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Map from "src/components/Map/Map";
import { ShapeData } from "src/components/Map/types";
import { decodeShape } from "src/components/Map/util";
import {
    useGetMunicipalitiesQuery,
    useGetRegionsQuery,
    useLazyGetMunicipalitiesQuery,
    useLazyGetNeighbourhoodsQuery,
} from "src/services/location";
import { Grid, List } from "@mui/material";
import { ListItem } from "src/components/List";
import useGetCustomer from "@/hooks/customer";
import { IGeoLocation } from "@/types/geolocation";
import { useHumanReadableCallback } from "@/components/Location/hook";

interface AreaOfPreferenceProps {
    index: number; // index of demand
}

interface ViewLocationMiniProps {
    regionCodes: string[];
    cityCodes: string[];
    complexCodes: string[];
}

const isNumberString = (input: string): boolean => !isNaN(Number(input));

export const ViewLocationMini = ({
    regionCodes,
    cityCodes,
    complexCodes,
}: ViewLocationMiniProps) => {
    const { t } = useTranslation();

    const { data: regions } = useGetRegionsQuery();
    const [allMunicipalities, setAllMunicipalities] = useState<IGeoLocation[]>(
        []
    );
    const [allNeighbourhoods, setAllNeighbourhoods] = useState<IGeoLocation[]>(
        []
    );
    const [getMunicipalities] = useLazyGetMunicipalitiesQuery();
    const [getNeighbourhoods] = useLazyGetNeighbourhoodsQuery();

    useEffect(() => {
        const fetchAllMunicipalities = async () => {
            const municipalitiesData: IGeoLocation[] = [];

            for (const code of regionCodes) {
                const { data: municipalities } = await getMunicipalities(+code);
                if (municipalities) {
                    municipalitiesData.push(...municipalities);
                }
            }

            setAllMunicipalities(municipalitiesData);
        };

        fetchAllMunicipalities();
    }, [regionCodes, getMunicipalities]);

    useEffect(() => {
        const fetchAllNeighbourhoods = async () => {
            const neighbourhoodsData: IGeoLocation[] = [];

            for (const code of cityCodes) {
                const { data: neighbourhoods } = await getNeighbourhoods(+code);
                if (neighbourhoods) {
                    neighbourhoodsData.push(...neighbourhoods);
                }
            }

            setAllNeighbourhoods(neighbourhoodsData);
        };

        fetchAllNeighbourhoods();
    }, [cityCodes, getNeighbourhoods]);

    const { getHumanReadable } = useHumanReadableCallback();

    const renderListItem = (label: string, codes: string[], data: any) => (
        <ListItem
            label={t(label)}
            value={codes
                .map((code) => getHumanReadable(code, data))
                .filter(Boolean)
                .join(", ")}
        />
    );

    return (
        <Grid container>
            <Grid item xs={6}>
                <List>
                    {renderListItem("Region", regionCodes, regions)}
                    {renderListItem(
                        "Neighborhood",
                        complexCodes,
                        allNeighbourhoods
                    )}
                </List>
            </Grid>
            <Grid item xs={6}>
                <List>
                    {renderListItem("City", cityCodes, allMunicipalities)}
                </List>
            </Grid>
        </Grid>
    );
};

const AreaOfPreferenceDemands: React.FC<AreaOfPreferenceProps> = ({
    index,
}) => {
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
                regionCodes={regions}
                cityCodes={cities}
                complexCodes={complexes}
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

export default AreaOfPreferenceDemands;
