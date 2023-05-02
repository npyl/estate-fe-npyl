import * as React from "react";
import Typography from "@mui/material/Typography";
import { Grid, Paper } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";

import { useDispatch } from "react-redux";
import {
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

const FeaturesSection: React.FC<any> = (props) => {
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
              inputProps={{ "aria-label": "Floor Heating Checkbox" }}
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
              value={elevator}
              checked={elevator}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setElevator(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Elevator" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Elevator
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={attic}
              checked={attic}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setHasAttic(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Attic" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Attic
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={office}
              checked={office}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setOffice(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Office
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={fireDetector}
              checked={fireDetector}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setFireDetector(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Fire Detector
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={pool}
              checked={pool}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setPool(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
            />
            <Typography color="success.main" variant="body1" sx={{ ml: 0 }}>
              Pool
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={doubleGlazing}
              checked={doubleGlazing}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setDoubleGlazing(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Double Glazing
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={soundInsulation}
              checked={soundInsulation}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setSoundInsulation(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Sound Insulation
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={barbeque}
              checked={barbeque}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setBarbeque(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Barbeque
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
            />
            <Typography color="success.main" variant="body1" sx={{ ml: 0 }}>
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
              value={playRoom}
              checked={playRoom}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setPlayRoom(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              PlayRoom
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={guestroom}
              checked={guestroom}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setGuestroom(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Guestroom
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={combinedKitchenAndDiningArea}
              checked={combinedKitchenAndDiningArea}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setCombinedKitchenAndDiningArea(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Combined Kitchen And Dining Area
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={homeCinema}
              checked={homeCinema}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setHomeCinema(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              HomeCinema
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={seaView}
              checked={seaView}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setSeaView(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Sea View
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={has24HoursSecurity}
              checked={has24HoursSecurity}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setHas24HoursSecurity(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              24-hours Security
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
              value={cctv}
              checked={cctv}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setCctv(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              CCTV
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={entranceGate}
              checked={entranceGate}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setEntranceGate(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Entrance gate
            </Typography>
          </Grid>
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
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Panoramic view
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
              value={nearBusRoute}
              checked={nearBusRoute}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setNearBusRoute(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Near bus route
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
              value={walkableDistanceToBeach}
              checked={walkableDistanceToBeach}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setWalkableDistanceToBeach(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Walkable distance to beach
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={quietArea}
              checked={quietArea}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setQuietArea(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Quiet area
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
            />
            <Typography color="success.main" variant="body1" sx={{ ml: 0 }}>
              SolarBoiler
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={thermalInsulation}
              checked={thermalInsulation}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setThermalInsulation(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Thermal Insulation
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={internet}
              checked={internet}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setInternet(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Internet
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={petAllowed}
              checked={petAllowed}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setPetAllowed(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
            />
            <Typography color="success.main" variant="body1" sx={{ ml: 0 }}>
              Pet allowed
            </Typography>
          </Grid>

          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={accessForDisable}
              checked={accessForDisable}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setAccessForDisable(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
            />
            <Typography color="success.main" variant="body1" sx={{ ml: 0 }}>
              Access for disable
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={jacuzzi}
              checked={jacuzzi}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setJacuzzi(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Jacuzzi
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default FeaturesSection;
