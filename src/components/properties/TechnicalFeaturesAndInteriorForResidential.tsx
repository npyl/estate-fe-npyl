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
  setDoubleFrontage,
  setElectricCarChargingFacilities,
  setFireplace,
  setFloorType,
  setFrameType,
  setFurnished,
  setLuxurious,
  setPainted,
  setPetsAllowed,
  setReception,
  setSafetyDoor,
  setSatelliteTV,
  setWindowScreens,
} from "src/slices/property";

import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";

import { useState } from "react";
import { useAllUsersQuery } from "src/services/user";

const TechnicalFeaturesAndInteriorForResidentialSection: React.FC<any> = (
  props
) => {
  const [rentalPeriodStart, setRentalPeriodStart] = useState<Date | null>(
    new Date()
  );

  const enums = props.enums as IGlobalProperty;
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
        <Typography variant='h6'>Technical Features And Interior</Typography>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id='outlined-select-currency'
              select
              label='Furnished'
              value={furnished}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setFurnished(event.target.value));
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
              size='small'
            >
              {details?.furnished?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id='outlined-select-currency'
              select
              label='Frame Type'
              value={frameType}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setFrameType(event.target.value));
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
              size='small'
            >
              {details?.frameType?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id='outlined-select-currency'
              select
              label='Pane Glass Type'
              value={paneGlassType}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setFurnished(event.target.value));
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
              size='small'
            >
              {details?.panelGlassType?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id='outlined-select-currency'
              select
              label='Floor Type'
              value={floorType}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setFloorType(event.target.value));
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
              size='small'
            >
              {details?.floorType?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection='row'
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
              color='primary'
              inputProps={{ "aria-label": "Safety Door" }}
            />
            <Typography variant='body1' sx={{ ml: 0 }}>
              Safety Door
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection='row'
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
              color='primary'
              inputProps={{ "aria-label": "Alarm System" }}
            />
            <Typography variant='body1' sx={{ ml: 0 }}>
              Alarm System
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection='row'
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
              color='primary'
              inputProps={{ "aria-label": "Painted" }}
            />
            <Typography variant='body1' sx={{ ml: 0 }}>
              Painted
            </Typography>
          </Grid>

          <Grid
            item
            xs={3}
            flexDirection='row'
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
              color='primary'
              inputProps={{ "aria-label": "Bright" }}
            />
            <Typography variant='body1' sx={{ ml: 0 }}>
              Bright
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection='row'
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
              color='primary'
              inputProps={{ "aria-label": "Window Screens" }}
            />
            <Typography variant='body1' sx={{ ml: 0 }}>
              Window Screens
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection='row'
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
              color='primary'
              inputProps={{ "aria-label": "Double Frontage" }}
            />
            <Typography variant='body1' sx={{ ml: 0 }}>
              Double Frontage
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection='row'
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
              color='primary'
              inputProps={{ "aria-label": "Fireplace" }}
            />
            <Typography variant='body1' sx={{ ml: 0 }}>
              Fireplace
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection='row'
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
              color='primary'
              inputProps={{ "aria-label": "Luxurious" }}
            />
            <Typography variant='body1' sx={{ ml: 0 }}>
              Luxurious
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection='row'
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
              color='primary'
              inputProps={{ "aria-label": "Satellite TV" }}
            />
            <Typography variant='body1' sx={{ ml: 0 }}>
              Satellite TV
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection='row'
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
              color='primary'
              inputProps={{ "aria-label": "Reception" }}
            />
            <Typography variant='body1' sx={{ ml: 0 }}>
              Reception
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection='row'
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
              color='primary'
              inputProps={{ "aria-label": "Pets Allowed" }}
            />
            <Typography variant='body1' sx={{ ml: 0 }}>
              Pets Allowed
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection='row'
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
              color='primary'
              inputProps={{ "aria-label": "Electric Car Charging Facilities" }}
            />
            <Typography variant='body1' sx={{ ml: 0 }}>
              Electric Car Charging Facilities
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TechnicalFeaturesAndInteriorForResidentialSection;
