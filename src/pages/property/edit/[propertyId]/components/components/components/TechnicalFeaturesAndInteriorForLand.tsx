import { Grid, Paper, Box, Checkbox } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import OnlyNumbersInput from "src/components/OnlyNumbers";
import {
    selectCoverageFactor,
    selectFacadeLength,
    selectFloorToAreaRatio,
    setCoverageFactor,
    setFacadeLength,
    setFloorToAreaRatio,
    setAlarmSystem,
    selectAlarmSystem,
} from "src/slices/property";

const TechnicalFeaturesAndInteriorForLandSection: React.FC<any> = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const floorToAreaRatio = useSelector(selectFloorToAreaRatio);
    const coverageFactor = useSelector(selectCoverageFactor);
    const facadeLength = useSelector(selectFacadeLength);
    const alarmSystem = useSelector(selectAlarmSystem);
    const handleFloorToAreaRatioChange = (value: string) =>
        dispatch(setFloorToAreaRatio(value));
    const handleCoverageFactorChange = (value: string) =>
        dispatch(setCoverageFactor(value));
    const handleFacadeLengthChange = (value: string) =>
        dispatch(setFacadeLength(value));

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
                        <OnlyNumbersInput
                            fullWidth
                            label={t("Floor To Area Ratio")}
                            value={floorToAreaRatio}
                            onChange={handleFloorToAreaRatioChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            fullWidth
                            label={t("Coverage Factor")}
                            value={coverageFactor}
                            onChange={handleCoverageFactorChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            fullWidth
                            label={t("Facade Length")}
                            value={facadeLength}
                            adornment="m"
                            onChange={handleFacadeLengthChange}
                        />
                    </Grid>
                    {/* <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-select-currency"
              select
              label="Floor Type"
              value={floorType}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setFloorType(event.target.value));
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
              
            >
              {details?.floorType?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid> */}
                    {/* <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={consideration}
              checked={consideration}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setConsideration(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Consideration" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Considerations
            </Typography>
          </Grid> */}
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
                    {/*
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
              Painted
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
              Bright
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
              Window Screens
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
              Double Frontage
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
              Fireplace
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
              Luxurious
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
              Satellite TV
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
              Reception
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
              Pets Allowed
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
                dispatch(setElectricCarChargingFacilities(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Electric Car Charging Facilities" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Electric Car Charging Facilities
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
              Wiring
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
              inputProps={{ "aria-label": "Loading-Unloading Elevator" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Loading-Unloading Elevator
            </Typography>
          </Grid> */}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default TechnicalFeaturesAndInteriorForLandSection;
