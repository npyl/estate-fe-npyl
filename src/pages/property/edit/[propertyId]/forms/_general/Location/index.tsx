import { Divider, Grid, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useState } from "react";
import Map, { IMapAddress, IMapMarker } from "src/components/Map/Map";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { RHFOnlyNumbers, RHFTextField } from "src/components/hook-form";
import Panel from "src/components/Panel";
import DistancesSection from "./Distances/Distances";
import { MunicipSelect, NeighbourSelect, RegionSelect } from "./Select";
import LocationDisplay from "./LocationDisplay";
import useClosest from "./useClosest";

const LocationSection = () => {
    const { watch, setValue } = useFormContext();
    const { t } = useTranslation();

    const [map, setMap] = useState<google.maps.Map>();

    const lat = watch("location.lat");
    const lng = watch("location.lng");

    const mainMarker = {
        lat,
        lng,
    };

    const { getClosest } = useClosest();

    const updateMainMarkerCoordinates = useCallback(
        (lat: number, lng: number) => {
            setValue("location.lat", lat);
            setValue("location.lng", lng);
        },
        []
    );

    //
    // Map
    //
    const handleMapClick = useCallback(
        (lat: number, lng: number, address: IMapAddress) => {
            if (!lat || !lng) return;

            getClosest(lat, lng);
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
            getClosest(newLat, newLng);
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

            getClosest(lat, lng);
            updateMainMarkerCoordinates(lat, lng);

            // update
            setValue("location.street", address.street);
            setValue("location.number", address.number);
            setValue("location.zipCode", address.zipCode);
        },
        []
    );

    return (
        <>
            <Panel label={t("Location")}>
                <Box display={"flex"} pb={2}>
                    <Box height={`50vh`} width={"100%"}>
                        <Map
                            onReady={setMap}
                            search
                            zoom={10}
                            drawing={false}
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
                                    onChange={updateMainMarkerCoordinates}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <MunicipSelect
                                    onChange={updateMainMarkerCoordinates}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <NeighbourSelect
                                    onChange={updateMainMarkerCoordinates}
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

                    <Grid item xs={12} justifyContent="center" display="flex">
                        <LocationDisplay />
                    </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Stack spacing={2} direction="row">
                    <TextField
                        fullWidth
                        label={t("Latitude")}
                        value={lat ? parseFloat(lat).toFixed(4) : ""}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        fullWidth
                        label={t("Longitude")}
                        value={lng ? parseFloat(lng).toFixed(4) : ""}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Stack>
            </Panel>

            <DistancesSection map={map} />
        </>
    );
};

export default LocationSection;
