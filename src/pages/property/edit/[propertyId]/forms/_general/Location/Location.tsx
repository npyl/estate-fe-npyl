import { Divider, Grid, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useMemo, useState } from "react";
import Map, { IMapAddress, IMapMarker } from "src/components/Map/Map";
import {
    useLazyGetClosestQuery,
    useLazyGetHierarchyByAreaIdQuery,
} from "src/services/location";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { RHFOnlyNumbers, RHFTextField } from "src/components/hook-form";
import Panel from "src/components/Panel";
import DistancesSection from "./Distances/Distances";
import {
    MunicipSelect,
    NeighbourSelect,
    RegionSelect,
} from "src/components/Location";

const LocationSection = () => {
    const { watch, setValue } = useFormContext();
    const { t } = useTranslation();

    const [map, setMap] = useState<google.maps.Map>();

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

    const [getClosestQuery] = useLazyGetClosestQuery();

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

    const getClosest = useCallback(async (lat: number, lng: number) => {
        const { data: closest, error } = await getClosestQuery({
            latitude: lat,
            longitude: lng,
        });

        if (!closest) {
            console.error("Error getting closest: ", error);
            return;
        }

        // update slice
        if (closest.level === 2) {
            setValue("location.region", closest.parentID.toString());
            setValue("location.city", closest.areaID.toString());
        } else if (closest.level === 3) {
            const neighbId = closest.areaID;
            const municipId = closest.parentID;

            setValue("location.complex", neighbId.toString());
            setValue("location.city", municipId.toString());

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
    }, []);

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
