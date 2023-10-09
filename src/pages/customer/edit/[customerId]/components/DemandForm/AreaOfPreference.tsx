import { Box, Grid } from "@mui/material";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { MunicipSelect } from "src/components/Location/MunicipSelect";
import { NeighbourSelect } from "src/components/Location/NeighbourSelect";
import { RegionSelect } from "src/components/Location/RegionSelect";
import Map, {
    IMapAddress,
    IMapCoordinates,
    IMapMarker,
} from "src/components/Map/Map";
import { DrawShape, ShapeData, StopDraw } from "src/components/Map/types";
import { decodeShape, encodeShape } from "src/components/Map/util";
import {
    useGetClosestQuery,
    useLazyGetHierarchyByAreaIdQuery,
} from "src/services/location";
import { selectShapes, setShapes, addShape } from "src/slices/customer";

interface ILocationSectionProps {
    index: number;
    // redux getters
    cities: string[];
    complexes: string[];
    regions: string[];
    // redux setters
    setCities: ActionCreatorWithPayload<any, string>;
    setComplexes: ActionCreatorWithPayload<any, string>;
    setRegions: ActionCreatorWithPayload<any, string>;
}

const indexedData = (index: number, value: any) => ({
    index,
    value,
});

enum ZOOM_LEVELS {
    REGION = 10,
    MUNICIP = 13,
    NEIGHB = 16,
}

const nullCoord = -1;

export const AreaOfPreference: FC<ILocationSectionProps> = ({
    index,
    cities,
    complexes,
    regions,
    setCities,
    setComplexes,
    setRegions,
}) => {
    const dispatch = useDispatch();

    const allShapes = useSelector(selectShapes); // all demands' shapes
    const shapes = useMemo(
        () => (allShapes && allShapes.length > index && allShapes[index]) || [], // current demand's shapes (by demand index)
        [allShapes, index]
    );
    const shapeData = useMemo(
        () =>
            shapes
                .map((shape) => decodeShape(shape))
                .filter((decoded) => !!decoded) as ShapeData[],
        [shapes] // current demand's decoded shapes
    );

    const [getHierarchy] = useLazyGetHierarchyByAreaIdQuery();

    // Fields
    const [x, setX] = useState<number>();
    const [y, setY] = useState<number>();
    const [zoom, setZoom] = useState<number>(ZOOM_LEVELS.REGION);

    const [activeMarker, setActiveMarker] = useState(null);
    const [mainMarker, setMainMarker] = useState<IMapMarker>({
        lat: x ? x : 37.98381,
        lng: y ? y : 23.727539,
        address: "",
        main: true,
    });
    const [onDragEndCoord, setOnDragEndCoord] = useState<IMapCoordinates>({
        lat: nullCoord,
        lng: nullCoord,
    });

    const { data: closest } = useGetClosestQuery(
        { latitude: onDragEndCoord.lat, longitude: onDragEndCoord.lng },
        {
            skip:
                onDragEndCoord.lat === nullCoord &&
                onDragEndCoord.lng === nullCoord,
        }
    );

    useEffect(() => {
        if (!closest || index === null || index === undefined) return;

        // update slice
        if (closest.level === 2) {
            setZoom(ZOOM_LEVELS.MUNICIP);

            dispatch(
                setRegions(indexedData(index, [closest.parentID.toString()]))
            );
            dispatch(
                setCities(indexedData(index, [closest.areaID.toString()]))
            );
        } else if (closest.level === 3) {
            setZoom(ZOOM_LEVELS.NEIGHB);

            const neighbId = closest.areaID;
            const municipId = closest.parentID;

            dispatch(setComplexes(indexedData(index, [neighbId.toString()])));
            dispatch(setCities(indexedData(index, [municipId.toString()])));

            // For region
            getHierarchy(municipId)
                .unwrap()
                .then((municipHierarchy) => {
                    const regionId = municipHierarchy.parentID;
                    if (!regionId) return;

                    dispatch(
                        setRegions(indexedData(index, [regionId.toString()]))
                    );
                })
                .catch((reason) => console.log("getHierarchy: ", reason));
        }
    }, [index, closest]);

    const handleDraw = useCallback(
        (s: DrawShape | StopDraw) => {
            if (!s) dispatch(setShapes(indexedData(index, []))); // clear
            else {
                const encoded = encodeShape(s);
                dispatch(addShape(indexedData(index, encoded)));
            }
        },
        [index, shapes]
    );
    const handleDrag = useCallback(
        (oldShape: DrawShape, newShape: DrawShape) => {
            const encodedOldShape = encodeShape(oldShape);
            const encodedNewShape = encodeShape(newShape);

            const updatedShapes = shapes.map((shapeString) =>
                shapeString === encodedOldShape ? encodedNewShape : shapeString
            );

            dispatch(setShapes(indexedData(index, updatedShapes)));
        },
        [index, shapes]
    );

    const updateMainMarkerCoordinates = (lat: number, lng: number) => {
        let newMarker = mainMarker;
        newMarker.lat = lat;
        newMarker.lng = lng;
        setMainMarker(newMarker);

        // show x, y
        setX(lat);
        setY(lng);
    };

    //
    // Map
    //
    const handleMapClick = (lat: number, lng: number, address: IMapAddress) => {
        if (!lat || !lng) return;

        setOnDragEndCoord({ lat, lng });
        updateMainMarkerCoordinates(lat, lng);
    };
    const handleMarkerDragEnd = (
        marker: IMapMarker,
        newLat: number,
        newLng: number,
        address: IMapAddress
    ) => {
        if (!marker || marker !== mainMarker) return; // we only care about mainMarker drag

        setOnDragEndCoord({ lat: newLat, lng: newLng });
        updateMainMarkerCoordinates(newLat, newLng);

        // update slice
    };
    const handleSearchSelect = (
        address: IMapAddress,
        lat: number,
        lng: number
    ) => {
        if (!lat || !lng) return;

        setOnDragEndCoord({ lat, lng });
        updateMainMarkerCoordinates(lat, lng);
    };

    const handleRegionChange = useCallback(
        (regionCode: string, lat: number, lng: number) => {
            updateMainMarkerCoordinates(lat, lng);
            setZoom(ZOOM_LEVELS.REGION);

            // update slice
            dispatch(setRegions(indexedData(index, [regionCode])));
        },
        [index]
    );
    const handleMunicipChange = useCallback(
        (municipCode: string, lat: number, lng: number) => {
            updateMainMarkerCoordinates(lat, lng);
            setZoom(ZOOM_LEVELS.MUNICIP);

            // update slice
            dispatch(setCities(indexedData(index, [municipCode])));
        },
        [index]
    );
    const handleNeighbourChange = useCallback(
        (neighbourCode: string, lat: number, lng: number) => {
            updateMainMarkerCoordinates(lat, lng);
            setZoom(ZOOM_LEVELS.NEIGHB);

            // update slice
            dispatch(setComplexes(indexedData(index, [neighbourCode])));
        },
        [index]
    );

    const regionCode = useMemo(() => regions.at(index), [regions, index]);
    const cityCode = useMemo(() => cities.at(index), [cities, index]);
    const complexCode = useMemo(() => complexes.at(index), [complexes, index]);

    console.log("r: ", regionCode, " c: ", cityCode, " co: ", complexCode);

    return (
        <Grid item xs={12} padding={1}>
            <Box height={`calc(100vh - 266px)`} width={"100%"}>
                <Map
                    key={index}
                    zoom={zoom}
                    search
                    multipleShapes
                    mainMarker={mainMarker}
                    shapes={shapeData}
                    onDraw={handleDraw}
                    onDrag={handleDrag}
                    onDragEnd={handleMarkerDragEnd}
                    onClick={handleMapClick}
                    hideMainMarker={true}
                    onSearchSelect={handleSearchSelect}
                    activeMarker={activeMarker}
                    setActiveMarker={setActiveMarker}
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
    );
};
