import {
  Autocomplete,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import * as React from "react";

import {
  selectFurnished,
  selectMaxBathrooms,
  selectMaxBedrooms,
  selectMaxCovered,
  selectMaxFloor,
  selectMaxPlot,
  selectMaxPrice,
  selectMaxYearOfConstruction,
  selectMinBathrooms,
  // getters
  selectMinBedrooms,
  selectMinCovered,
  selectMinFloor,
  selectMinPlot,
  selectMinPrice,
  selectMinYearOfConstruction,
  selectParentCategory,
  selectState,
  selectTimeFrame,
  setFurnished,
  setMaxBathrooms,
  setMaxBedrooms,
  setMaxCovered,
  setMaxFloor,
  setMaxPlot,
  setMaxPrice,
  setMaxYearOfConstruction,
  setMinBathrooms,
  setMinBedrooms,
  setMinCovered,
  setMinFloor,
  setMinPlot,
  setMinPrice,
  setMinYearOfConstruction,
  setParentCategory,
  setState,
  setTimeFrame,
} from "src/slices/customer";

import { useDispatch, useSelector } from "react-redux";

import { useMemo, useState } from "react";

import { useAllPropertyGlobalQuery } from "src/services/global";
import { useAllPropertiesQuery } from "src/services/properties";

import { IProperties } from "src/types/properties";

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

  const [searchText, setSearchText] = useState<string>("");
  const [autocompleteValue, setAutocompleteValue] = useState("");

  const autocompleteChange = (_event: any, value: string) => {
    if (!value) return;
    setAutocompleteValue(value);
  };
  const handleSearch = (value: string) => {
    if (!value) return;
    if (value.length < 3) return;

    setSearchText(value);
  };

  const propertyCodes: string[] =
    useAllPropertiesQuery(undefined, {
      selectFromResult: ({ data }) => ({
        data: data
          ?.filter((property) => property.code !== null)
          .map((property) => {
            return property.code.toString();
          }),
      }),
    }).data || [];
  const allProperties: IProperties[] = useAllPropertiesQuery().data || [];

  // everytime the autocomplete's value is updated, fetch a property
  useMemo(() => {
    const propertyForCode = (code: string) => {
      return allProperties.find(
        (property) => property.code && property.code.toString() === code
      );
    };

    // the autocomplete's value is code
    const code = autocompleteValue;
    const property = propertyForCode(code);

    if (!property) return null;

    dispatch(setParentCategory(property.parentCategory));
    dispatch(setFurnished(property.technicalFeatures.furnished));
    dispatch(setState(property.state));
    // dispatch(setTimeFrame());
    dispatch(setMinBedrooms(property.details.bedrooms));
    // dispatch(setMaxBedrooms(property));
    dispatch(setMinBathrooms(property.details.bathrooms));
    // dispatch(setMaxBathrooms(property));
    dispatch(setMinCovered(property.technicalFeatures.coverageFactor));
    // dispatch(setMaxCovered(property));
    dispatch(setMinPlot(property.plotArea));
    // dispatch(setMaxPlot(property));
    dispatch(setMinPrice(property.price));
    // dispatch(setMaxPrice(property));
    dispatch(setMinFloor(property.details.floor));
    // dispatch(setMaxFloor(property));
    dispatch(
      setMinYearOfConstruction(property.construction.yearOfConstruction)
    );
    // dispatch(setMaxYearOfConstruction(property));
  }, [autocompleteValue]);

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
        <Typography variant='h6'>Demand Form</Typography>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Autocomplete
              disablePortal
              id='combo-box-demo'
              value={autocompleteValue}
              onChange={autocompleteChange}
              options={propertyCodes}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder='Property Code'
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleSearch(event.target.value);
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Parent Category</InputLabel>
              <Select
                value={parentCategory}
                label='Parent Category'
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
                label='Furnishing'
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
                label='State'
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
              id='outlined-controlled'
              label='Labels: TODO: ...'
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
                label='Time Frame'
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
            <Typography variant='h6'>Bedrooms</Typography>
            <Grid container direction={"row"} spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id='outlined-controlled'
                  label='min'
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
                  id='outlined-controlled'
                  label='max'
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
            <Typography variant='h6'>Bathrooms</Typography>
            <Grid container direction={"row"} spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id='outlined-controlled'
                  label='min'
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
                  id='outlined-controlled'
                  label='max'
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
            <Typography variant='h6'>Covered</Typography>
            <Grid container direction={"row"} spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id='outlined-controlled'
                  label='min'
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
                  id='outlined-controlled'
                  label='max'
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
            <Typography variant='h6'>Plot</Typography>
            <Grid container direction={"row"} spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id='outlined-controlled'
                  label='min'
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
                  id='outlined-controlled'
                  label='max'
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
            <Typography variant='h6'>Price</Typography>
            <Grid container direction={"row"} spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id='outlined-controlled'
                  label='min'
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
                  id='outlined-controlled'
                  label='max'
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
            <Typography variant='h6'>Floor</Typography>
            <Grid container direction={"row"} spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id='outlined-controlled'
                  label='min'
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
                  id='outlined-controlled'
                  label='max'
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
            <Typography variant='h6'>Year of Construction</Typography>
            <Grid container direction={"row"} spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id='outlined-controlled'
                  label='min'
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
                  id='outlined-controlled'
                  label='max'
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
