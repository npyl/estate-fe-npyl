import { Box, Divider, Grid, Typography } from "@mui/material";

import { FC, useCallback, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import MunicipSelect from "src/components/Location/MunicipSelect";
import NeighbourSelect from "src/components/Location/NeighbourSelect";
import RegionSelect from "src/components/Location/RegionSelect";

import Map, { IMapAddress, IMapMarker } from "src/components/Map/Map";
import { DrawShape, ShapeData, StopDraw } from "src/components/Map/types";
import { decodeShape, encodeShape } from "src/components/Map/util";
import {
    useLazyGetClosestQuery,
    useLazyGetHierarchyByAreaIdQuery,
} from "src/services/location";
import { IDemandFiltersPOST, IDemandPOST } from "src/types/demand";
import { useDebouncedCallback } from "use-debounce";

interface ILocationSectionProps {
    index: number;
    onGetDemandName: (k: keyof IDemandPOST) => any;
    onGetDemandFilterName: (k: keyof IDemandFiltersPOST) => any;
}

enum ZOOM_LEVELS {
    REGION = 10,
    MUNICIP = 13,
    NEIGHB = 16,
}

const AreaOfPreference: FC<ILocationSectionProps> = ({
    index,
    onGetDemandName,
    onGetDemandFilterName,
}) => {
    const { watch, setValue } = useFormContext();
    const { t } = useTranslation();
    const { regionsName, citiesName, complexesName, shapesName } = useMemo(
        () => ({
            regionsName: onGetDemandFilterName("regions"),
            citiesName: onGetDemandFilterName("cities"),
            complexesName: onGetDemandFilterName("complexes"),
            shapesName: onGetDemandName("shapes"),
        }),
        [onGetDemandName, onGetDemandFilterName]
    );

    const regions = (watch(regionsName) as string[]) || [];
    const cities = (watch(citiesName) as string[]) || [];
    const complexes = (watch(complexesName) as string[]) || [];
    const shapes = (watch(shapesName) as string[]) || [];

    const shapeData = useMemo(
        () =>
            shapes
                .map((shape) => decodeShape(shape))
                .filter((decoded) => !!decoded) as ShapeData[],
        [shapes] // current demand's decoded shapes
    );

    const [getClosestQuery] = useLazyGetClosestQuery();
    const [getHierarchy] = useLazyGetHierarchyByAreaIdQuery();

    // Fields

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
                    .catch((reason) => console.log("getHierarchy: ", reason));
            }
        },
        [regionsName, citiesName, complexesName]
    );

    const handleDraw = (s: DrawShape | StopDraw) => {
        if (!s) setValue(shapesName, []); // clear
        else {
            const encoded = encodeShape(s);
            setValue(shapesName, [...watch(shapesName), encoded]); // add
        }
    };
    const handleShapeChange = useDebouncedCallback(
        useCallback(
            (encodedOldShape: string, encodedNewShape: string) => {
                const updatedShapes = shapes.map((shapeString) =>
                    shapeString === encodedOldShape
                        ? encodedNewShape
                        : shapeString
                );

                setValue(shapesName, updatedShapes);
            },
            [shapesName, shapes]
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
    const handleMapClick = (lat: number, lng: number, address: IMapAddress) => {
        if (!lat || !lng) return;

        getClosest(lat, lng);
        updateMainMarkerCoordinates(lat, lng);
    };
    const handleMarkerDragEnd = (
        marker: IMapMarker,
        newLat: number,
        newLng: number,
        address: IMapAddress
    ) => {
        if (!marker || marker !== mainMarker) return; // we only care about mainMarker drag

        getClosest(newLat, newLng);
        updateMainMarkerCoordinates(newLat, newLng);
    };
    const handleSearchSelect = (
        address: IMapAddress,
        lat: number,
        lng: number
    ) => {
        if (!lat || !lng) return;

        getClosest(lat, lng);
        updateMainMarkerCoordinates(lat, lng);
    };

    const handleRegionChange = useCallback(
        (regionCode: string, lat: number, lng: number) => {
            updateMainMarkerCoordinates(lat, lng);
            setZoom(ZOOM_LEVELS.REGION);

            // update
            setValue(regionsName, [regionCode]);
        },
        [regionsName]
    );
    const handleMunicipChange = useCallback(
        (municipCode: string, lat: number, lng: number) => {
            updateMainMarkerCoordinates(lat, lng);
            setZoom(ZOOM_LEVELS.MUNICIP);

            // update
            setValue(citiesName, [municipCode]);
        },
        [citiesName]
    );
    const handleNeighbourChange = useCallback(
        (neighbourCode: string, lat: number, lng: number) => {
            updateMainMarkerCoordinates(lat, lng);
            setZoom(ZOOM_LEVELS.NEIGHB);

            // updates
            setValue(complexesName, [neighbourCode]);
        },
        [complexesName]
    );

    // TODO: support multiple?
    const regionCode = useMemo(() => regions?.at(0) || "", [regions]);
    const cityCode = useMemo(() => cities?.at(0) || "", [cities]);
    const complexCode = useMemo(() => complexes.at(0) || "", [complexes]);

    return (
        <>
            <Divider
                style={{
                    width: "100%",
                }}
            />
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
            <Grid item xs={12} padding={1} marginBottom={2}>
                <Box height={`calc(100vh - 266px)`} width={"100%"}>
                    <Map
                        key={index}
                        zoom={zoom}
                        search
                        multipleShapes
                        mainMarker={mainMarker}
                        shapes={shapeData}
                        onDraw={handleDraw}
                        onShapeChange={handleShapeChange}
                        onDragEnd={handleMarkerDragEnd}
                        onClick={handleMapClick}
                        onSearchSelect={handleSearchSelect}
                    />
                </Box>
                <Grid container spacing={2} padding={1} paddingTop={3}>
                    <Grid item xs={12}>
                        <Grid container direction={"row"} spacing={2}>
                            <Grid item xs={4}>
                                <RegionSelect
                                    regionCode={regionCode || ""}
                                    onChange={handleRegionChange}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <MunicipSelect
                                    regionCode={regionCode || ""}
                                    municipCode={cityCode || ""}
                                    onChange={handleMunicipChange}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <NeighbourSelect
                                    municipCode={cityCode || ""}
                                    neighbourCode={complexCode || ""}
                                    onChange={handleNeighbourChange}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default AreaOfPreference;
