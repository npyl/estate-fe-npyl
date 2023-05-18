import {
  Grid,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
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
} from "src/slices/customer";

import { useDispatch } from "react-redux";

import { useAllPropertyGlobalQuery } from "src/services/global";
import { setBedrooms } from "src/slices/property";

const DemandForm: React.FC<any> = (props) => {
  const enums = useAllPropertyGlobalQuery().data;
  const propertyEnums = enums?.property;
  const stateEnum = propertyEnums?.state;
  const detailsEnum = propertyEnums?.details;
  const parentCategoryEnum = propertyEnums?.parentCategory;
  const furnishingEnum = detailsEnum?.furnished;

  const timeframeEnum = ["1", "2"];

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
                // value={parentCategory}
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
                // value={parentCategory}
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
                // value={parentCategory}
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
                // value={parentCategory}
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
                  value={selectMinBedrooms}
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
                  value={selectMaxBedrooms}
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
                  value={selectMinBathrooms}
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
                  value={selectMaxBathrooms}
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
                  value={selectMinCovered}
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
                  value={selectMaxCovered}
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
                  value={selectMinPlot}
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
                  value={selectMaxPlot}
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
                  value={selectMinPrice}
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
                  value={selectMaxPrice}
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
                  value={selectMinFloor}
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
                  value={selectMaxFloor}
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
                  value={selectMinYearOfConstruction}
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
                  value={selectMaxYearOfConstruction}
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
