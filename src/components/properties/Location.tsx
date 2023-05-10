import * as React from "react";
import Typography from "@mui/material/Typography";
import { Grid, Paper, TextField, MenuItem } from "@mui/material";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";

import { useDispatch } from "react-redux";
import {
  selectStreet,
  selectNumber,
  selectCity,
  selectComplex,
  selectZipCode,
  selectRegion,
  selectCountry,
  selectOrientation,
  setStreet,
  setNumber,
  setCity,
  setComplex,
  setZipCode,
  setRegion,
  setCountry,
  setOrientation,
} from "src/slices/property";

const LocationSection: React.FC<any> = (props) => {
  const enums = props.enums as IGlobalProperty;
  const details = enums?.details as IGlobalPropertyDetails;

  const dispatch = useDispatch();

  const street = useSelector(selectStreet);
  const number = useSelector(selectNumber);
  const city = useSelector(selectCity);
  const complex = useSelector(selectComplex);
  const zipCode = useSelector(selectZipCode);
  const region = useSelector(selectRegion);
  const country = useSelector(selectCountry);
  const orientation = useSelector(selectOrientation);

  if (!details || !details.orientation) return null;

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
        <Typography variant="h6">Location</Typography>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {/* <> */}
            <TextField
              fullWidth
              id="outlined-controlled"
              label="Street*"
              value={street}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setStreet(event.target.value));
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
              label="Number*"
              value={number}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setNumber(event.target.value));
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
              label="City*"
              value={city}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setCity(event.target.value));
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
              label="Complex"
              value={complex}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setComplex(event.target.value));
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
              label="Zip Code*"
              value={zipCode}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setZipCode(event.target.value));
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
              label="Region*"
              value={region}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setRegion(event.target.value));
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
              label="Country*"
              value={country}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setCountry(event.target.value));
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
            />
          </Grid>
          {/* <Grid item xs={6}>
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
          </Grid> */}
        </Grid>
      </Grid>
    </Paper>
  );
};
export default LocationSection;
