import { Grid, MenuItem, Paper, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
import { useSelector } from "react-redux";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";

import { useDispatch } from "react-redux";
import {
  selectElevator,
  selectIncomplete,
  selectInternalStairs,
  selectNeedsRenovation,
  selectNeoclassical,
  selectNewlyBuilt,
  selectPreserved,
  selectRenovated,
  selectTotalFloorNumber,
  selectUnderConstruction,
  selectYearOfConstruction,
  selectYearOfRenovation,
  setIncomplete,
  setInternalStairs,
  setNeedsRenovation,
  setNeoclassical,
  setNewlyBuilt,
  setPreserved,
  setRenovated,
  setTotalFloorNumber,
  setUnderConstruction,
  setYearOfConstruction,
  setYearOfRenovation,
} from "src/slices/property";
import { useAllGlobalsQuery } from "src/services/global";

const ConstructionForCommercialSection: React.FC<any> = (props) => {
  const { data } = useAllGlobalsQuery();
  const enums: IGlobalProperty = data?.property as IGlobalProperty;
  const details = enums?.details as IGlobalPropertyDetails;

  const dispatch = useDispatch();

  const yearOfConstruction = useSelector(selectYearOfConstruction);
  const underConstruction = useSelector(selectUnderConstruction);
  const newlyBuilt = useSelector(selectNewlyBuilt);
  const incomplete = useSelector(selectIncomplete);
  const totalFloorNumber = useSelector(selectTotalFloorNumber);
  const elevator = useSelector(selectElevator);
  const internalStairs = useSelector(selectInternalStairs);
  const neoclassical = useSelector(selectNeoclassical);
  const yearOfRenovation = useSelector(selectYearOfRenovation);
  const renovated = useSelector(selectRenovated);
  const needsRenovation = useSelector(selectNeedsRenovation);
  const preserved = useSelector(selectPreserved);
  // const [selectYearOfConstruction, setYearOfConstruction] =
  //   useState<Date | null>(new Date());

  if (!details || !details.heatingSystem || !details.heatingType) return null;

  //set the values for BE
  const handleYearOfConstructionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
    dispatch(setYearOfConstruction(numericValue));
  };
  const handleYearOfRenovationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
    dispatch(setYearOfRenovation(numericValue));
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
        <Typography variant="h6">Construction</Typography>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-controlled"
              label="Year of Construction"
              value={yearOfConstruction}
              onChange={handleYearOfConstructionChange}
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
              label="Year of Renovation"
              value={yearOfRenovation}
              onChange={handleYearOfRenovationChange}
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
              label="Total Floor Number"
              value={totalFloorNumber}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setTotalFloorNumber(event.target.value));
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
            >
              {[...Array(10)].map((_, index) => {
                const value = String(index + 1); // Here we are converting number to string
                return (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                );
              })}
            </TextField>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={underConstruction}
              checked={underConstruction}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setUnderConstruction(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Under Construction" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Under Construction
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={renovated}
              checked={renovated}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setRenovated(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Rrenovated" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Renovated
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={needsRenovation}
              checked={needsRenovation}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setNeedsRenovation(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Needs Renivation" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Needs Renovation
            </Typography>
          </Grid>

          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={internalStairs}
              checked={internalStairs}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setInternalStairs(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Internal stairs" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Internal Stairs
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={newlyBuilt}
              checked={newlyBuilt}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setNewlyBuilt(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Newly Build" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Newly Build
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={incomplete}
              checked={incomplete}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setIncomplete(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Incomplete" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Incomplete
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={neoclassical}
              checked={neoclassical}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setNeoclassical(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Neoclassical" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Neoclassical
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={preserved}
              checked={preserved}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setPreserved(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Preserved" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Preserved
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default ConstructionForCommercialSection;
