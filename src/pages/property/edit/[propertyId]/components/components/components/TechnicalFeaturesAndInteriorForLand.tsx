import { Grid, Paper, TextField } from "@mui/material";
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
  setEntrances,
  setCoverageFactor,
  setFacadeLength,
  setFloorToAreaRatio,
} from "src/slices/property";

import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";

import { useState } from "react";
import { useAllUsersQuery } from "src/services/user";
import { useAllGlobalsQuery } from "src/services/global";

const TechnicalFeaturesAndInteriorForLandSection: React.FC<any> = (props) => {
  const [rentalPeriodStart, setRentalPeriodStart] = useState<Date | null>(
    new Date()
  );

  const { data } = useAllGlobalsQuery();
  const enums: IGlobalProperty = data?.property as IGlobalProperty;
  const details = enums?.details as IGlobalPropertyDetails;
  const dispatch = useDispatch();

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
  const loadingUnloadingElevator = useSelector(selectLoadingUnloadingElevator);
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

  //set the values for BE
  const handleFloorToAreaRatioChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
    dispatch(setFloorToAreaRatio(numericValue));
  };
  const handleCoverageFactorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
    dispatch(setCoverageFactor(numericValue));
  };
  const handleFacadeLengthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
    dispatch(setFacadeLength(numericValue));
  };
  //handle onlynumbers
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const regex = /[0-9]/;
    if (!regex.test(keyValue)) {
      event.preventDefault(); // Prevent entering non-numeric characters
    }
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
        <Typography variant="h6">Technical Features And Interior</Typography>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-controlled"
              label="Floor To Area Ratio"
              value={floorToAreaRatio}
              onChange={handleFloorToAreaRatioChange}
              onKeyPress={handleKeyPress}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-controlled"
              label="Coverage Factor"
              value={coverageFactor}
              onChange={handleCoverageFactorChange}
              onKeyPress={handleKeyPress}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-controlled"
              label="Facade Length"
              value={facadeLength}
              onChange={handleFacadeLengthChange}
              onKeyPress={handleKeyPress}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
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
          {/* <Grid
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
              Alarm System
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
