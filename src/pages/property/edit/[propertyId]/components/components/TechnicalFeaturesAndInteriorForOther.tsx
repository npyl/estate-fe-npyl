import { Checkbox, Grid, Paper, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    selectAlarmSystem,
    selectDoubleFrontage,
    selectFalseCeiling,
    selectLoadingUnloadingElevator,
    selectPetsAllowed,
    selectReception,
    selectSafetyDoor,
    selectSatelliteTV,
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

import { IGlobalProperty } from "src/types/global";

import { useAllGlobalsQuery } from "src/services/global";
import { useTranslation } from "react-i18next";

const TechnicalFeaturesAndInteriorForOtherSection: React.FC<any> = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { data } = useAllGlobalsQuery();
    const enums: IGlobalProperty = data?.property as IGlobalProperty;

    const safetyDoor = useSelector(selectSafetyDoor);
    const alarmSystem = useSelector(selectAlarmSystem);

    const reception = useSelector(selectReception);
    const petsAllowed = useSelector(selectPetsAllowed);
    const satelliteTV = useSelector(selectSatelliteTV);
    const loadingUnloadingElevator = useSelector(
        selectLoadingUnloadingElevator
    );
    const falseCeiling = useSelector(selectFalseCeiling);
    const withEquipment = useSelector(selectWithEquipment);
    const doubleFrontage = useSelector(selectDoubleFrontage);

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
