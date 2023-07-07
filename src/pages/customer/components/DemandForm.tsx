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
  selectBuyer,
  selectFurnished,
  // getters
  selectLeaser,
  selectMaxBathrooms,
  selectMaxBedrooms,
  selectMaxCovered,
  selectMaxFloor,
  selectMaxPlot,
  selectMaxPrice,
  selectMaxYearOfConstruction,
  selectMinBathrooms,
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
  setDemandLabels,
} from "src/slices/customer";

import { useDispatch, useSelector } from "react-redux";

import { FC, useEffect, useMemo, useState } from "react";

import { useAllGlobalsQuery } from "src/services/global";
import { useAllPropertiesQuery, useGetPropertyByCodeQuery } from "src/services/properties";

import OnlyNumbersInput from "src/pages/property/components/OnlyNumbers";
import { LabelSelect } from "./LabelSelect";

const DemandForm: FC = () => {
  const enums = useAllGlobalsQuery().data;
  const propertyEnums = enums?.property;
  const stateEnum = propertyEnums?.state;
  const detailsEnum = propertyEnums?.details;
  const parentCategoryEnum = propertyEnums?.parentCategory;
  const furnishingEnum = detailsEnum?.furnished;
  const timeframeEnum = enums?.customer?.timeframe;

  const minBedrooms = useSelector(selectMinBedrooms) || 0;
  const maxBedrooms = useSelector(selectMaxBedrooms) || 0;
  const minBathrooms = useSelector(selectMinBathrooms) || 0;
  const maxBathrooms = useSelector(selectMaxBathrooms) || 0;
  const furnished = useSelector(selectFurnished) || "";
  const maxCovered = useSelector(selectMaxCovered) || 0;
  const minCovered = useSelector(selectMinCovered) || 0;
  const minPlot = useSelector(selectMinPlot) || 0;
  const maxPlot = useSelector(selectMaxPlot) || 0;
  const minYearOfConstruction = useSelector(selectMinYearOfConstruction) || 0;
  const maxYearOfConstruction = useSelector(selectMaxYearOfConstruction) || 0;
  const minFloor = useSelector(selectMinFloor) || 0;
  const maxFloor = useSelector(selectMaxFloor) || 0;
  const parentCategory = useSelector(selectParentCategory) || "";
  const state = useSelector(selectState) || "";
  const minPrice = useSelector(selectMinPrice) || 0;
  const maxPrice = useSelector(selectMaxPrice) || 0;
  const timeFrame = useSelector(selectTimeFrame) || "";

  const leaser = useSelector(selectLeaser);
  const buyer = useSelector(selectBuyer);

  const dispatch = useDispatch();

  const [autocompleteValue, setAutocompleteValue] = useState("");

  const autocompleteChange = (_event: any, value: string | null) => {
    if (!value) return;
    setAutocompleteValue(value);
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

  const { data: propertyForCode, isSuccess: isPropertyForCodeSuccess } = useGetPropertyByCodeQuery(+autocompleteValue, {
    skip: autocompleteValue === ""
  }) || {};

  // everytime the autocomplete's value is updated, fetch a property
  useEffect(() => {
    const property = propertyForCode;

    console.log('wtf: ', property);

    if (!property) return;

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

    // TODO:
    // dispatch(setDemandLabels(property.labels));

    // dispatch(setMaxYearOfConstruction(property));
  }, [isPropertyForCodeSuccess]);

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

  return leaser || buyer ? (
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
            <LabelSelect />
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
                <OnlyNumbersInput
                  label='min'
                  value={minBedrooms}
                  onChange={(value) => {
                    dispatch(setMinBedrooms(value));
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <OnlyNumbersInput
                  label='max'
                  value={maxBedrooms}
                  onChange={(value) => {
                    dispatch(setMaxBedrooms(value));
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Typography variant='h6'>Bathrooms</Typography>
            <Grid container direction={"row"} spacing={1}>
              <Grid item xs={6}>
                <OnlyNumbersInput
                  label='min'
                  value={minBathrooms}
                  onChange={(value) => {
                    dispatch(setMinBathrooms(value));
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <OnlyNumbersInput
                  label='max'
                  value={maxBathrooms}
                  onChange={(value) => {
                    dispatch(setMaxBathrooms(value));
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Typography variant='h6'>Covered</Typography>
            <Grid container direction={"row"} spacing={1}>
              <Grid item xs={6}>
                <OnlyNumbersInput
                  label='min'
                  value={minCovered}
                  onChange={(value) => {
                    dispatch(setMinCovered(value));
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <OnlyNumbersInput
                  label='max'
                  value={maxCovered}
                  onChange={(value) => {
                    dispatch(setMaxCovered(value));
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Typography variant='h6'>Plot</Typography>
            <Grid container direction={"row"} spacing={1}>
              <Grid item xs={6}>
                <OnlyNumbersInput
                  label='min'
                  value={minPlot}
                  onChange={(value) => {
                    dispatch(setMinPlot(value));
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <OnlyNumbersInput
                  label='max'
                  value={maxPlot}
                  onChange={(value) => {
                    dispatch(setMaxPlot(value));
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Typography variant='h6'>Price</Typography>
            <Grid container direction={"row"} spacing={1}>
              <Grid item xs={6}>
                <OnlyNumbersInput
                  label='min'
                  value={minPrice}
                  onChange={(value) => {
                    dispatch(setMinPrice(value));
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <OnlyNumbersInput
                  label='max'
                  value={maxPrice}
                  onChange={(value) => {
                    dispatch(setMaxPrice(value));
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Typography variant='h6'>Floor</Typography>
            <Grid container direction={"row"} spacing={1}>
              <Grid item xs={6}>
                <OnlyNumbersInput
                  label='min'
                  value={minFloor}
                  onChange={(value) => {
                    dispatch(setMinFloor(value));
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <OnlyNumbersInput
                  label='max'
                  value={maxFloor}
                  onChange={(value) => {
                    dispatch(setMaxFloor(value));
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Typography variant='h6'>Year of Construction</Typography>
            <Grid container direction={"row"} spacing={1}>
              <Grid item xs={6}>
                <OnlyNumbersInput
                  label='min'
                  value={minYearOfConstruction}
                  onChange={(value) => {
                    dispatch(setMinYearOfConstruction(value));
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <OnlyNumbersInput
                  label='max'
                  value={maxYearOfConstruction}
                  onChange={(value) => {
                    dispatch(setMaxYearOfConstruction(value));
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  ) : (
    <></>
  );
};
export default DemandForm;
