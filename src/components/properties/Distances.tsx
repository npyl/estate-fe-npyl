import * as React from "react";
import Typography from "@mui/material/Typography";
import { Grid, Paper, TextField, MenuItem, List } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";

import { useDispatch } from "react-redux";
import {
  selectPublicTransportation,
  selectSea,
  selectSchools,
  selectSupermarket,
  selectCafeRestaurant,
  selectHospital,
  selectAirport,
  setPublicTransportation,
  setSea,
  setSchools,
  setSupermarket,
  setCafeRestaurant,
  setHospital,
  setAirport,
} from "src/slices/property";

const DistancesSection: React.FC<any> = (props) => {
  const enums = props.enums as IGlobalProperty;
  const details = enums?.details as IGlobalPropertyDetails;

  const dispatch = useDispatch();

  const publicTransportation = useSelector(selectPublicTransportation);
  const schools = useSelector(selectSchools);
  const supermarket = useSelector(selectSupermarket);
  const cafeRestaurant = useSelector(selectCafeRestaurant);
  const hospital = useSelector(selectHospital);
  const airport = useSelector(selectAirport);
  const sea = useSelector(selectSea);

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
        <Typography variant="h6">Distances</Typography>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-controlled"
              label="Public Transportation"
              value={publicTransportation}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setPublicTransportation(event.target.value));
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">km</InputAdornment>
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
              label="Sea"
              value={sea}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setSea(event.target.value));
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">km</InputAdornment>
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
              label="Schools"
              value={schools}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setSchools(event.target.value));
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">km</InputAdornment>
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
              label="Supermarket"
              value={supermarket}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setSupermarket(event.target.value));
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">km</InputAdornment>
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
              label="Cafe-Restaurant"
              value={cafeRestaurant}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setCafeRestaurant(event.target.value));
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">km</InputAdornment>
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
              label="Hospital"
              value={hospital}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setHospital(event.target.value));
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">km</InputAdornment>
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
              label="Airport"
              value={airport}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setAirport(event.target.value));
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">km</InputAdornment>
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
export default DistancesSection;
