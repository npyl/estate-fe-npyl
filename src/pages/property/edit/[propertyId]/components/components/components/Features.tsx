import { Grid, Paper } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import {
  selectAccessForDisable,
  selectAdaptingToTheGround,
  selectAlarmSystem,
  selectBarbeque,
  selectBright,
  selectCctv,
  selectCombinedKitchenAndDiningArea,
  selectCorner,
  selectDrilling,
  selectFacade,
  selectFireDetector,
  selectGuestroom,
  selectHas24HoursSecurity,
  selectHeatedPool,
  selectHomeCinema,
  selectIndependentHeatingPerRoom,
  selectIndoorPool,
  selectInternet,
  selectJacuzzi,
  selectMasonryFence,
  selectMountainView,
  selectNearBusRoute,
  selectOffice,
  selectOrganizedGarden,
  selectPanoramicView,
  selectPool,
  selectQuietArea,
  selectSeaFront,
  selectSeaView,
  selectSmartHome,
  selectSoundInsulation,
  selectTents,
  selectThermalInsulation,
  selectVeranda,
  selectView,
  selectWalkableDistanceToBeach,
  selectWell,
  setAccessForDisable,
  setAdaptingToTheGround,
  setAlarmSystem,
  setBarbeque,
  setBright,
  setCctv,
  setCombinedKitchenAndDiningArea,
  setCorner,
  setDrilling,
  setFacade,
  setFireDetector,
  setGuestroom,
  setHas24HoursSecurity,
  setHeatedPool,
  setHomeCinema,
  setIndependentHeatingPerRoom,
  setIndoorPool,
  setInternet,
  setJacuzzi,
  setMasonryFence,
  setMountainView,
  setNearBusRoute,
  setOffice,
  setOrganizedGarden,
  setPanoramicView,
  setPool,
  setQuietArea,
  setSeaFront,
  setSeaView,
  setSmartHome,
  setSoundInsulation,
  setTents,
  setThermalInsulation,
  setVeranda,
  setView,
  setWalkableDistanceToBeach,
  setWell,
} from "src/slices/property";

const FeaturesSection: React.FC<any> = (props) => {
  const dispatch = useDispatch();

  const accessForDisable = useSelector(selectAccessForDisable);
  const pool = useSelector(selectPool);
  const office = useSelector(selectOffice);
  const internet = useSelector(selectInternet);
  const thermalInsulation = useSelector(selectThermalInsulation);
  const seaView = useSelector(selectSeaView);
  const guestroom = useSelector(selectGuestroom);
  const quietArea = useSelector(selectQuietArea);
  const bright = useSelector(selectBright);
  const soundInsulation = useSelector(selectSoundInsulation);
  const has24HoursSecurity = useSelector(selectHas24HoursSecurity);
  const alarmSystem = useSelector(selectAlarmSystem);
  const barbeque = useSelector(selectBarbeque);
  const cctv = useSelector(selectCctv);
  const combinedKitchenAndDiningArea = useSelector(
    selectCombinedKitchenAndDiningArea
  );
  const fireDetector = useSelector(selectFireDetector);
  const homeCinema = useSelector(selectHomeCinema);
  const jacuzzi = useSelector(selectJacuzzi);
  const nearBusRoute = useSelector(selectNearBusRoute);
  const panoramicView = useSelector(selectPanoramicView);
  const smartHome = useSelector(selectSmartHome);
  const walkableDistanceToBeach = useSelector(selectWalkableDistanceToBeach);
  const mountainView = useSelector(selectMountainView);
  const seaFront = useSelector(selectSeaFront);
  const heatedPool = useSelector(selectHeatedPool);
  const indoorPool = useSelector(selectIndoorPool);
  const organizedGarden = useSelector(selectOrganizedGarden);
  const well = useSelector(selectWell);
  const drilling = useSelector(selectDrilling);
  const masonryFence = useSelector(selectMasonryFence);
  const independentHeatingPerRoom = useSelector(
    selectIndependentHeatingPerRoom
  );
  const adaptingToTheGround = useSelector(selectAdaptingToTheGround);
  const view = useSelector(selectView);
  const facade = useSelector(selectFacade);
  const corner = useSelector(selectCorner);
  const veranda = useSelector(selectVeranda);
  const tents = useSelector(selectTents);

  interface ICheckboxItemProps {
    label: string;
    value: boolean;
    onChange: (event: React.ChangeEvent<unknown>, checked: boolean) => void;
  }

  const CheckboxItem = (props: ICheckboxItemProps) => {
    const { value, label, onChange } = props;

    return <Grid
      item
      xs={3}
      flexDirection="row"
      sx={{ display: "inline-flex", alignItems: "center" }}
    >
      <Checkbox
        value={value}
        checked={value}
        onChange={onChange}
        sx={{ cursor: "default" }}
        color="primary"
        inputProps={{ "aria-label": "Panoramic View" }}
      />
      <Typography variant="body1" sx={{ ml: 0 }}>
        {label}
      </Typography>
    </Grid>
  }

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
          <CheckboxItem label="Panoramic View" value={panoramicView} onChange={(event, checked) => {
            dispatch(setPanoramicView(checked));
          }} />
          <CheckboxItem label="Smart Home" value={smartHome} onChange={(event, checked) => {
            dispatch(setSmartHome(checked));
          }} />
          <CheckboxItem label="Organized Garden" value={organizedGarden} onChange={(event, checked) => {
            dispatch(setOrganizedGarden(checked));
          }} />
          <CheckboxItem label="Alarm System" value={alarmSystem} onChange={(event, checked) => {
            dispatch(setAlarmSystem(checked));
          }} />
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
              inputProps={{ "aria-label": "Sea View " }}
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
              inputProps={{ "aria-label": "Guestroom" }}
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
              inputProps={{ "aria-label": "Jacuzzi" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Jacuzzi
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
              inputProps={{ "aria-label": "Has 24Hours Security" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Has 24 Hours Security
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={mountainView}
              checked={mountainView}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setMountainView(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Mountain View" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Mountain View
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
              inputProps={{ "aria-label": "Office" }}
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
              value={well}
              checked={well}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setWell(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Well" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Well
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
              inputProps={{ "aria-label": "CCTV" }}
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
              value={seaFront}
              checked={seaFront}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setSeaFront(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Sea Front" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Sea Front
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
              inputProps={{ "aria-label": "Has 24Hours Security" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Home Cinema
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={drilling}
              checked={drilling}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setDrilling(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Drilling" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Drilling
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
              inputProps={{ "aria-label": "Internet" }}
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
              inputProps={{ "aria-label": "Walkable Distance to Beach" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Walkable Distance to Beach
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
              inputProps={{ "aria-label": "Combined Kitchen and Dining Area" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Combined Kitchen and Dining Area
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={masonryFence}
              checked={masonryFence}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setMasonryFence(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Massony Fence" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Massony Fence
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
              inputProps={{ "aria-label": "Fire Detector" }}
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
              inputProps={{ "aria-label": "Quiet Area" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Quiet Area
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
              inputProps={{ "aria-label": "Sound Insulation" }}
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
              inputProps={{ "aria-label": "Access for Disable" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Access for Disable
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={independentHeatingPerRoom}
              checked={independentHeatingPerRoom}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setIndependentHeatingPerRoom(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Indepent Heating Per Room" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Indepent Heating Per Room
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
              inputProps={{ "aria-label": "Thermal Insulation" }}
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
              value={adaptingToTheGround}
              checked={adaptingToTheGround}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setAdaptingToTheGround(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Adapting to the Ground" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Adapting to the Ground
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
              inputProps={{ "aria-label": "Pool" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
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
              value={view}
              checked={view}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setView(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "View" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              View
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
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
              color="primary"
              inputProps={{ "aria-label": "Veranda" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Veranda
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={tents}
              checked={tents}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setTents(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Tents" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Tents
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
              inputProps={{ "aria-label": "Barbeque" }}
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
              value={heatedPool}
              checked={heatedPool}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setHeatedPool(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Heated Pool" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Heated Pool
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={indoorPool}
              checked={indoorPool}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setIndoorPool(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Indoor Pool" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Indoor Pool
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
              inputProps={{ "aria-label": "Near Bus Route" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Near Bus Route
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default FeaturesSection;
