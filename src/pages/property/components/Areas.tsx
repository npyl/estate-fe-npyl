import { Grid, Paper, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
import { useSelector } from "react-redux";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";

import { useDispatch } from "react-redux";
import {
  selectAttic,
  selectBalconies,
  selectBasement,
  selectCovered,
  selectGarden,
  selectPlot,
  selectStoreroom,
  setAttic,
  setBalconies,
  setBasement,
  setCovered,
  setGarden,
  setPlot,
  setStoreroom,
} from "src/slices/property";
import { useAllPropertyGlobalQuery } from "src/services/global";

const AreasSection: React.FC<any> = (props) => {
  const { data } = useAllPropertyGlobalQuery();
  const enums: IGlobalProperty = data?.property as IGlobalProperty;
  const details = enums?.details as IGlobalPropertyDetails;

  const dispatch = useDispatch();

  const plot = useSelector(selectPlot);
  const covered = useSelector(selectCovered);
  const basement = useSelector(selectBasement);
  const attic = useSelector(selectAttic);
  const garden = useSelector(selectGarden);
  const balconies = useSelector(selectBalconies);
  const storeroom = useSelector(selectStoreroom);

  //set the values for BE
  const handlePlotChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
    dispatch(setPlot(numericValue));
  };
  const handleCoveredChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
    dispatch(setCovered(numericValue));
  };
  const handleBasementChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
    dispatch(setBasement(numericValue));
  };
  const handleAtticChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
    dispatch(setAttic(numericValue));
  };
  const handleGardenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
    dispatch(setGarden(numericValue));
  };
  const handleBalconiesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
    dispatch(setBalconies(numericValue));
  };
  const handleStoreroomChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
    dispatch(setStoreroom(numericValue));
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
            <TextField
              fullWidth
              id="outlined-controlled"
              label="Plot"
              value={plot}
              onChange={handlePlotChange}
              onKeyPress={handleKeyPress}
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
              onChange={handleCoveredChange}
              onKeyPress={handleKeyPress}
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
              onChange={handleBasementChange}
              onKeyPress={handleKeyPress}
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
              onChange={handleAtticChange}
              onKeyPress={handleKeyPress}
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
              onChange={handleGardenChange}
              onKeyPress={handleKeyPress}
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
              onChange={handleBalconiesChange}
              onKeyPress={handleKeyPress}
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
              value={storeroom}
              onChange={handleStoreroomChange}
              onKeyPress={handleKeyPress}
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
