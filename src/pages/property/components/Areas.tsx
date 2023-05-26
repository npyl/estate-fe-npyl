import { Grid, Paper, Typography, Box } from "@mui/material";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectAttic,
  selectBalconiesArea,
  selectBasement,
  selectCovered,
  selectGarden,
  selectPlotArea,
  selectStoreroom,
  setAttic,
  setBalconies,
  setBasement,
  setCovered,
  setGarden,
  setPlotArea,
  setStoreroom,
} from "src/slices/property";

import OnlyNumbersInput from "./OnlyNumbers";

const AreasSection: React.FC<any> = () => {
  const dispatch = useDispatch();

  const plot = useSelector(selectPlotArea);
  const covered = useSelector(selectCovered);
  const basement = useSelector(selectBasement);
  const attic = useSelector(selectAttic);
  const garden = useSelector(selectGarden);
  const balconies = useSelector(selectBalconiesArea);
  const storeroom = useSelector(selectStoreroom);

  return (
    <Paper
      elevation={10}
      sx={{
        overflow: "auto",
        padding: 0.5,
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 1.5,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">Areas</Typography>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <OnlyNumbersInput label="Plot" value={plot} adornment="m²" onChange={(value) => {
              dispatch(setPlotArea(value));
            }} />
          </Grid>
          <Grid item xs={6}>
            <OnlyNumbersInput label="Covered" value={covered} adornment="m²" onChange={(value) => {
              dispatch(setCovered(value));
            }} />
          </Grid>
          <Grid item xs={6}>
            <OnlyNumbersInput label="Basement" value={basement} adornment="m²" onChange={(value) => {
              dispatch(setBasement(value));
            }} />
          </Grid>
          <Grid item xs={6}>
            <OnlyNumbersInput label="Attic" value={attic} adornment="m²" onChange={(value) => {
              dispatch(setAttic(value));
            }} />
          </Grid>
          <Grid item xs={6}>
            <OnlyNumbersInput label="Garden" value={garden} adornment="m²" onChange={(value) => {
              dispatch(setGarden(value));
            }} />
          </Grid>
          <Grid item xs={6}>
            <OnlyNumbersInput label="Balconies" value={balconies} adornment="m²" onChange={(value) => {
              dispatch(setBalconies(value));
            }} />
          </Grid>
          <Grid item xs={6}>
            <OnlyNumbersInput label="Storeroom" value={storeroom} adornment="m²" onChange={(value) => {
              dispatch(setStoreroom(value));
            }} />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default AreasSection;
