import { Grid, Paper, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
import { useSelector } from "react-redux";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";

import { useDispatch } from "react-redux";
import {
  selectAirport,
  selectCafeRestaurant,
  selectHospital,
  selectPublicTransportation,
  selectSchools,
  selectSea,
  selectSupermarket,
  setAirport,
  setCafeRestaurant,
  setHospital,
  setPublicTransportation,
  setSchools,
  setSea,
  setSupermarket,
} from "src/slices/property";
import { useAllPropertyGlobalQuery } from "src/services/global";

const DistancesSection: React.FC<any> = (props) => {
  const { data } = useAllPropertyGlobalQuery();
  const enums: IGlobalProperty = data?.property as IGlobalProperty;
  const details = enums?.details as IGlobalPropertyDetails;

  const dispatch = useDispatch();

  const publicTransportation = useSelector(selectPublicTransportation);
  const schools = useSelector(selectSchools);
  const supermarket = useSelector(selectSupermarket);
  const cafeRestaurant = useSelector(selectCafeRestaurant);
  const hospital = useSelector(selectHospital);
  const airport = useSelector(selectAirport);
  const sea = useSelector(selectSea);

  //set the values for BE
  const handlePublicTransportationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
    dispatch(setPublicTransportation(numericValue));
  };
  const handleSeaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
    dispatch(setSea(numericValue));
  };
  const handleSchoolsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
    dispatch(setSchools(numericValue));
  };
  const handleSupermarketChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
    dispatch(setSupermarket(numericValue));
  };
  const handleCafeRestaurantChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
    dispatch(setCafeRestaurant(numericValue));
  };
  const handleHospitalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
    dispatch(setHospital(numericValue));
  };
  const handleAirportChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
    dispatch(setAirport(numericValue));
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
              onChange={handlePublicTransportationChange}
              onKeyPress={handleKeyPress}
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
              onChange={handleSeaChange}
              onKeyPress={handleKeyPress}
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
              onChange={handleSchoolsChange}
              onKeyPress={handleKeyPress}
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
              onChange={handleSupermarketChange}
              onKeyPress={handleKeyPress}
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
              onChange={handleCafeRestaurantChange}
              onKeyPress={handleKeyPress}
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
              onChange={handleHospitalChange}
              onKeyPress={handleKeyPress}
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
              onChange={handleAirportChange}
              onKeyPress={handleKeyPress}
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
