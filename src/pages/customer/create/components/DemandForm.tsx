import {
  Grid,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";

import * as React from "react";

import {
  // setters
  setMinBedrooms,
  setMaxBedrooms,
  setMinBathrooms,
  setMaxBathrooms,
  setFurnished,
  setMaxCovered,
  setMinCovered,
  setMinPlot,
  setMaxPlot,
  setMinYearOfConstruction,
  setMaxYearOfConstruction,
  setMinFloor,
  setMaxFloor,
  setParentCategory,
  setState,
  setMinPrice,
  setMaxPrice,
  setTimeFrame,
  // getters
  selectMinBedrooms,
  selectMaxBedrooms,
  selectMinBathrooms,
  selectMaxBathrooms,
  selectFurnished,
  selectMaxCovered,
  selectMinCovered,
  selectMinPlot,
  selectMaxPlot,
  selectMinYearOfConstruction,
  selectMaxYearOfConstruction,
  selectMinFloor,
  selectMaxFloor,
  selectParentCategory,
  selectState,
  selectMinPrice,
  selectMaxPrice,
  selectTimeFrame,
} from "src/slices/customer";

import { useDispatch, useSelector } from "react-redux";

import { useAllPropertyGlobalQuery } from "src/services/global";

const DemandForm: React.FC<any> = (props) => {
  const enums = useAllPropertyGlobalQuery().data;
  const propertyEnums = enums?.property;
  const stateEnum = propertyEnums?.state;
  const detailsEnum = propertyEnums?.details;
  const parentCategoryEnum = propertyEnums?.parentCategory;
  const furnishingEnum = detailsEnum?.furnished;

  const timeframeEnum = ["1", "2"];

  const minBedrooms = useSelector(selectMinBedrooms);
  const maxBedrooms = useSelector(selectMaxBedrooms);
  const minBathrooms = useSelector(selectMinBathrooms);
  const maxBathrooms = useSelector(selectMaxBathrooms);
  const furnished = useSelector(selectFurnished);
  const maxCovered = useSelector(selectMaxCovered);
  const minCovered = useSelector(selectMinCovered);
  const minPlot = useSelector(selectMinPlot);
  const maxPlot = useSelector(selectMaxPlot);
  const minYearOfConstruction = useSelector(selectMinYearOfConstruction);
  const maxYearOfConstruction = useSelector(selectMaxYearOfConstruction);
  const minFloor = useSelector(selectMinFloor);
  const maxFloor = useSelector(selectMaxFloor);
  const parentCategory = useSelector(selectParentCategory);
  const state = useSelector(selectState);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);
  const timeFrame = useSelector(selectTimeFrame);

  const dispatch = useDispatch();

  if (
    !enums ||
    !propertyEnums ||
    !stateEnum ||
    !detailsEnum ||
    !furnishingEnum ||
    !parentCategoryEnum ||
    !timeframeEnum
  )
    return null;

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
        <Typography variant="h6">Demand Form</Typography>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-controlled"
              label="Autocomplete based on Property Code"
              //   value={plot}
              //   onChange={handlePlotChange}
              //   onKeyPress={handleKeyPress}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Parent Category</InputLabel>
              <Select
                value={parentCategory}
                label="Parent Category"
                onChange={(e) => {
                  dispatch(setParentCategory(e.target.value));
                }}
              >
                {parentCategoryEnum.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Furnishing</InputLabel>
              <Select
                value={furnished}
                label="Furnishing"
                onChange={(e) => {
                  dispatch(setFurnished(e.target.value));
                }}
              >
                {furnishingEnum.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>State</InputLabel>
              <Select
                value={state}
                label="State"
                onChange={(e) => {
                  dispatch(setState(e.target.value));
                }}
              >
                {stateEnum.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-controlled"
              label="Labels: TODO: ..."
              //   onChange={handleGardenChange}
              //   onKeyPress={handleKeyPress}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Time Frame</InputLabel>
              <Select
                value={timeFrame}
                label="Time Frame"
                onChange={(e) => {
                  dispatch(setTimeFrame(e.target.value));
                }}
              >
                {timeframeEnum.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>{" "}
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">Bedrooms</Typography>
            <Grid container direction={"row"} spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="outlined-controlled"
                  label="min"
                  value={minBedrooms}
                  onChange={(e) => {
                    dispatch(setMinBedrooms(e.target.value));
                  }}
                  //   onKeyPress={handleKeyPress}
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
                  label="max"
                  value={maxBedrooms}
                  onChange={(e) => {
                    dispatch(setMaxBedrooms(e.target.value));
                  }}
                  //   onKeyPress={handleKeyPress}
                  inputProps={{
                    style: {
                      height: "8px",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6">Bathrooms</Typography>
            <Grid container direction={"row"} spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="outlined-controlled"
                  label="min"
                  value={minBathrooms}
                  onChange={(e) => {
                    dispatch(setMinBathrooms(e.target.value));
                  }}
                  //   onKeyPress={handleKeyPress}
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
                  label="max"
                  value={maxBathrooms}
                  onChange={(e) => {
                    dispatch(setMaxBathrooms(e.target.value));
                  }}
                  //   onKeyPress={handleKeyPress}
                  inputProps={{
                    style: {
                      height: "8px",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6">Covered</Typography>
            <Grid container direction={"row"} spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="outlined-controlled"
                  label="min"
                  value={minCovered}
                  onChange={(e) => {
                    dispatch(setMinCovered(e.target.value));
                  }}
                  //   onKeyPress={handleKeyPress}
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
                  label="max"
                  value={maxCovered}
                  onChange={(e) => {
                    dispatch(setMaxCovered(e.target.value));
                  }}
                  //   onKeyPress={handleKeyPress}
                  inputProps={{
                    style: {
                      height: "8px",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6">Plot</Typography>
            <Grid container direction={"row"} spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="outlined-controlled"
                  label="min"
                  value={minPlot}
                  onChange={(e) => {
                    dispatch(setMinPlot(e.target.value));
                  }}
                  //   onKeyPress={handleKeyPress}
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
                  label="max"
                  value={maxPlot}
                  onChange={(e) => {
                    dispatch(setMaxPlot(e.target.value));
                  }}
                  //   onKeyPress={handleKeyPress}
                  inputProps={{
                    style: {
                      height: "8px",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6">Price</Typography>
            <Grid container direction={"row"} spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="outlined-controlled"
                  label="min"
                  value={minPrice}
                  onChange={(e) => {
                    dispatch(setMinPrice(e.target.value));
                  }}
                  //   onKeyPress={handleKeyPress}
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
                  label="max"
                  value={maxPrice}
                  onChange={(e) => {
                    dispatch(setMaxPrice(e.target.value));
                  }}
                  //   onKeyPress={handleKeyPress}
                  inputProps={{
                    style: {
                      height: "8px",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6">Floor</Typography>
            <Grid container direction={"row"} spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="outlined-controlled"
                  label="min"
                  value={minFloor}
                  onChange={(e) => {
                    dispatch(setMinFloor(e.target.value));
                  }}
                  //   onKeyPress={handleKeyPress}
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
                  label="max"
                  value={maxFloor}
                  onChange={(e) => {
                    dispatch(setMaxFloor(e.target.value));
                  }}
                  //   onKeyPress={handleKeyPress}
                  inputProps={{
                    style: {
                      height: "8px",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6">Year of Construction</Typography>
            <Grid container direction={"row"} spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="outlined-controlled"
                  label="min"
                  value={minYearOfConstruction}
                  onChange={(e) => {
                    dispatch(setMinYearOfConstruction(e.target.value));
                  }}
                  //   onKeyPress={handleKeyPress}
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
                  label="max"
                  value={maxYearOfConstruction}
                  onChange={(e) => {
                    dispatch(setMaxYearOfConstruction(e.target.value));
                  }}
                  //   onKeyPress={handleKeyPress}
                  inputProps={{
                    style: {
                      height: "8px",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default DemandForm;
