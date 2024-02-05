import { Divider, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect, useMemo, useState } from "react";
import Map, { IMapMarker, IMapCoordinates, IMapAddress } from "../Map/Map";
import { RegionSelect } from "./RegionSelect";
import { MunicipSelect } from "./MunicipSelect";
import { NeighbourSelect } from "./NeighbourSelect";
import {
    useGetClosestQuery,
    useLazyGetHierarchyByAreaIdQuery,
} from "src/services/location";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { RHFOnlyNumbers, RHFTextField } from "../hook-form";
import Panel from "../Panel";

const nullCoord = -1;

// const test = watch("location.zipCode");
// console.log("test: ", test);

const LocationSection = () => {
    const { watch, setValue } = useFormContext();
    const { t } = useTranslation();

    const [getHierarchy] = useLazyGetHierarchyByAreaIdQuery();

    const lat = watch("location.lat");
    const lng = watch("location.lng");
    const region = watch("location.region");
    const city = watch("location.city");
    const complex = watch("location.complex");

    const mainMarker = useMemo<IMapMarker>(
        () => ({
            lat,
            lng,
        }),
        [lat, lng]
    );

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

    const updateMainMarkerCoordinates = useCallback(
        (lat: number, lng: number) => {
            setValue("location.lat", lat);
            setValue("location.lng", lng);
        },
        []
    );

    const handleRegionChange = useCallback(
        (regionCode: string, lat: number, lng: number) => {
            updateMainMarkerCoordinates(lat, lng);

            // update
            setValue("location.region", regionCode);
        },
        []
    );
    const handleMunicipChange = useCallback(
        (municipCode: string, lat: number, lng: number) => {
            updateMainMarkerCoordinates(lat, lng);

            // update
            setValue("location.city", municipCode);
        },
        []
    );
    const handleNeighbourChange = useCallback(
        (neighbourCode: string, lat: number, lng: number) => {
            updateMainMarkerCoordinates(lat, lng);

            // update
            setValue("location.complex", neighbourCode);
        },
        []
    );

    //
    // Map
    //
    const handleMapClick = useCallback(
        (lat: number, lng: number, address: IMapAddress) => {
            if (!lat || !lng) return;

            setOnDragEndCoord({ lat, lng });
            updateMainMarkerCoordinates(lat, lng);

            // update
            setValue("location.street", address.street);
            setValue("location.number", address.number);
            setValue("location.zipCode", address.zipCode);
        },
        []
    );

    const handleMarkerDragEnd = useCallback(
        (
            marker: IMapMarker,
            newLat: number,
            newLng: number,
            address: IMapAddress
        ) => {
            setOnDragEndCoord({ lat: newLat, lng: newLng });
            updateMainMarkerCoordinates(newLat, newLng);

            // update
            setValue("location.street", address.street);
            setValue("location.number", address.number);
            setValue("location.zipCode", address.zipCode);
        },
        []
    );

    const handleSearchSelect = useCallback(
        (address: IMapAddress, lat: number, lng: number) => {
            if (!lat || !lng) return;

            setOnDragEndCoord({ lat, lng });
            updateMainMarkerCoordinates(lat, lng);

            // update
            setValue("location.street", address.street);
            setValue("location.number", address.number);
            setValue("location.zipCode", address.zipCode);
        },
        []
    );

    useEffect(() => {
        if (!closest) return;

        // update slice
        if (closest.level === 2) {
            setValue("location.region", closest.parentID.toString());
            setValue("location.city", closest.areaID.toString());
        } else if (closest.level === 3) {
            const neighbId = closest.areaID;
            const municipId = closest.parentID;

            setValue("location.city", neighbId.toString());
            setValue("location.complex", municipId.toString());

            // For region
            getHierarchy(municipId)
                .unwrap()
                .then((municipHierarchy) => {
                    const regionId = municipHierarchy.parentID;
                    if (!regionId) return;

                    setValue("location.region", regionId.toString());
                })
                .catch((reason) => console.log("getHierarchy: ", reason));
        }
    }, [closest]);

    return (
        <Panel label={t("Location")}>
            <Divider />
            <Box display={"flex"} pb={2}>
                <Box height={`50vh`} width={"100%"}>
                    <Map
                        drawing={false}
                        search
                        markers={[mainMarker]}
                        mainMarker={mainMarker}
                        onDragEnd={handleMarkerDragEnd}
                        onClick={handleMapClick}
                        onSearchSelect={handleSearchSelect}
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
                    <RHFTextField
                        fullWidth
                        label={t("Street")}
                        name="location.street"
                    />
                </Grid>
                <Grid item xs={6}>
                    <RHFTextField
                        fullWidth
                        label={t("Number")}
                        name="location.number"
                    />
                </Grid>
                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        label={t("Zip Code")}
                        name="location.zipCode"
                    />
                </Grid>
                <Grid item xs={6}>
                    <RHFTextField
                        fullWidth
                        label={t("Country")}
                        name="location.country"
                    />
                </Grid>
            </Grid>

            <Divider sx={{ mt: 2, mb: 1 }} />

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label={t("Latitude")}
                        value={lat ? parseFloat(lat).toFixed(4) : ""}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label={t("Longitude")}
                        value={lng ? parseFloat(lng).toFixed(4) : ""}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
            </Grid>
        </Panel>
    );
};
export default LocationSection;
