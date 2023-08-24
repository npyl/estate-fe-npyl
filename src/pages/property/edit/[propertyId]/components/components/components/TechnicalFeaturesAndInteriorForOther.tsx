import { Checkbox, Grid, Paper } from "@mui/material";
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
    setDoubleFrontage,
    setFalseCeiling,
    setLoadingUnloadingElevator,
    setPetsAllowed,
    setReception,
    setSafetyDoor,
    setSatelliteTV,
    setWithEquipment,
} from "src/slices/property";

import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";

import { useState } from "react";
import { useAllUsersQuery } from "src/services/user";
import { useAllGlobalsQuery } from "src/services/global";
import { useTranslation } from "react-i18next";

const TechnicalFeaturesAndInteriorForOtherSection: React.FC<any> = (props) => {
    const [rentalPeriodStart, setRentalPeriodStart] = useState<Date | null>(
        new Date()
    );

    const { data } = useAllGlobalsQuery();
    const enums: IGlobalProperty = data?.property as IGlobalProperty;
    const details = enums?.details as IGlobalPropertyDetails;
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const entrances = useSelector(selectEntrances);
    const displayWindowsLength = useSelector(selectDisplayWindowsLength);
    const safetyDoor = useSelector(selectSafetyDoor);
    const alarmSystem = useSelector(selectAlarmSystem);
    const painted = useSelector(selectPainted);
    const furnished = useSelector(selectFurnished);
    const frameType = useSelector(selectFrameType);
    const paneGlassType = useSelector(selectPaneGlassType);
    const windowScreens = useSelector(selectWindowScreens);
    const fireplace = useSelector(selectFireplace);
    const bright = useSelector(selectBright);
    const luxurious = useSelector(selectLuxurious);
    const electricCarChargingFacilities = useSelector(
        selectElectricCarChargingFacilities
    );
    const reception = useSelector(selectReception);
    const petsAllowed = useSelector(selectPetsAllowed);
    const floorType = useSelector(selectFloorType);
    const satelliteTV = useSelector(selectSatelliteTV);
    const wiring = useSelector(selectWiring);
    const loadingUnloadingElevator = useSelector(
        selectLoadingUnloadingElevator
    );
    const falseCeiling = useSelector(selectFalseCeiling);
    const withEquipment = useSelector(selectWithEquipment);
    const doubleFrontage = useSelector(selectDoubleFrontage);
    const consideration = useSelector(selectConsideration);
    const floorToAreaRatio = useSelector(selectFloorToAreaRatio);
    const coverageFactor = useSelector(selectCoverageFactor);
    const facadeLength = useSelector(selectFacadeLength);
    const inclination = useSelector(selectInclination);

    // get list of owners & managers
    const { data: owners } = useAllCustomersQuery();
    const { data: managers } = useAllUsersQuery();
    if (!enums) return null;
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
                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={falseCeiling}
                            checked={falseCeiling}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setFalseCeiling(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "False Ceiling" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("False Ceiling")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={withEquipment}
                            checked={withEquipment}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setWithEquipment(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "With Equipment" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("With Eqipment")}
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
                </Grid>
            </Grid>
        </Paper>
    );
};

export default TechnicalFeaturesAndInteriorForOtherSection;
