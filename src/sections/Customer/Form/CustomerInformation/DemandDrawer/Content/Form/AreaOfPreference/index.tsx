import { SpaceBetween } from "@/components/styled";
import { Box, Grid, Typography } from "@mui/material";
import { FC, useCallback, useMemo, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import MunicipSelectDemands from "./MunicipSelectDemands";
import NeighbourSelectDemands from "./NeighbourSelectDemands";
import RegionSelectDemands from "./RegionSelectDemands";
import Map, { IMapMarker } from "@/components/Map";
import { DrawShape, StopDraw } from "@/components/Map/types";
import { areShapesEqual, drawingToPoints } from "@/components/Map/util";
import {
    useLazyGetClosestQuery,
    useLazyGetHierarchyByAreaIdQuery,
} from "@/services/location";
import { useDebouncedCallback } from "use-debounce";
import AutoCenter from "./auto";
import { demandName, filterName } from "../util";
import debugLog from "@/_private/debugLog";
import dynamic from "next/dynamic";
import { TShape } from "@/types/shape";
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
    const { watch, setValue } = useFormContext();
    const { t } = useTranslation();

    const { regionsName, citiesName, complexesName, shapesName } = useMemo(
        () => ({
            regionsName: filterName("regions", index),
            citiesName: filterName("cities", index),
            complexesName: filterName("complexes", index),
            shapesName: demandName("shapeList", index),
        }),
        []
    );

    const regions = (useWatch({ name: regionsName }) as string[]) || [];
    const cities = (useWatch({ name: citiesName }) as string[]) || [];
    const complexes = (useWatch({ name: complexesName }) as string[]) || [];

    // current demand's decoded shapes
    const shapeList = (useWatch({ name: shapesName }) as TShape[]) || [];

    const [getClosestQuery] = useLazyGetClosestQuery();
    const [getHierarchy] = useLazyGetHierarchyByAreaIdQuery();

    const [zoom, setZoom] = useState<number>(ZOOM_LEVELS.REGION);

    const [mainMarker, setMainMarker] = useState({
        lat: 37.98381,
        lng: 23.727539,
    });

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

    const handleDraw = (s: DrawShape | StopDraw) => {
        if (!s) {
            // clear
            setValue(shapesName, []);
        } else {
            const encoded = drawingToPoints(s);
            setValue(shapesName, [...watch(shapesName), encoded]); // add
        }
    };

    const handleShapeChange = useDebouncedCallback(
        useCallback(
            (oldShape: TShape, newShape: TShape) => {
                const updatedShapes = shapeList.map((shape) =>
                    areShapesEqual(shape, oldShape) ? newShape : shape
                );

                setValue(shapesName, updatedShapes);
            },
            [shapesName, shapeList]
        ),
        100
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

    const handleRegionChange = useCallback(
        (regions: string[]) => {
            setValue(regionsName, regions); // Update form value
        },
        [regionsName]
    );

    const handleMunicipChange = useCallback(
        (municipCodes: string[], lat?: number, lng?: number) => {
            if (lat && lng) {
                updateMainMarkerCoordinates(lat, lng);
                setZoom(ZOOM_LEVELS.MUNICIP);
            }

            setValue(citiesName, municipCodes);
        },
        [citiesName]
    );

    const handleNeighbourChange = useCallback(
        (neighbourCodes: string[], lat?: number, lng?: number) => {
            if (lat && lng) {
                updateMainMarkerCoordinates(lat, lng);
                setZoom(ZOOM_LEVELS.NEIGHB);
            }

            setValue(complexesName, neighbourCodes);
        },
        [complexesName]
    );

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

            <Box>
                <Box height={`calc(100vh - 266px)`} width={1}>
                    <Map
                        key={index}
                        zoom={zoom}
                        search
                        multipleShapes
                        mainMarker={mainMarker}
                        onDraw={handleDraw}
                        onShapeChange={handleShapeChange}
                        onDragEnd={handleMarkerDragEnd}
                        onClick={handleMapClick}
                        onSearchSelect={handleSearchSelect}
                    />
                </Box>
            </Box>

            <Grid container spacing={2} p={1}>
                <Grid item xs={4}>
                    <RegionSelectDemands
                        selectedRegions={regions}
                        onChange={handleRegionChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <MunicipSelectDemands
                        regionCodes={regions}
                        municipCodes={cities}
                        onChange={handleMunicipChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <NeighbourSelectDemands
                        municipCodes={cities}
                        neighbourCodes={complexes}
                        onChange={handleNeighbourChange}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default AreaOfPreference;
