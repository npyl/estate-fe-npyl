import * as React from "react";
import Typography from "@mui/material/Typography";
import { Grid, Paper } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";

import { useDispatch } from "react-redux";
import {
  selectMountainView,
  selectSeaFront,
  selectHeatedPool,
  selectIndoorPool,
  selectOrganizedGarden,
  selectWell,
  selectDrilling,
  selectMasonryFence,
  selectAccessForDisabled,
  selectIndependentHeatingPerRoom,
  selectAdaptingToTheGround,
  selectView,
  selectFacade,
  selectCorner,
  selectVeranda,
  selectTents,
  selectWithinResidentialZone,
  selectWithinCityPlan,
  selectFireplace,
  selectAirConditioning,
  selectAccessForDisable,
  selectPetAllowed,
  selectSolarBoiler,
  selectWindowScreens,
  selectPool,
  selectElevator,
  selectModernDesign,
  selectOffice,
  selectInternet,
  selectPainted,
  selectEntranceGate,
  selectThermalInsulation,
  selectSeaView,
  selectGuestroom,
  selectSatelliteTV,
  selectQuietArea,
  selectBright,
  selectSoundInsulation,
  selectHas24HoursSecurity,
  selectAlarmSystem,
  selectAttic,
  selectBar,
  selectBarbeque,
  selectCctv,
  selectCeramicTiles,
  selectCombinedKitchenAndDiningArea,
  selectFireDetector,
  selectHomeCinema,
  selectJacuzzi,
  selectNearBusRoute,
  selectPanoramicView,
  selectPlayRoom,
  selectSmartHome,
  selectWalkableDistanceToBeach,
  selectDoubleGlazing,
  setFireplace,
  setPool,
  setAccessForDisable,
  setPetAllowed,
  setSolarBoiler,
  setWindowScreens,
  setModernDesign,
  setSeaFront,
  setHeatedPool,
  setIndoorPool,
  setOrganizedGarden,
  setWell,
  setDrilling,
  setMasonryFence,
  setAccessForDisabled,
  setIndependentHeatingPerRoom,
  setAdaptingToTheGround,
  setView,
  setFacade,
  setCorner,
  setVeranda,
  setTents,
  setWithinResidentialZone,
  setWithinCityPlan,
  setMountainView,
  setOffice,
  setInternet,
  setPainted,
  setEntranceGate,
  setThermalInsulation,
  setSeaView,
  setGuestroom,
  setSatelliteTV,
  setQuietArea,
  setBright,
  setSoundInsulation,
  setHas24HoursSecurity,
  setAlarmSystem,
  setAttic,
  setHasAttic,
  setBar,
  setBarbeque,
  setCctv,
  setCeramicTiles,
  setCombinedKitchenAndDiningArea,
  setFireDetector,
  setHomeCinema,
  setJacuzzi,
  setNearBusRoute,
  setPanoramicView,
  setPlayRoom,
  setSmartHome,
  setWalkableDistanceToBeach,
  setDoubleGlazing,
  setElevator,
  setAirConditioning,
} from "src/slices/property";

const FeaturesForLandSection: React.FC<any> = (props) => {
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
        <Typography variant="h6">Feautures</Typography>
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
              value={panoramicView}
              checked={panoramicView}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setPanoramicView(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Panoramic View" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Panoramic View
            </Typography>
          </Grid>

          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={corner}
              checked={corner}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setCorner(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Corner" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Corner
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
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
              color="primary"
              inputProps={{ "aria-label": "Facade" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Facade
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={withinCityPlan}
              checked={withinCityPlan}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setWithinCityPlan(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Within City Plan" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Within City Plan
            </Typography>
          </Grid>

          <Grid
            item
            xs={6}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={withinResidentialZone}
              checked={withinResidentialZone}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setWithinResidentialZone(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Within Residential Zone" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Within Residential Zone
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default FeaturesForLandSection;
