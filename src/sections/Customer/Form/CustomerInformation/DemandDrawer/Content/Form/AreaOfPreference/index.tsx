import { SpaceBetween } from "@/components/styled";
import { Box, Grid, Typography } from "@mui/material";
import { FC, useCallback, useMemo, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IMapMarker } from "@/components/Map";
import {
    useLazyGetClosestQuery,
    useLazyGetHierarchyByAreaIdQuery,
} from "@/services/location";
import AutoCenter from "./auto";
import { demandName, filterName } from "../util";
import debugLog from "@/_private/debugLog";
import dynamic from "next/dynamic";
import { TShape } from "@/types/shape";
import RHFShapeMap from "./RHFShapeMap";
import RHFRegions from "./RHFRegions";
import RHFNeighbour from "./RHFNeighbour";
import RHFMunicips from "./RHFMunicips";
import { athensLatLng } from "@/components/Map/constants";
const NextShapeCenter = dynamic(() => import("./center"));

enum ZOOM_LEVELS {
    REGION = 10,
    MUNICIP = 13,
    NEIGHB = 16,
}

interface Props {
    index: number;
}

const AreaOfPreference: FC<Props> = ({ index }) => {
    const { setValue } = useFormContext();
    const { t } = useTranslation();

    const { regionsName, citiesName, complexesName, shapesName } = useMemo(
        () => ({
            regionsName: filterName("regions", index),
            citiesName: filterName("cities", index),
            complexesName: filterName("complexes", index),
            shapesName: demandName("shapeList", index),
        }),
        [index]
    );

    const regions = (useWatch({ name: regionsName }) as string[]) || [];
    const cities = (useWatch({ name: citiesName }) as string[]) || [];

    // current demand's decoded shapes
    const shapeList = (useWatch({ name: shapesName }) as TShape[]) || [];

    const [getClosestQuery] = useLazyGetClosestQuery();
    const [getHierarchy] = useLazyGetHierarchyByAreaIdQuery();

    const [zoom, setZoom] = useState<number>(ZOOM_LEVELS.REGION);

    const [mainMarker, setMainMarker] = useState(athensLatLng);

    const getClosest = useCallback(
        async (lat: number, lng: number) => {
            const { data: closest } = await getClosestQuery({
                latitude: lat,
                longitude: lng,
            });

            if (!closest) return;

            // update slice
            if (closest.level === 2) {
                setZoom(ZOOM_LEVELS.MUNICIP);

                setValue(regionsName, [closest.parentID.toString()]);
                setValue(citiesName, [closest.areaID.toString()]);
            } else if (closest.level === 3) {
                setZoom(ZOOM_LEVELS.NEIGHB);

                const neighbId = closest.areaID;
                const municipId = closest.parentID;

                setValue(complexesName, [neighbId.toString()]);
                setValue(citiesName, [municipId.toString()]);

                // For region
                getHierarchy(municipId)
                    .unwrap()
                    .then((municipHierarchy) => {
                        const regionId = municipHierarchy.parentID;
                        if (!regionId) return;

                        setValue(regionsName, [regionId.toString()]);
                    })
                    .catch(debugLog);
            }
        },
        [regionsName, citiesName, complexesName]
    );

    const updateMainMarkerCoordinates = useCallback(
        (lat: number, lng: number) => setMainMarker({ lat, lng }),
        []
    );

    //
    // Map
    //
    const handleMapClick = (lat: number, lng: number) => {
        if (!lat || !lng) return;

        getClosest(lat, lng);
        updateMainMarkerCoordinates(lat, lng);
    };
    const handleMarkerDragEnd = (
        marker: IMapMarker,
        newLat: number,
        newLng: number
    ) => {
        if (!marker || marker !== mainMarker) return; // we only care about mainMarker drag

        getClosest(newLat, newLng);
        updateMainMarkerCoordinates(newLat, newLng);
    };
    const handleSearchSelect = (_: any, lat: number, lng: number) => {
        if (!lat || !lng) return;

        getClosest(lat, lng);
        updateMainMarkerCoordinates(lat, lng);
    };

    const onMunicipChange = useCallback((lat?: number, lng?: number) => {
        if (!(lat && lng)) return;
        updateMainMarkerCoordinates(lat, lng);
        setZoom(ZOOM_LEVELS.MUNICIP);
    }, []);

    const onNeighbourChange = useCallback((lat?: number, lng?: number) => {
        if (!(lat && lng)) return;
        updateMainMarkerCoordinates(lat, lng);
        setZoom(ZOOM_LEVELS.NEIGHB);
    }, []);

    const onShapesClear = useCallback(() => setMainMarker(athensLatLng), []);

    return (
        <>
            <SpaceBetween py={1} alignItems="center">
                <Typography variant="h6">{t("Area of Preference")}</Typography>

                {/* For many shapes center */}
                {shapeList.length > 1 ? (
                    <NextShapeCenter
                        shapes={shapeList}
                        onChange={setMainMarker}
                    />
                ) : null}
            </SpaceBetween>

            {shapeList.length > 0 ? (
                <AutoCenter shape={shapeList[0]} onCenter={setMainMarker} />
            ) : null}

            <Box height={`calc(100vh - 266px)`} width={1}>
                <RHFShapeMap
                    name={shapesName as any}
                    search
                    zoom={zoom}
                    mainMarker={mainMarker}
                    onDragEnd={handleMarkerDragEnd}
                    onClick={handleMapClick}
                    onSearchSelect={handleSearchSelect}
                    // ...
                    onShapesClear={onShapesClear}
                />
            </Box>

            <Grid container spacing={2} p={1}>
                <Grid item xs={4}>
                    <RHFRegions name={regionsName as any} />
                </Grid>
                <Grid item xs={4}>
                    <RHFMunicips
                        name={citiesName as any}
                        regionCodes={regions}
                        onChange={onMunicipChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <RHFNeighbour
                        name={complexesName as any}
                        municipCodes={cities}
                        onChange={onNeighbourChange}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default AreaOfPreference;
