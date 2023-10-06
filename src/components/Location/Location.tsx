import { Divider, Grid, Paper, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import OnlyNumbersInput from "src/components/OnlyNumbers";
import Map, { IMapMarker, IMapCoordinates, IMapAddress } from "../Map/Map";

import { ILocationPOST } from "src/types/location";
import { RegionSelect } from "./RegionSelect";
import { MunicipSelect } from "./MunicipSelect";
import { NeighbourSelect } from "./NeighbourSelect";
import {
    useGetClosestQuery,
    useLazyGetHierarchyByAreaIdQuery,
} from "src/services/location";
import { useTranslation } from "react-i18next";

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
const LocationSection = (props: ILocationSectionProps) => {
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
    const { t } = useTranslation();

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

    const handleChange = (
        setter: any,
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => dispatch(setter(event.target.value));

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

    //
    // Map
    //
    const handleMapClick = (lat: number, lng: number, address: IMapAddress) => {
        if (!lat || !lng) return;

        setOnDragEndCoord({ lat, lng });
        updateMainMarkerCoordinates(lat, lng);

        // update slice
        dispatch(setStreet(address.street));
        dispatch(setNumber(address.number));
        dispatch(setZipCode(address.zipCode));
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
        dispatch(setStreet(address.street));
        dispatch(setNumber(address.number));
        dispatch(setZipCode(address.zipCode));
    };
    const handleSearchSelect = (
        address: IMapAddress,
        lat: number,
        lng: number
    ) => {
        if (!lat || !lng) return;

        setOnDragEndCoord({ lat, lng });
        updateMainMarkerCoordinates(lat, lng);

        // update slice
        dispatch(setStreet(address.street));
        dispatch(setNumber(address.number));
        dispatch(setZipCode(address.zipCode));
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

    return (
        <Paper elevation={10} sx={{ padding: 0.5, overflow: "auto" }}>
            <Box
                sx={{
                    px: 3,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "left",
                }}
            >
                <Typography variant="h6">{t("Location")}</Typography>
            </Box>
            <Divider></Divider>
            <Grid item xs={12} padding={1}>
                <Box display={"flex"} pb={2}>
                    <Box height={`50vh`} width={"100%"}>
                        <Map
                            drawing={false}
                            search
                            mainMarker={mainMarker}
                            onDragEnd={handleMarkerDragEnd}
                            onClick={handleMapClick}
                            onSearchSelect={handleSearchSelect}
                            activeMarker={activeMarker}
                            setActiveMarker={setActiveMarker}
                        />
                    </Box>
                </Box>

                <Grid container spacing={2}>
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

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label={t("Street")}
                            value={street}
                            onChange={(event) => handleChange(setStreet, event)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label={t("Number")}
                            value={number}
                            onChange={(event) => handleChange(setNumber, event)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            label={t("Zip Code")}
                            value={zipCode || ""}
                            onChange={(value) => dispatch(setZipCode(value))}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label={t("Country")}
                            value={country}
                            onChange={(event) =>
                                handleChange(setCountry, event)
                            }
                        />
                    </Grid>
                </Grid>

                <Divider sx={{ mt: 2, mb: 1 }} />

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label={t("Latitude")}
                            value={x || ""}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label={t("Longitude")}
                            value={y || ""}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};
export default LocationSection;
