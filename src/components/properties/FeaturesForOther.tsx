import { Grid, Paper } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
import { useSelector } from "react-redux";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";

import { useDispatch } from "react-redux";
import {
  selectAccessForDisable,
  selectAccessForDisabled,
  selectAdaptingToTheGround,
  selectAirConditioning,
  selectAlarmSystem,
  selectAttic,
  selectBar,
  selectBarbeque,
  selectBright,
  selectCctv,
  selectCeramicTiles,
  selectCombinedKitchenAndDiningArea,
  selectCorner,
  selectDoubleGlazing,
  selectDrilling,
  selectElevator,
  selectEntranceGate,
  selectFacade,
  selectFireDetector,
  selectFireplace,
  selectGuestroom,
  selectHas24HoursSecurity,
  selectHeatedPool,
  selectHomeCinema,
  selectIndependentHeatingPerRoom,
  selectIndoorPool,
  selectInternet,
  selectJacuzzi,
  selectLoadingDock,
  selectMasonryFence,
  selectModernDesign,
  selectMountainView,
  selectNearBusRoute,
  selectOffice,
  selectOrganizedGarden,
  selectPainted,
  selectPanoramicView,
  selectPetAllowed,
  selectPlayRoom,
  selectPool,
  selectQuietArea,
  selectSatelliteTV,
  selectSeaFront,
  selectSeaView,
  selectSmartHome,
  selectSolarBoiler,
  selectSoundInsulation,
  selectTents,
  selectThermalInsulation,
  selectVeranda,
  selectView,
  selectWalkableDistanceToBeach,
  selectWell,
  selectWindowScreens,
  selectWithinCityPlan,
  selectWithinResidentialZone,
  setAlarmSystem,
  setFacade,
  setLoadingDock,
  setPanoramicView,
  setVeranda,
  setView,
} from "src/slices/property";

const FeaturesForOtherSection: React.FC<any> = (props) => {
  const enums = props.enums as IGlobalProperty;
  const details = enums?.details as IGlobalPropertyDetails;

  const dispatch = useDispatch();

  const accessForDisable = useSelector(selectAccessForDisable);
  const petAllowed = useSelector(selectPetAllowed);
  const fireplace = useSelector(selectFireplace);
  const airConditioning = useSelector(selectAirConditioning);
  const elevator = useSelector(selectElevator);
  const solarBoiler = useSelector(selectSolarBoiler);
  const pool = useSelector(selectPool);
  const windowScreens = useSelector(selectWindowScreens);
  const modernDesign = useSelector(selectModernDesign);
  const office = useSelector(selectOffice);
  const internet = useSelector(selectInternet);
  const painted = useSelector(selectPainted);
  const entranceGate = useSelector(selectEntranceGate);
  const thermalInsulation = useSelector(selectThermalInsulation);
  const seaView = useSelector(selectSeaView);
  const guestroom = useSelector(selectGuestroom);
  const satelliteTV = useSelector(selectSatelliteTV);
  const quietArea = useSelector(selectQuietArea);
  const bright = useSelector(selectBright);
  const soundInsulation = useSelector(selectSoundInsulation);
  const has24HoursSecurity = useSelector(selectHas24HoursSecurity);
  const alarmSystem = useSelector(selectAlarmSystem);
  const attic = useSelector(selectAttic);
  const bar = useSelector(selectBar);
  const barbeque = useSelector(selectBarbeque);
  const cctv = useSelector(selectCctv);
  const ceramicTiles = useSelector(selectCeramicTiles);
  const combinedKitchenAndDiningArea = useSelector(
    selectCombinedKitchenAndDiningArea
  );
  const fireDetector = useSelector(selectFireDetector);
  const homeCinema = useSelector(selectHomeCinema);
  const jacuzzi = useSelector(selectJacuzzi);
  const nearBusRoute = useSelector(selectNearBusRoute);
  const panoramicView = useSelector(selectPanoramicView);
  const playRoom = useSelector(selectPlayRoom);
  const smartHome = useSelector(selectSmartHome);
  const walkableDistanceToBeach = useSelector(selectWalkableDistanceToBeach);
  const doubleGlazing = useSelector(selectDoubleGlazing);
  const loadingDock = useSelector(selectLoadingDock);

  const mountainView = useSelector(selectMountainView);
  const seaFront = useSelector(selectSeaFront);
  const heatedPool = useSelector(selectHeatedPool);
  const indoorPool = useSelector(selectIndoorPool);
  const organizedGarden = useSelector(selectOrganizedGarden);
  const well = useSelector(selectWell);
  const drilling = useSelector(selectDrilling);
  const masonryFence = useSelector(selectMasonryFence);
  const accessForDisabled = useSelector(selectAccessForDisabled);
  const independentHeatingPerRoom = useSelector(
    selectIndependentHeatingPerRoom
  );
  const adaptingToTheGround = useSelector(selectAdaptingToTheGround);

  const view = useSelector(selectView);
  const facade = useSelector(selectFacade);
  const corner = useSelector(selectCorner);
  const veranda = useSelector(selectVeranda);
  const tents = useSelector(selectTents);
  const withinResidentialZone = useSelector(selectWithinResidentialZone);
  const withinCityPlan = useSelector(selectWithinCityPlan);

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
        <Typography variant='h6'>Feautures</Typography>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={3}
            flexDirection='row'
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={panoramicView}
              checked={panoramicView}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setPanoramicView(checked));
              }}
              sx={{ cursor: "default" }}
              color='primary'
              inputProps={{ "aria-label": "Panoramic View" }}
            />
            <Typography variant='body1' sx={{ ml: 0 }}>
              Panoramic View
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
              value={facade}
              checked={facade}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setFacade(checked));
              }}
              sx={{ cursor: "default" }}
              color='primary'
              inputProps={{ "aria-label": "Facade" }}
            />
            <Typography variant='body1' sx={{ ml: 0 }}>
              Facade
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection='row'
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={loadingDock}
              checked={loadingDock}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setLoadingDock(checked));
              }}
              sx={{ cursor: "default" }}
              color='primary'
              inputProps={{ "aria-label": "Loading Dock" }}
            />
            <Typography variant='body1' sx={{ ml: 0 }}>
              Loading Dock
            </Typography>
          </Grid>

          <Grid
            item
            xs={3}
            flexDirection='row'
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={veranda}
              checked={veranda}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setVeranda(checked));
              }}
              sx={{ cursor: "default" }}
              color='primary'
              inputProps={{ "aria-label": "Veranda" }}
            />
            <Typography variant='body1' sx={{ ml: 0 }}>
              Veranda
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            flexDirection='row'
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={view}
              checked={view}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setView(checked));
              }}
              sx={{ cursor: "default" }}
              color='primary'
              inputProps={{ "aria-label": "View" }}
            />
            <Typography variant='body1' sx={{ ml: 0 }}>
              View
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default FeaturesForOtherSection;
