import * as React from "react";
import Typography from "@mui/material/Typography";
import { Grid, Paper, TextField, MenuItem } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Checkbox from "@mui/material/Checkbox";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";

import { useDispatch } from "react-redux";
import {
  selectYearOfConstruction,
  selectUnderConstruction,
  selectNewlyBuilt,
  selectIncomplete,
  selectTotalFloorNumber,
  selectElevator,
  selectInternalStairs,
  selectNeoclassical,
  selectYearOfRenovation,
  selectRenovated,
  selectNeedsRenovation,
  selectPreserved,
  setYearOfConstruction,
  setUnderConstruction,
  setNewlyBuilt,
  setIncomplete,
  setTotalFloorNumber,
  setElevator,
  setInternalStairs,
  setNeoclassical,
  setYearOfRenovation,
  setRenovated,
  setNeedsRenovation,
  setPreserved,
  setAvailableAfter,
} from "src/slices/property";
import { DatePicker } from "@mui/lab";
import { useState } from "react";

const ConstructionForCommercialSection: React.FC<any> = (props) => {
  const enums = props.enums as IGlobalProperty;
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
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setYearOfConstruction(event.target.value));
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
              label="Year of Renovation"
              value={yearOfRenovation}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setYearOfRenovation(event.target.value));
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
              size="small"
            >
              {/* //TODO: 1,2,3,4,5,6,7,8,9,10 dropdown and sent to the be as string  */}
              {details?.viewType?.map((option) => (
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
              Under Constraction
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
