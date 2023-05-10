import { Checkbox, Grid, MenuItem, Paper, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAccessibility,
  selectAttic,
  selectBathrooms,
  selectBedrooms,
  selectElectricityType,
  selectEnergyClass,
  selectFloor,
  selectFloorApartment,
  selectFloorType,
  selectFrameType,
  selectFurnished,
  selectKitchens,
  selectLandUse,
  selectLayers,
  selectLivingRooms,
  selectNumOfWC,
  selectOrientation,
  selectPenthouse,
  selectPlayRoom,
  selectRooms,
  selectStorerooms,
  selectViewType,
  selectZoneType,
  setAccessibility,
  setAttic,
  setBathrooms,
  setBedrooms,
  setFloor,
  setKitchens,
  setLandUse,
  setLayers,
  setLivingRooms,
  setNumOfWC,
  setOrientation,
  setPenthouse,
  setPlayRoom,
  setRooms,
  setViewType,
  setZoneType,
} from "src/slices/property";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";
const ariaLabel = { "aria-label": "description" };
const PropertyDescriptionSection: React.FC<any> = (props) => {
  const enums = props.enums as IGlobalProperty;
  const details = enums?.details as IGlobalPropertyDetails;

  const dispatch = useDispatch();
  const furnished = useSelector(selectFurnished);
  const atttic = useSelector(selectAttic);
  const playroom = useSelector(selectPlayRoom);
  const floorApartment = useSelector(selectFloorApartment);
  const penthouse = useSelector(selectPenthouse);
  const landUse = useSelector(selectLandUse);
  const floorType = useSelector(selectFloorType);
  const viewType = useSelector(selectViewType);
  const frameType = useSelector(selectFrameType);
  const accessibility = useSelector(selectAccessibility);
  const energyClass = useSelector(selectEnergyClass);
  const zoneType = useSelector(selectZoneType);
  const electricityType = useSelector(selectElectricityType);

  const kitchens = useSelector(selectKitchens);
  const layers = useSelector(selectLayers);
  const bathrooms = useSelector(selectBathrooms);
  const numOfWC = useSelector(selectNumOfWC);
  const livingRooms = useSelector(selectLivingRooms);
  const bedrooms = useSelector(selectBedrooms);
  const storeroom = useSelector(selectStorerooms);
  const rooms = useSelector(selectRooms);
  const orientation = useSelector(selectOrientation);
  const floor = useSelector(selectFloor);

  if (!details) return null;

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
        <Typography variant='h6'>Property Description</Typography>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id='outlined-select-currency'
              select
              label='Floor'
              value={floor}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setFloor(event.target.value));
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
              size='small'
            >
              {details?.floors?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              id='outlined-controlled'
              label='Bedrooms'
              placeholder='1,2,3...'
              inputProps={ariaLabel}
              value={bedrooms}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setBedrooms(event.target.value));
              }}
              InputProps={{
                style: {
                  height: "8px",
                },
              }}
            />
          </Grid>

          <Grid item xs={6}>
            {/* <> */}
            <TextField
              fullWidth
              id='outlined-controlled'
              label='Layers'
              value={layers}
              placeholder='1,2,3...'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setLayers(event.target.value));
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
            />
          </Grid>

          <Grid item xs={6}>
            {/* <> */}
            <TextField
              fullWidth
              id='outlined-controlled'
              label='Kitchens'
              value={kitchens}
              placeholder='1,2,3...'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setKitchens(event.target.value));
              }}
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
              id='outlined-controlled'
              label='Living Rooms'
              value={livingRooms}
              placeholder='1,2,3...'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setLivingRooms(event.target.value));
              }}
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
              id='outlined-controlled'
              label='Number of WC'
              value={numOfWC}
              placeholder='1,2,3...'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setNumOfWC(event.target.value));
              }}
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
              id='outlined-controlled'
              label='Bathrooms'
              value={bathrooms}
              placeholder='1,2,3...'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setBathrooms(event.target.value));
              }}
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
              id='outlined-select-currency'
              select
              label='View'
              value={viewType}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setViewType(event.target.value));
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
              size='small'
            >
              {details?.viewType?.map((option) => (
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
              label='Accessibility'
              value={accessibility}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setAccessibility(event.target.value));
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
              size='small'
            >
              {details?.accessibility?.map((option) => (
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
              label='Land Use'
              value={landUse}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setLandUse(event.target.value));
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
              size='small'
            >
              {details?.landUse?.map((option) => (
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
              label='Zone'
              value={zoneType}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setZoneType(event.target.value));
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
              size='small'
            >
              {details?.zoneType?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              id='outlined-controlled'
              label='Rooms'
              value={rooms}
              placeholder=''
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setRooms(event.target.value));
              }}
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
              id='outlined-select-currency'
              select
              label='Orientation'
              value={orientation}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setOrientation(event.target.value));
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
              size='small'
            >
              {details?.orientation?.map((option) => (
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
              id='outlined-controlled'
              value={atttic}
              placeholder='Attic'
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setAttic(checked));
              }}
              sx={{ cursor: "default" }}
              color='primary'
              inputProps={{ "aria-label": "Elevator" }}
            />
            <Typography variant='body1' sx={{ ml: 0 }}>
              Attic
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection='row'
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              id='outlined-controlled'
              value={playroom}
              placeholder='Play Room'
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setPlayRoom(checked));
              }}
              sx={{ cursor: "default" }}
              color='primary'
              inputProps={{ "aria-label": "Elevator" }}
            />
            <Typography variant='body1' sx={{ ml: 0 }}>
              Playroom
            </Typography>
          </Grid>

          <Grid
            item
            xs={3}
            flexDirection='row'
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              id='outlined-controlled'
              value={storeroom}
              placeholder='Play Room'
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setPlayRoom(checked));
              }}
              sx={{ cursor: "default" }}
              color='primary'
              inputProps={{ "aria-label": "Elevator" }}
            />
            <Typography variant='body1' sx={{ ml: 0 }}>
              Storeroom
            </Typography>
          </Grid>

          <Grid
            item
            xs={3}
            flexDirection='row'
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              id='outlined-controlled'
              value={penthouse}
              placeholder='Penthouse'
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setPenthouse(checked));
              }}
              sx={{ cursor: "default" }}
              color='primary'
              inputProps={{ "aria-label": "Elevator" }}
            />
            <Typography variant='body1' sx={{ ml: 0 }}>
              Penthouse
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default PropertyDescriptionSection;
