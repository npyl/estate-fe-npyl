import { Grid, Paper, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
import { useSelector } from "react-redux";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";

import { useDispatch } from "react-redux";
import {
  selectCity,
  selectComplex,
  selectCountry,
  selectNumber,
  selectOrientation,
  selectRegion,
  selectStreet,
  selectZipCode,
  setCity,
  setComplex,
  setCountry,
  setNumber,
  setRegion,
  setStreet,
  setZipCode,
} from "src/slices/property";
import { useAllPropertyGlobalQuery } from "src/services/global";

const LocationSection: React.FC<any> = (props) => {
  const { data } = useAllPropertyGlobalQuery();
  const enums: IGlobalProperty = data?.property as IGlobalProperty;
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
  //set the values for BE
  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
    dispatch(setNumber(numericValue));
  };
  const handleZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
    dispatch(setZipCode(numericValue));
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
        <Typography variant="h6">Location</Typography>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {/* <> */}
            <TextField
              fullWidth
              id="outlined-controlled"
              label="Street"
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
              label="Number"
              value={number}
              onChange={handleNumberChange}
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
              label="City"
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
              label="Zip Code"
              value={zipCode}
              onChange={handleZipCodeChange}
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
              label="Region"
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
              label="Country"
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
        </Grid>
      </Grid>
    </Paper>
  );
};
export default LocationSection;
