import * as React from "react";
import Typography from "@mui/material/Typography";
import { Grid, Paper, TextField, MenuItem, List } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";

import { useDispatch } from "react-redux";
import {
  selectPlot,
  selectCovered,
  selectBasement,
  selectAttic,
  selectGarden,
  selectBalconies,
  selectStoreRoom,
  setPlot,
  setBasement,
  setAttic,
  setGarden,
  setBalconies,
  setStoreRoom,
  setCovered,
} from "src/slices/property";

const AreasSection: React.FC<any> = (props) => {
  const enums = props.enums as IGlobalProperty;
  const details = enums?.details as IGlobalPropertyDetails;

  const dispatch = useDispatch();

  const plot = useSelector(selectPlot);
  const covered = useSelector(selectCovered);
  const basement = useSelector(selectBasement);
  const attic = useSelector(selectAttic);
  const garden = useSelector(selectGarden);
  const balconies = useSelector(selectBalconies);
  const storeRoom = useSelector(selectStoreRoom);

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

      <Grid item xs={12}>
        <Grid container item spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-controlled"
              label="Plot"
              value={plot}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setPlot(event.target.value));
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">m²</InputAdornment>
                ),
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
              label="Covered"
              value={covered}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setCovered(event.target.value));
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">m²</InputAdornment>
                ),
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
              label="Basement"
              value={basement}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setBasement(event.target.value));
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">m²</InputAdornment>
                ),
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
              label="Attic"
              value={attic}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setAttic(event.target.value));
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">m²</InputAdornment>
                ),
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
              label="Garden"
              value={garden}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setGarden(event.target.value));
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">m²</InputAdornment>
                ),
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
              label="Balconies"
              value={balconies}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setBalconies(event.target.value));
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">m²</InputAdornment>
                ),
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
              label="Storeroom"
              value={storeRoom}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setStoreRoom(event.target.value));
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">m²</InputAdornment>
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
export default AreasSection;
