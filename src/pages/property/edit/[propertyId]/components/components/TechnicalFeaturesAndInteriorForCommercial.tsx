import { Checkbox, Grid, MenuItem, Paper, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { Box } from "@mui/system";

import { useDispatch, useSelector } from "react-redux";
import { useAllCustomersQuery } from "src/services/customers";
import {
    selectAlarmSystem,
    selectBright,
    selectConsideration,
    selectCoverageFactor,
    selectDisplayWindowsLength,
    selectDoubleFrontage,
    selectElectricCarChargingFacilities,
    selectEntrances,
    selectFacadeLength,
    selectFalseCeiling,
    selectFireplace,
    selectFloorToAreaRatio,
    selectFloorType,
    selectFrameType,
    selectFurnished,
    selectInclination,
    selectLoadingUnloadingElevator,
    selectLuxurious,
    selectPainted,
    selectPaneGlassType,
    selectPetsAllowed,
    selectReception,
    selectSafetyDoor,
    selectSatelliteTV,
    selectWindowScreens,
    selectWiring,
    selectWithEquipment,
    setAlarmSystem,
    setBright,
    setDisplayWindowsLength,
    setDoubleFrontage,
    setElectricCarChargingFacilities,
    setEntrances,
    setFireplace,
    setFloorType,
    setLoadingUnloadingElevator,
    setLuxurious,
    setPainted,
    setPetsAllowed,
    setReception,
    setSafetyDoor,
    setSatelliteTV,
    setWindowScreens,
    setWiring,
} from "src/slices/property";

import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";

import { useState } from "react";
import { useAllUsersQuery } from "src/services/user";
import { useGlobals } from "src/hooks/useGlobals";

import CustomNumberField from "./componentsFields/OnlyNumbersWithDot";
import { useTranslation } from "react-i18next";
import OnlyNumbersInput from "src/components/OnlyNumbers";

const TechnicalFeaturesAndInteriorForCommercialSection: React.FC<any> = (
    props
) => {
    const { t } = useTranslation();
    const data = useGlobals();

    const enums: IGlobalProperty = data?.property as IGlobalProperty;
    const details = enums?.details as IGlobalPropertyDetails;
    const dispatch = useDispatch();

    const entrances = useSelector(selectEntrances);
    const displayWindowsLength = useSelector(selectDisplayWindowsLength);
    const safetyDoor = useSelector(selectSafetyDoor);
    const alarmSystem = useSelector(selectAlarmSystem);
    const painted = useSelector(selectPainted);
    const windowScreens = useSelector(selectWindowScreens);
    const fireplace = useSelector(selectFireplace);
    const bright = useSelector(selectBright);
    const luxurious = useSelector(selectLuxurious);
    const electricCarChargingFacilities = useSelector(
        selectElectricCarChargingFacilities
    );
    const reception = useSelector(selectReception);
    const petsAllowed = useSelector(selectPetsAllowed);
    const satelliteTV = useSelector(selectSatelliteTV);
    const wiring = useSelector(selectWiring);
    const loadingUnloadingElevator = useSelector(
        selectLoadingUnloadingElevator
    );
    const doubleFrontage = useSelector(selectDoubleFrontage);

    const floorType = useSelector(selectFloorType) || "";

    if (!enums) return null;

    const handleChange = (
        setter: any,
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        dispatch(setter(event.target.value));
    };

    return (
        <Paper elevation={10} sx={{ padding: 0.5, overflow: "auto" }}>
            <Box
                sx={{
                    px: 3,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Typography variant="h6">
                    {t("Technical Features And Interior")}
                </Typography>
            </Box>

            <Grid item xs={12} padding={1}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <CustomNumberField
                            label={t("Display Window Length")}
                            value={displayWindowsLength?.toString() || ""}
                            onChange={(event) =>
                                handleChange(setDisplayWindowsLength, event)
                            }
                            adorValue="m"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            fullWidth
                            label={t("Entrances")}
                            value={entrances}
                            onChange={(value) => dispatch(setEntrances(value))}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            select
                            label={t("Floor Type")}
                            value={floorType}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                dispatch(setFloorType(event.target.value));
                            }}
                        >
                            {details?.floorType?.map(({ key, value }) => (
                                <MenuItem key={key} value={key}>
                                    {value}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={safetyDoor}
                            checked={safetyDoor}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setSafetyDoor(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Safety Door" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Safety Door")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={alarmSystem}
                            checked={alarmSystem}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setAlarmSystem(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Alarm System" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Alarm System")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={painted}
                            checked={painted}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setPainted(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Painted" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Painted")}
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={bright}
                            checked={bright}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setBright(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Bright" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Bright")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={windowScreens}
                            checked={windowScreens}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setWindowScreens(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Window Screens" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Window Screens")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={doubleFrontage}
                            checked={doubleFrontage}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setDoubleFrontage(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Double Frontage" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Double Frontage")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={fireplace}
                            checked={fireplace}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setFireplace(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Fireplace" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Fireplace")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={luxurious}
                            checked={luxurious}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setLuxurious(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Luxurious" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Luxurious")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={satelliteTV}
                            checked={satelliteTV}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setSatelliteTV(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Satellite TV" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Satellite TV")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={reception}
                            checked={reception}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setReception(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Reception" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Reception")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={petsAllowed}
                            checked={petsAllowed}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setPetsAllowed(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Pets Allowed" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Pets Allowed")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={electricCarChargingFacilities}
                            checked={electricCarChargingFacilities}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(
                                    setElectricCarChargingFacilities(checked)
                                );
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{
                                "aria-label":
                                    "Electric Car Charging Facilities",
                            }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Electric Car Charging Facilities")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={wiring}
                            checked={wiring}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setWiring(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Wiring" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Wiring")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={loadingUnloadingElevator}
                            checked={loadingUnloadingElevator}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setLoadingUnloadingElevator(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{
                                "aria-label": "Loading-Unloading Elevator",
                            }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Loading-Unloading Elevator")}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default TechnicalFeaturesAndInteriorForCommercialSection;
