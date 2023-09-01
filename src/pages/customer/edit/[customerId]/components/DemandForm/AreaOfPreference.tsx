import { Box, Grid, TextField } from "@mui/material";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useEffect, useMemo, useState } from "react";
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
import OnlyNumbersInput from "src/components/OnlyNumbers";
import {
    useGetClosestQuery,
    useLazyGetHierarchyByAreaIdQuery,
} from "src/services/location";
import { selectShape, setShape } from "src/slices/customer";
import { ILocationPOST } from "src/types/location";

interface ILocationSectionProps extends ILocationPOST {
    // redux setters

    setStreet: ActionCreatorWithPayload<any, string>;
    setNumber: ActionCreatorWithPayload<any, string>;
    setCity: ActionCreatorWithPayload<any, string>;
    setZipCode: ActionCreatorWithPayload<any, string>;
    setComplex: ActionCreatorWithPayload<any, string>;
    setRegion: ActionCreatorWithPayload<any, string>;
    setCountry: ActionCreatorWithPayload<any, string>;
    setLatitude: ActionCreatorWithPayload<any, string>;
    setLongitude: ActionCreatorWithPayload<any, string>;
}
export const AreaOfPreference = (props: ILocationSectionProps) => {
    const {
        street,
        number,
        city,
        zipCode,
        complex,
        region,
        country,
        lat,
        lng,

        setStreet,
        setNumber,
        setCity,
        setZipCode,
        setComplex,
        setRegion,
        setCountry,
        setLatitude,
        setLongitude,
    } = props;
    const dispatch = useDispatch();

    const shape = useSelector(selectShape);
    const shapeData = useMemo(
        () => (shape ? decodeShape(shape) : null),
        [shape]
    );
    const handleDraw = (s: DrawShape | StopDraw) => {
        const encoded = s ? encodeShape(s) : null;
        dispatch(setShape(encoded));
    };
    const [getHierarchy] = useLazyGetHierarchyByAreaIdQuery();

    // Fields
    const [x, setX] = useState<number>(lat || -1);
    const [y, setY] = useState<number>(lng || -1);

    const [activeMarker, setActiveMarker] = useState(null);
    const [mainMarker, setMainMarker] = useState<IMapMarker>({
        lat: lat ? lat : 37.98381,
        lng: lng ? lng : 23.727539,
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

    const updateMainMarkerCoordinates = (lat: number, lng: number) => {
        let newMarker = mainMarker;
        newMarker.lat = lat;
        newMarker.lng = lng;
        setMainMarker(newMarker);

        // update slice
        dispatch(setLatitude(lat));
        dispatch(setLongitude(lng));

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
    useEffect(() => {
        if (!closest) return;

        // update slice
        if (closest.level === 2) {
            dispatch(setRegion(closest.parentID.toString()));
            dispatch(setCity(closest.areaID.toString()));
        } else if (closest.level === 3) {
            const neighbId = closest.areaID;
            const municipId = closest.parentID;

            dispatch(setComplex(neighbId.toString()));
            dispatch(setCity(municipId.toString()));

            // For region
            getHierarchy(municipId)
                .unwrap()
                .then((municipHierarchy) => {
                    const regionId = municipHierarchy.parentID;
                    if (!regionId) return;

                    dispatch(setRegion(regionId.toString()));
                })
                .catch((reason) => console.log("getHierarchy: ", reason));
        }
    }, [closest]);
    const handleRegionChange = (
        regionCode: string,
        lat: number,
        lng: number
    ) => {
        updateMainMarkerCoordinates(lat, lng);

        // update slice
        dispatch(setRegion(regionCode));
    };
    const handleMunicipChange = (
        municipCode: string,
        lat: number,
        lng: number
    ) => {
        updateMainMarkerCoordinates(lat, lng);

        // update slice
        dispatch(setCity(municipCode));
    };
    const handleNeighbourChange = (
        neighbourCode: string,
        lat: number,
        lng: number
    ) => {
        updateMainMarkerCoordinates(lat, lng);

        // update slice
        dispatch(setComplex(neighbourCode));
    };
    return (
        <Grid item xs={12} padding={1}>
            <Box height={`calc(100vh - 266px)`} width={"100%"}>
                <Map
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
                                regionCode={region}
                                onChange={handleRegionChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <MunicipSelect
                                regionCode={region}
                                municipCode={city}
                                onChange={handleMunicipChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <NeighbourSelect
                                municipCode={city}
                                neighbourCode={complex}
                                onChange={handleNeighbourChange}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

// import { Box } from "@mui/material";
// import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
// import { useMemo, useState } from "react";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import Map, {
//     IMapAddress,
//     IMapCoordinates,
//     IMapMarker,
// } from "src/components/Map/Map";
// import { DrawShape, StopDraw } from "src/components/Map/types";
// import { decodeShape, encodeShape } from "src/components/Map/util";
// import { useGetClosestQuery } from "src/services/location";
// import { selectShape, setShape } from "src/slices/customer";
// import { ILocationPOST } from "src/types/location";
// interface ILocationSectionProps extends ILocationPOST {
//     // redux setters

//     setLatitude: ActionCreatorWithPayload<any, string>;
//     setLongitude: ActionCreatorWithPayload<any, string>;
// }
// export const AreaOfPreference = (props: ILocationSectionProps) => {
//     const { lat, lng, setLatitude, setLongitude } = props;
//     const dispatch = useDispatch();

//     const shape = useSelector(selectShape);
//     const shapeData = useMemo(
//         () => (shape ? decodeShape(shape) : null),
//         [shape]
//     );
//     const [x, setX] = useState<number>(lat || -1);
//     const [y, setY] = useState<number>(lng || -1);
//     const [activeMarker, setActiveMarker] = useState(null);
//     const [mainMarker, setMainMarker] = useState<IMapMarker>({
//         lat: lat ? lat : 37.98381,
//         lng: lng ? lng : 23.727539,
//         address: "",
//         main: true,
//     });
//     const nullCoord = -1;
//     const [onDragEndCoord, setOnDragEndCoord] = useState<IMapCoordinates>({
//         lat: nullCoord,
//         lng: nullCoord,
//     });

//     const closest = useGetClosestQuery(
//         { latitude: onDragEndCoord.lat, longitude: onDragEndCoord.lng },
//         {
//             skip:
//                 onDragEndCoord.lat === nullCoord &&
//                 onDragEndCoord.lng === nullCoord,
//         }
//     ).data;
//     const updateMainMarkerCoordinates = (lat: number, lng: number) => {
//         let newMarker = mainMarker;
//         newMarker.lat = lat;
//         newMarker.lng = lng;
//         setMainMarker(newMarker);

//         // update slice
//         dispatch(setLatitude(lat));
//         dispatch(setLongitude(lng));

//         // show x, y
//         setX(lat);
//         setY(lng);
//     };
//     const handleDraw = (s: DrawShape | StopDraw) => {
//         const encoded = s ? encodeShape(s) : null;
//         dispatch(setShape(encoded));
//     };
//     const handleMapClick = (lat: number, lng: number, address: IMapAddress) => {
//         if (!lat || !lng) return;

//         setOnDragEndCoord({ lat, lng });
//         updateMainMarkerCoordinates(lat, lng);
//     };
//     const handleSearchSelect = (
//         address: IMapAddress,
//         lat: number,
//         lng: number
//     ) => {
//         if (!lat || !lng) return;

//         setOnDragEndCoord({ lat, lng });
//         updateMainMarkerCoordinates(lat, lng);
//     };
//     return (
//         <Box height={`calc(100vh - 266px)`} width={"100%"}>
//             <Map
//                 zoom={12}
//                 drawing
//                 search
//                 shape={shapeData || undefined}
//                 onDraw={handleDraw}
//                 onClick={handleMapClick}
//                 onSearchSelect={handleSearchSelect}
//                 activeMarker={null}
//                 setActiveMarker={() => {}}
//             />
//         </Box>
//     );
// };
