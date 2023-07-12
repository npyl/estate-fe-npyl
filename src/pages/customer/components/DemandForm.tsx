import {
  Autocomplete,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
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
import {
  useAllPropertiesQuery,
  useGetPropertyByCodeQuery,
} from "src/services/properties";

import OnlyNumbersInput from "src/components/OnlyNumbers";

import { LabelSelect } from "./LabelSelect";
// function valuetext(value: number) {
//   return `${value}°C`;
// }

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
  const floorMap: Map<number, string> = new Map([
    [-3, "Basement"],
    [-2, "Semi-basement"],
    [-1, "Ground Floor"],
    [0, "Mezzanine"],
    ...Array.from({ length: 21 }, (_, i) => [i + 1, `Floor ${i + 1}`] as const),
  ]);

  const [autocompleteValue, setAutocompleteValue] = useState("");

  const autocompleteChange = (_event: any, value: string | null) => {
    setAutocompleteValue(value || "");
  };

  const propertyCodes: string[] =
    useAllPropertiesQuery(undefined, {
      selectFromResult: ({ data }) => ({
        data: data
          ?.filter((property) => property.code !== null)
          .map((property) => {
            return property.code;
          }),
      }),
    }).data || [];

  const { data: propertyForCode, isSuccess: isPropertyForCodeSuccess } =
    useGetPropertyByCodeQuery(+autocompleteValue, {
      skip: autocompleteValue === "",
    }) || {};

  // everytime the autocomplete's value is updated, fetch a property
  useEffect(() => {
    const property = propertyForCode;

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

    dispatch(setDemandLabels(property.labels));

    // dispatch(setMaxYearOfConstruction(property));
  }, [isPropertyForCodeSuccess]);
  const handleSliderChange = (event: any, newValue: any, activeThumb: any) => {
    const newValues = newValue;
    const [minValue, maxValue] = newValues;
    dispatch(setMinBedrooms(minValue)); // Set minBedrooms variable
    dispatch(setMaxBedrooms(maxValue)); // Set maxBedrooms variable
  };

  const handleSliderChange1 = (event: any, newValue: any, activeThumb: any) => {
    const newValues = newValue;
    const [minValue, maxValue] = newValues;
    dispatch(setMinBathrooms(minValue)); // Set minBedrooms variable
    dispatch(setMaxBathrooms(maxValue)); // Set maxBedrooms variable
  };
  const handleSliderChange2 = (event: any, newValue: any, activeThumb: any) => {
    const newValues = newValue;
    const [minValue, maxValue] = newValues;
    dispatch(setMinCovered(minValue)); // Set minBedrooms variable
    dispatch(setMaxCovered(maxValue)); // Set maxBedrooms variable
  };
  const handleSliderChange3 = (event: any, newValue: any, activeThumb: any) => {
    const newValues = newValue;
    const [minValue, maxValue] = newValues;
    dispatch(setMinPlot(minValue)); // Set minBedrooms variable
    dispatch(setMaxPlot(maxValue)); // Set maxBedrooms variable
  };
  const handleSliderChange4 = (event: any, newValue: any, activeThumb: any) => {
    const newValues = newValue;
    const [minValue, maxValue] = newValues;
    dispatch(setMinPrice(minValue)); // Set minBedrooms variable
    dispatch(setMaxPrice(maxValue)); // Set maxBedrooms variable
  };
  const handleSliderChange5 = (event: any, newValue: any, activeThumb: any) => {
    const newValues = newValue;
    const [minValue, maxValue] = newValues;
    dispatch(setMinFloor(minValue)); // Set minBedrooms variable
    dispatch(setMaxFloor(maxValue)); // Set maxBedrooms variable
  };
  const handleSliderChange6 = (event: any, newValue: any, activeThumb: any) => {
    const newValues = newValue;
    const [minValue, maxValue] = newValues;
    dispatch(setMinYearOfConstruction(minValue)); // Set minBedrooms variable
    dispatch(setMaxYearOfConstruction(maxValue)); // Set maxBedrooms variable
  };

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
        <Typography variant="h6">Demand Form</Typography>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              value={autocompleteValue}
              onChange={autocompleteChange}
              options={propertyCodes}
              renderInput={(params) => (
                <TextField {...params} placeholder="Property Code" />
              )}
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
            <LabelSelect />
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
            <Typography variant="h6">Bedrooms Min-Max</Typography>
            <Grid
              container
              direction={"row"}
              spacing={1}
              paddingTop={2}
              paddingLeft={3}
              paddingRight={3}
            >
              <Slider
                getAriaLabel={() => "Bedrooms Slider"}
                orientation="horizontal"
                value={[minBedrooms, maxBedrooms]}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                min={0}
                max={10}
              />
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6">Bathrooms Min-Max</Typography>

            <Grid
              container
              direction={"row"}
              spacing={1}
              paddingTop={2}
              paddingLeft={3}
              paddingRight={3}
            >
              <Slider
                getAriaLabel={() => "Bathrooms Slider"}
                orientation="horizontal"
                value={[minBathrooms, maxBathrooms]}
                onChange={handleSliderChange1}
                valueLabelDisplay="auto"
                min={0}
                max={10}
              />
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6">Covered Min-Max (m²)</Typography>
            <Grid
              container
              direction={"row"}
              spacing={1}
              paddingTop={2}
              paddingLeft={3}
              paddingRight={3}
            >
              <Slider
                getAriaLabel={() => "Covered Slider"}
                orientation="horizontal"
                value={[minCovered, maxCovered]}
                onChange={handleSliderChange2}
                valueLabelDisplay="auto"
                min={0}
                max={3000}
              />
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6">Plot Min-Max (m²)</Typography>
            <Grid
              container
              direction={"row"}
              spacing={1}
              paddingTop={2}
              paddingLeft={3}
              paddingRight={3}
            >
              <Slider
                getAriaLabel={() => "Plot Slider"}
                orientation="horizontal"
                value={[minPlot, maxPlot]}
                onChange={handleSliderChange3}
                valueLabelDisplay="auto"
                min={0}
                max={10000}
              />
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6">Price Min-Max (€)</Typography>
            <Grid
              container
              direction={"row"}
              spacing={1}
              paddingTop={2}
              paddingLeft={3}
              paddingRight={3}
            >
              <Slider
                getAriaLabel={() => "Price Slider"}
                orientation="horizontal"
                value={[minPrice, maxPrice]}
                onChange={handleSliderChange4}
                valueLabelDisplay="auto"
                min={0}
                max={1000000}
              />
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6">Floor Min-Max</Typography>
            <Grid
              container
              direction={"row"}
              spacing={1}
              paddingTop={2}
              paddingLeft={3}
              paddingRight={3}
            >
              {/* <Slider
                getAriaLabel={() => "Floor Slider"}
                orientation="horizontal"
                value={[minFloor, maxFloor]}
                onChange={handleSliderChange5}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => floorMap.get(value)}
                min={-3}
                max={20}
              /> */}
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6">Year of Construction Min-Max</Typography>
            <Grid
              container
              direction={"row"}
              spacing={1}
              paddingTop={2}
              paddingLeft={3}
              paddingRight={3}
            >
              <Slider
                getAriaLabel={() => "Year Of Constuction Slider"}
                orientation="horizontal"
                value={[minYearOfConstruction, maxYearOfConstruction]}
                onChange={handleSliderChange6}
                valueLabelDisplay="auto"
                min={1960}
                max={2023}
              />
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
