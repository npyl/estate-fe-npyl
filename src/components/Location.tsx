import { Grid, Paper, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import OnlyNumbersInput from "src/components/OnlyNumbers";
import Map from "./Map/Map";

import { ILocationPOST } from "src/types/location";

interface ILocationSectionProps extends ILocationPOST
{
  // redux setters
  setStreet: ActionCreatorWithPayload<any, string>;
  setNumber: ActionCreatorWithPayload<any, string>;
  setCity: ActionCreatorWithPayload<any, string>;
  setComplex: ActionCreatorWithPayload<any, string>;
  setZipCode: ActionCreatorWithPayload<any, string>;
  setRegion: ActionCreatorWithPayload<any, string>;
  setCountry: ActionCreatorWithPayload<any, string>;
}

const LocationSection = (props: ILocationSectionProps) => {
  const dispatch = useDispatch();

  const [activeMarker, setActiveMarker] = useState(null);

  const { 
    street,
    number,
    city,
    complex,
    zipCode,
    region,
    country,

    setStreet,
    setNumber,
    setCity,
    setComplex,
    setZipCode,
    setRegion,
    setCountry,
  } = props;

  const handleChange = (setter: any, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(setter(event.target.value));
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    console.log(event.latLng?.lat());
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
        <Box display={"flex"} pb={2}>
          <Box height={`50vh`} width={"100%"}>
            <Map
              onClick={handleMapClick}
              activeMarker={activeMarker}
              setActiveMarker={setActiveMarker}
            />
          </Box>
        </Box >

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-controlled"
              label="Street"
              value={street}
              onChange={(event) => handleChange(setStreet, event)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-controlled"
              label="Number"
              value={number}
              onChange={(event) => handleChange(setNumber, event)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-controlled"
              label="City"
              value={city}
              onChange={(event) => handleChange(setCity, event)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-controlled"
              label="Complex"
              value={complex}
              onChange={(event) => handleChange(setComplex, event)}
            />
          </Grid>
          <Grid item xs={6}>
            <OnlyNumbersInput
              label="Zip Code"
              value={zipCode}
              onChange={(value) => dispatch(setZipCode(value))}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-controlled"
              label="Region"
              value={region}
              onChange={(event) => handleChange(setRegion, event)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-controlled"
              label="Country"
              value={country}
              onChange={(event) => handleChange(setCountry, event)}
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default LocationSection;
