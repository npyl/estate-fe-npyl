import { Divider, Grid, Stack, TextField } from "@mui/material";
import { Box } from "@mui/material";
import { useCallback, useState } from "react";
import Map, { IMapAddress, IMapMarker } from "@/components/Map";
import { useTranslation } from "react-i18next";
import { useFormContext, useWatch } from "react-hook-form";
import { RHFOnlyNumbers, RHFTextField } from "src/components/hook-form";
import Panel from "src/components/Panel";
import DistancesSection from "./Distances";
import { MunicipSelect, NeighbourSelect, RegionSelect } from "./Select";
import LocationDisplay from "./LocationDisplay";
import useClosest from "./useClosest";
import useToggle from "@/hooks/useToggle";
import PinLock from "./PinLock";

const CLEAN_DISTANCES = {
    schools: "",
    supermarket: "",
    cafeRestaurant: "",
    hospital: "",
    airport: "",
    sea: "",
    publicTransport: "",
    entertainment: "",
};

const LocationSection = () => {
    const { setValue } = useFormContext();
    const { t } = useTranslation();

    const [map, setMap] = useState<google.maps.Map>();

    const [isPinLocked, togglePinLock, setPinLocked] = useToggle(false);

    const lat = useWatch({ name: "location.lat" });
    const lng = useWatch({ name: "location.lng" });

    const center: IMapMarker = {
        lat,
        lng,
    };

    const { getClosest } = useClosest();

    const generalUpdate = useCallback(
        (lat: number, lng: number, address?: IMapAddress) => {
            if (!lat || !lng) return;

            getClosest(lat, lng);

            // Coordinates
            setValue("location.lat", lat, { shouldDirty: true });
            setValue("location.lng", lng, { shouldDirty: true });

            // Address
            if (address) {
                setValue("location.street", address.street, {
                    shouldDirty: true,
                });
                setValue("location.number", address.number, {
                    shouldDirty: true,
                });
                setValue("location.zipCode", address.zipCode, {
                    shouldDirty: true,
                });
            }

            // Distances
            setValue("distances", CLEAN_DISTANCES, { shouldDirty: true });

            // Lock pin
            setPinLocked(true);
        },
        []
    );

    // INFO: when pin is locked pass undefined which skips unecessary calculations inside Map component
    const onClickMethod = isPinLocked ? undefined : generalUpdate;
    const onDragMethod = isPinLocked ? undefined : generalUpdate;
    const onSearchMethod = isPinLocked ? undefined : generalUpdate;
    const onChangeMethod = isPinLocked ? undefined : generalUpdate;

    return (
        <>
            <Panel label={t("Location")}>
                <Box display="flex" pb={2}>
                    <Box height="50vh" width="100%">
                        <Map
                            onReady={setMap}
                            search={!isPinLocked}
                            zoom={10}
                            drawing={false}
                            rightTop={
                                <PinLock
                                    locked={isPinLocked}
                                    onToggle={togglePinLock}
                                />
                            }
                            mainMarker
                            center={center}
                            onMainMarkerDrag={onDragMethod}
                            onClick={onClickMethod}
                            onSearchSelect={onSearchMethod}
                        />
                    </Box>
                </Box>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container direction={"row"} spacing={2}>
                            <Grid item xs={4}>
                                <RegionSelect onChange={onChangeMethod} />
                            </Grid>
                            <Grid item xs={4}>
                                <MunicipSelect onChange={onChangeMethod} />
                            </Grid>
                            <Grid item xs={4}>
                                <NeighbourSelect onChange={onChangeMethod} />
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
                            separateThousands={false}
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
