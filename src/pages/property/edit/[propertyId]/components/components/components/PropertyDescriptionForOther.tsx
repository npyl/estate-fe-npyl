import { Checkbox, Grid, MenuItem, Paper, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAllGlobalsQuery } from "src/services/global";
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
  selectSea,
  selectStoreroomBool,
  selectViewType,
  selectZoneType,
  setAccessibility,
  setBathrooms,
  setFloor,
  setLandUse,
  setLayers,
  setOrientation,
  setPlayRoom,
  setRooms,
  setStoreroomBool,
  setViewType,
  setZoneType,
} from "src/slices/property";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";
const ariaLabel = { "aria-label": "description" };
const PropertyDescriptionForOtherSection: React.FC<any> = (props) => {
  const { data } = useAllGlobalsQuery();
  const enums: IGlobalProperty = data?.property as IGlobalProperty;
  const details = enums?.details as IGlobalPropertyDetails;

  const dispatch = useDispatch();
  const sea = useSelector(selectSea);
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
  const storeroomBool = useSelector(selectStoreroomBool);
  const rooms = useSelector(selectRooms);
  const orientation = useSelector(selectOrientation);
  const floor = useSelector(selectFloor);

  if (!details) return null;

  //set the values for BE

  const handleLayersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
    dispatch(setLayers(numericValue));
  };

  const handleBathroomsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
    dispatch(setBathrooms(numericValue));
  };
  const handleRoomsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
    dispatch(setRooms(numericValue));
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
        <Typography variant="h6">Property Description</Typography>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-select-currency"
              select
              label="Floor"
              value={floor}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setFloor(event.target.value));
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
              size="small"
            >
              {details?.floors?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            {/* <> */}
            <TextField
              fullWidth
              id="outlined-controlled"
              label="Layers"
              value={layers}
              placeholder="1,2,3..."
              onChange={handleLayersChange}
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
              label="Bathrooms"
              value={bathrooms}
              placeholder="1,2,3..."
              onChange={handleBathroomsChange}
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
              label="Rooms"
              value={rooms}
              onChange={handleRoomsChange}
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
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              id="outlined-controlled"
              value={storeroomBool}
              placeholder="Play Room"
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setStoreroomBool(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Elevator" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Storeroom
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default PropertyDescriptionForOtherSection;
