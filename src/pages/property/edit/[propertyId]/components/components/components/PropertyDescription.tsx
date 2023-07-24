import {
  Checkbox,
  Divider,
  Grid,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useAllGlobalsQuery } from "src/services/global";
import {
  selectAccessibility,
  selectHasAttic,
  selectBathrooms,
  selectBedrooms,
  selectFloor,
  selectKitchens,
  selectLandUse,
  selectLayers,
  selectLivingRooms,
  selectNumOfWC,
  selectOrientation,
  selectPenthouse,
  selectPlayRoom,
  selectRooms,
  selectStoreroomBool,
  selectViewType,
  selectZoneType,
  setAccessibility,
  setHasAttic,
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
  setStoreroomBool,
  setViewType,
  setZoneType,
} from "src/slices/property";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";

const PropertyDescriptionSection: React.FC<any> = (props) => {
  const { data } = useAllGlobalsQuery();
  const enums: IGlobalProperty = data?.property as IGlobalProperty;
  const details = enums?.details as IGlobalPropertyDetails;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const hasAttic = useSelector(selectHasAttic);
  const playroom = useSelector(selectPlayRoom);
  const penthouse = useSelector(selectPenthouse);
  const landUse = useSelector(selectLandUse);
  const viewType = useSelector(selectViewType);
  const accessibility = useSelector(selectAccessibility);
  const zoneType = useSelector(selectZoneType);

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

  if (!enums || !details) return null;

  //set the values for BE
  const handleBedroomsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
    dispatch(setBedrooms(numericValue));
  };
  const handleLayersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
    dispatch(setLayers(numericValue));
  };
  const handleKitchensChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
    dispatch(setKitchens(numericValue));
  };
  const handleLivingRoomsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
    dispatch(setLivingRooms(numericValue));
  };
  const handleNumOfWCChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
    dispatch(setNumOfWC(numericValue));
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
          justifyContent: "left",
        }}
      >
        <Typography variant="h6">{"Property Description"}</Typography>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-select-currency"
              select
              label={t("Floor")}
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
            <TextField
              type="number"
              fullWidth
              id="outlined-controlled"
              label={t("Bedrooms")}
              placeholder="1,2,3..."
              value={bedrooms}
              onChange={handleBedroomsChange}
              onKeyPress={handleKeyPress}
              InputProps={{
                style: {
                  height: "38px",
                },
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              type="number"
              fullWidth
              id="outlined-controlled"
              label={t("Layers")}
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
              type="number"
              fullWidth
              id="outlined-controlled"
              label={t("Kitchens")}
              value={kitchens}
              placeholder="1,2,3..."
              onChange={handleKitchensChange}
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
              type="number"
              fullWidth
              id="outlined-controlled"
              label={t("Living Rooms")}
              value={livingRooms}
              placeholder="1,2,3..."
              onChange={handleLivingRoomsChange}
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
              type="number"
              fullWidth
              id="outlined-controlled"
              label={t("Number of WC")}
              value={numOfWC}
              placeholder="1,2,3..."
              onChange={handleNumOfWCChange}
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
              type="number"
              fullWidth
              id="outlined-controlled"
              label={t("Bathrooms")}
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
              id="outlined-select-currency"
              select
              label={t("View")}
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
              label={t("Accessibility")}
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
              label={t("Land Use")}
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
              label={t("Zone")}
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
              type="number"
              fullWidth
              id="outlined-controlled"
              label={t("Rooms")}
              value={rooms}
              placeholder="1,2,3..."
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
              label={t("Orientation")}
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
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              id="outlined-controlled"
              value={hasAttic}
              placeholder="Attic"
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setHasAttic(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Elevator" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              {t("Attic")}
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
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
              {t("Playroom")}
            </Typography>
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
              placeholder="storer room"
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
              {t("Storeroom")}
            </Typography>
          </Grid>

          <Grid
            item
            xs={3}
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
              {t("Penthouse")}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default PropertyDescriptionSection;
