import * as React from "react";
import Typography from "@mui/material/Typography";
import {
  Grid,
  Paper,
  TextField,
  MenuItem,
  List,
  Checkbox,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";
import { useSelector } from "react-redux";
import { Box, spacing } from "@mui/system";
import { useDispatch } from "react-redux";
import {
  selectFurnished,
  selectAttic,
  selectPlayRoom,
  selectRooms,
  selectOrientation,
  selectStoreroom,
  selectFloorApartment,
  selectPenthouse,
  selectLandUse,
  selectFloorType,
  selectViewType,
  selectFrameType,
  selectAccessibility,
  selectEnergyClass,
  selectZoneType,
  selectElectricityType,
  selectFloors,
  selectKitchens,
  selectLayers,
  selectBathrooms,
  selectNumOfWC,
  selectLivingRooms,
  selectBedrooms,
  selectStorerooms,
  setFurnished,
  setLandUse,
  setAttic,
  setPlayRoom,
  setFloorApartment,
  setPenthouse,
  setRooms,
  setOrientation,
  setFloorType,
  setViewType,
  setFrameType,
  setAccessibility,
  setEnergyClass,
  setZoneType,
  setElectricityType,
  setFloors,
  setKitchens,
  setLayers,
  setBathrooms,
  setBedrooms,
  setNumOfWC,
  setLivingRooms,
  setStoreroom,
} from "src/slices/property";
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
  const floors = useSelector(selectFloors);
  const kitchens = useSelector(selectKitchens);
  const layers = useSelector(selectLayers);
  const bathrooms = useSelector(selectBathrooms);
  const numOfWC = useSelector(selectNumOfWC);
  const livingRooms = useSelector(selectLivingRooms);
  const bedrooms = useSelector(selectBedrooms);
  const storeroom = useSelector(selectStorerooms);
  const rooms = useSelector(selectRooms);
  const orientation = useSelector(selectOrientation);

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
        <Typography variant="h6">Property Description</Typography>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {/* <> */}
            <TextField
              fullWidth
              id="outlined-controlled"
              label="Floor"
              value={floors}
              placeholder="1,2,3..."
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setFloors(event.target.value));
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
            />
          </Grid>

          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-controlled"
              label="Bedrooms"
              placeholder="1,2,3..."
              inputProps={ariaLabel}
              value={bedrooms}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setBedrooms(event.target.value));
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
              id="outlined-controlled"
              label="Layers"
              value={layers}
              placeholder="1,2,3..."
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
              id="outlined-controlled"
              label="Kitchens"
              value={kitchens}
              placeholder="1,2,3..."
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
              id="outlined-controlled"
              label="Living Rooms"
              value={livingRooms}
              placeholder="1,2,3..."
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
              id="outlined-controlled"
              label="Number of WC"
              value={numOfWC}
              placeholder="1,2,3..."
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
              id="outlined-controlled"
              label="Bathrooms"
              value={bathrooms}
              placeholder="1,2,3..."
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
              id="outlined-select-currency"
              select
              label="View"
              value={viewType}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setViewType(event.target.value));
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
              size="small"
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
              id="outlined-select-currency"
              select
              label="Accessibility"
              value={accessibility}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setAccessibility(event.target.value));
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
              size="small"
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
              id="outlined-select-currency"
              select
              label="Land Use"
              value={landUse}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setLandUse(event.target.value));
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
              size="small"
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
              id="outlined-select-currency"
              select
              label="Zone"
              value={zoneType}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setZoneType(event.target.value));
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
              size="small"
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
              id="outlined-select-currency"
              select
              label="Rooms"
              value={rooms}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setRooms(event.target.value));
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
              size="small"
            >
              {details?.rooms?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-select-currency"
              select
              label="Orientation"
              value={orientation}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setOrientation(event.target.value));
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
              size="small"
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
            xs={4}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              id="outlined-controlled"
              value={atttic}
              placeholder="Attic"
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setAttic(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Elevator" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Attic
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              id="outlined-controlled"
              value={playroom}
              placeholder="Play Room"
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setPlayRoom(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Elevator" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Playroom
            </Typography>
          </Grid>

          <Grid
            item
            xs={4}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              id="outlined-controlled"
              value={storeroom}
              placeholder="Play Room"
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setPlayRoom(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Elevator" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Storeroom
            </Typography>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid
            item
            xs={4}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              id="outlined-controlled"
              value={floorApartment}
              placeholder="Floor Apartment"
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setFloorApartment(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Elevator" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Floor Apartment
            </Typography>
          </Grid>

          <Grid
            item
            xs={4}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              id="outlined-controlled"
              value={penthouse}
              placeholder="Penthouse"
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setPenthouse(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Elevator" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Penthouse
            </Typography>
          </Grid>

          {/* <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-select-currency"
              slot=""
              select
              label="Furnishing"
              value={furnished}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setFurnished(event.target.value));
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
              size="small"
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
              size="small"
            >
              {details?.floorType?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-select-currency"
              select
              label="Frame Type"
              value={frameType}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setFrameType(event.target.value));
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
              size="small"
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
              id="outlined-select-currency"
              select
              label="Energy Class"
              value={energyClass}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setEnergyClass(event.target.value));
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
              size="small"
            >
              {details?.energyClass?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-select-currency"
              select
              label="Electricity"
              value={electricityType}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setElectricityType(event.target.value));
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
              size="small"
            >
              {details?.electricityType?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid> */}

          {/* <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-controlled"
              label="Store Rooms"
              value={Storerooms}
              placeholder="1,2,3..."
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setStorerooms(event.target.value));
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
            />
          </Grid> */}
        </Grid>
      </Grid>
    </Paper>
  );
};
export default PropertyDescriptionSection;
