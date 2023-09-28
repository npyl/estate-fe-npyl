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
import { DrawShape, StopDraw } from "src/components/Map/types";
import { decodeShape, encodeShape } from "src/components/Map/util";
import {
    useGetClosestQuery,
    useLazyGetHierarchyByAreaIdQuery,
} from "src/services/location";
import { selectShape, setShape } from "src/slices/customer";

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

    const shapes = useSelector(selectShape); // returns every demand's shape
    const shape = useMemo(
        () => shapes && shapes.length && shapes[index],
        [shapes, index]
    );
    const shapeData = useMemo(
        () => (shape ? decodeShape(shape) : null),
        [shape]
    );

    const [getHierarchy] = useLazyGetHierarchyByAreaIdQuery();

    // Fields
    const [x, setX] = useState<number>();
    const [y, setY] = useState<number>();

    const [activeMarker, setActiveMarker] = useState(null);
    const [mainMarker, setMainMarker] = useState<IMapMarker>({
        lat: x ? x : 37.98381,
        lng: y ? y : 23.727539,
        address: "",
        main: true,
    });
    const nullCoord = -1;
    const [onDragEndCoord, setOnDragEndCoord] = useState<IMapCoordinates>({
        lat: nullCoord,
        lng: nullCoord,
    });
    const closest = useGetClosestQuery(
        { latitude: onDragEndCoord.lat, longitude: onDragEndCoord.lng },
        {
            skip:
                onDragEndCoord.lat === nullCoord &&
                onDragEndCoord.lng === nullCoord,
        }
    ).data;

    useEffect(() => {
        if (!closest || !index) return;

        // update slice
        if (closest.level === 2) {
            dispatch(
                setRegions(indexedData(index, [closest.parentID.toString()]))
            );
            dispatch(
                setCities(indexedData(index, [closest.areaID.toString()]))
            );
        } else if (closest.level === 3) {
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
            const encoded = s ? encodeShape(s) : null;
            dispatch(setShape(indexedData(index, encoded)));
        },
        [index]
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

        // update slice
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

    const handleRegionChange = (
        regionCode: string,
        lat: number,
        lng: number
    ) => {
        updateMainMarkerCoordinates(lat, lng);

        // update slice
        dispatch(setRegions(indexedData(index, [regionCode])));
    };
    const handleMunicipChange = (
        municipCode: string,
        lat: number,
        lng: number
    ) => {
        updateMainMarkerCoordinates(lat, lng);

        // update slice
        dispatch(setCities(indexedData(index, [municipCode])));
    };
    const handleNeighbourChange = (
        neighbourCode: string,
        lat: number,
        lng: number
    ) => {
        updateMainMarkerCoordinates(lat, lng);

        // update slice
        dispatch(setComplexes(indexedData(index, [neighbourCode])));
    };

    return (
        <Grid item xs={12} padding={1}>
            <Box height={`calc(100vh - 266px)`} width={"100%"}>
                <Map
                    key={index}
                    zoom={12}
                    drawing
                    search
                    mainMarker={mainMarker}
                    shape={shapeData || undefined}
                    onDraw={handleDraw}
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
                                regionCode={regions[index] || ""}
                                onChange={handleRegionChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <MunicipSelect
                                regionCode={regions[index] || ""}
                                municipCode={cities[index] || ""}
                                onChange={handleMunicipChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <NeighbourSelect
                                municipCode={cities[index] || ""}
                                neighbourCode={complexes[index] || ""}
                                onChange={handleNeighbourChange}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
