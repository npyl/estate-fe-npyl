import { Grid, MenuItem, Paper, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
import { useSelector } from "react-redux";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";

import { useDispatch } from "react-redux";
import {
    selectAirConditioning,
    selectElectricityType,
    selectEnergyClass,
    selectFloorHeating,
    selectHeatingSystem,
    selectHeatingType,
    selectOffPeakElectricity,
    selectSolarBoiler,
    setAirConditioning,
    setElectricityType,
    setEnergyClass,
    setFloorHeating,
    setHeatingSystem,
    setHeatingType,
    setOffPeakElectricity,
    setSolarBoiler,
} from "src/slices/property";
import { useAllGlobalsQuery } from "src/services/global";
import { useTranslation } from "react-i18next";

const HeatingAndEnergySection: React.FC<any> = (props) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { data } = useAllGlobalsQuery();
    const enums: IGlobalProperty = data?.property as IGlobalProperty;
    const details = enums?.details as IGlobalPropertyDetails;

    const heatingType = useSelector(selectHeatingType);
    const heatingSystem = useSelector(selectHeatingSystem);
    const floorHeating = useSelector(selectFloorHeating);
    const airConditioning = useSelector(selectAirConditioning);
    const energyClass = useSelector(selectEnergyClass);
    const offPeakElectricity = useSelector(selectOffPeakElectricity);
    const solarBoiler = useSelector(selectSolarBoiler);
    const electricityType = useSelector(selectElectricityType);

    if (!details || !details.heatingSystem || !details.heatingType) return null;

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
                <Typography variant="h6">{t("Heating and Energy")}</Typography>
            </Box>

            <Grid item xs={12} padding={1}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="outlined-select-currency"
                            select
                            label={t("Heating Type")}
                            value={heatingType}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                dispatch(setHeatingType(event.target.value));
                            }}
                            inputProps={{
                                style: {
                                    height: "8px",
                                },
                            }}
                        >
                            {details?.heatingType?.map((heatingType, index) => (
                                <MenuItem key={index} value={heatingType.key}>
                                    {heatingType.value}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="outlined-select-currency"
                            select
                            label={t("Energy Class")}
                            value={energyClass}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                dispatch(setEnergyClass(event.target.value));
                            }}
                            inputProps={{
                                style: {
                                    height: "8px",
                                },
                            }}
                        >
                            {details?.energyClass?.map((energyClass, index) => (
                                <MenuItem key={index} value={energyClass.key}>
                                    {energyClass.value}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="outlined-select-currency"
                            select
                            label={t("Heating System")}
                            value={heatingSystem}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                dispatch(setHeatingSystem(event.target.value));
                            }}
                            inputProps={{
                                style: {
                                    height: "8px",
                                },
                            }}
                        >
                            {details?.heatingSystem?.map(
                                (heatingSystem, index) => (
                                    <MenuItem
                                        key={index}
                                        value={heatingSystem.key}
                                    >
                                        {heatingSystem.value}
                                    </MenuItem>
                                )
                            )}
                        </TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="outlined-select-currency"
                            select
                            label={t("Electricity Type")}
                            value={electricityType}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                dispatch(
                                    setElectricityType(event.target.value)
                                );
                            }}
                            inputProps={{
                                style: {
                                    height: "8px",
                                },
                            }}
                        >
                            {details?.electricityType?.map(
                                (electricityType, index) => (
                                    <MenuItem
                                        key={index}
                                        value={electricityType.key}
                                    >
                                        {electricityType.value}
                                    </MenuItem>
                                )
                            )}
                        </TextField>
                    </Grid>

                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={floorHeating}
                            checked={floorHeating}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setFloorHeating(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{
                                "aria-label": "Floor Heating Checkbox",
                            }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Floor Heating")}
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={airConditioning}
                            checked={airConditioning}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setAirConditioning(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{
                                "aria-label": "Floor Heating Checkbox",
                            }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Air-Coditioning")}
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={solarBoiler}
                            checked={solarBoiler}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setSolarBoiler(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{
                                "aria-label": "Floor Heating Checkbox",
                            }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Solar Boiler")}
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={offPeakElectricity}
                            checked={offPeakElectricity}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setOffPeakElectricity(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{
                                "aria-label": "Floor Heating Checkbox",
                            }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Off Peak Electricity")}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};
export default HeatingAndEnergySection;
