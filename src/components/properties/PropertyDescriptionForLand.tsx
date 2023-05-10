import { Grid, MenuItem, Paper, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
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
  selectSea,
  selectStorerooms,
  selectViewType,
  selectZoneType,
  setAccessibility,
  setLandUse,
  setOrientation,
  setSea,
} from "src/slices/property";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";
const ariaLabel = { "aria-label": "description" };
const PropertyDescriptionForLandSection: React.FC<any> = (props) => {
  const enums = props.enums as IGlobalProperty;
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
              id='outlined-controlled'
              label=' Distance From Sea'
              value={sea}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setSea(event.target.value));
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>km</InputAdornment>
                ),
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default PropertyDescriptionForLandSection;
