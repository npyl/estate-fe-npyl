import { DatePicker } from "@mui/lab";
import {
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  InputAdornment,
  Typography,
  Box
} from "@mui/material";

import * as React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useAllCustomersQuery } from "src/services/customers";
import {
  selectArea,
  selectAuction,
  selectAvgUtils,
  selectBuildable,
  selectCode,
  selectCurrentRentPrice,
  selectDebatablePrice,
  selectEstimatedRentPrice,
  selectKeyCode,
  selectManager,
  selectOwner,
  selectPlotArea,
  selectPrice,
  selectRentalPeriodEnd,
  selectRented,
  selectState,
  setArea,
  setAuction,
  setAvailableAfter,
  setBuildable,
  setCode,
  setCurrentRentPrice,
  setDebatablePrice,
  setEstimatedRentPrice,
  setKeyCode,
  setManager,
  setOwner,
  setPlotArea,
  setPrice,
  setRentalPeriodEnd,
  setRented,
  setState,
} from "src/slices/property";

import { IGlobalProperty } from "src/types/global";

import { useAllUsersQuery } from "src/services/user";

import { useState } from "react";
import { useAllGlobalsQuery } from "src/services/global";

import { LabelCreate } from "src/components/label";

import OnlyNumbersInput from "./OnlyNumbers";

// Property Slice
import { addLabel as addLabelID, selectLabelIDs } from "src/slices/property";
// Labels Slice (for new labels)
import {
  addLabel as addNewLabel,
  selectAll as selectAllNewLabels,
} from "src/slices/labels";
import { useGetLabelsQuery } from "src/services/labels";

import { ILabel } from "src/types/label";

const BasicForLandSection: React.FC<any> = (props) => {
  const dispatch = useDispatch();

  const [rentalPeriodStart, setRentalPeriodStart] = useState<Date | null>(
    new Date()
  );

  const { data } = useAllGlobalsQuery();
  const enums: IGlobalProperty = data?.property as IGlobalProperty;

  const { data: labels } = useGetLabelsQuery();
  const propertyLabels = labels?.propertyLabels;

  const code = useSelector(selectCode);
  const owner = useSelector(selectOwner);
  const manager = useSelector(selectManager);
  const currentRentPrice = useSelector(selectCurrentRentPrice);
  const estimatedRentPrice = useSelector(selectEstimatedRentPrice);
  const state = useSelector(selectState);
  const price = useSelector(selectPrice);
  const keyCode = useSelector(selectKeyCode);
  const avgUtils = useSelector(selectAvgUtils);
  const area = useSelector(selectArea);
  const buildable = useSelector(selectBuildable);
  const plotArea = useSelector(selectPlotArea);
  const rented = useSelector(selectRented);
  const availableAfter = useSelector(selectRented);
  // const rentalPeriodStart = useSelector(selectRentalPeriodStart);
  const rentalPeriodEnd = useSelector(selectRentalPeriodEnd);
  const auction = useSelector(selectAuction);
  const debatablePrice = useSelector(selectDebatablePrice);
  const stateEnum = enums?.state;

  const labelIDs = useSelector(selectLabelIDs);
  const assignedLabels = labelIDs &&
    labelIDs.length > 0 &&
    propertyLabels &&
    propertyLabels.length > 0 &&
    labelIDs.filter((labelID) => labelID).map((labelID, index) => {
      // get label object with id
      return propertyLabels.find(
        (label) => label.id === labelID
      )!;
    }) || [];
  const newLabels = useSelector(selectAllNewLabels);

  const handleDateChange = (date: Date | null) => {
    setAvailableAfter(date);
    // onChange(date?.toISOString().substring(0, 10) || "");
  };

  const handleLabelClick = (label: ILabel) => {
    dispatch(addLabelID(label.id));
  };
  const handleLabelCreate = (label: ILabel) => {
    dispatch(addNewLabel(label));
  };

  // get list of owners & managers
  const { data: owners } = useAllCustomersQuery();
  const { data: managers } = useAllUsersQuery();
  if (!enums) return null;

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
        <Typography variant="h6">Basic Details</Typography>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <OnlyNumbersInput label="Code" value={code} onChange={(value) => {
              dispatch(setCode(value));
            }} />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-start-adornment"
              select
              label="Owner"
              value={owner}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setOwner(event.target.value));
              }}
              size="small"
            >
              {owners && owners.length > 0 ? (
                owners?.map((option, index) => (
                  <MenuItem key={index} value={option.id}>
                    {option.email}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value={""}></MenuItem>
              )}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-start-adornment"
              select
              label="Manager"
              value={manager}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setManager(event.target.value));
              }}
              size="small"
            >
              {managers && managers.length > 0 ? (
                managers?.map((option, index) => (
                  <MenuItem key={index} value={option.id}>
                    {option.email}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value={""}></MenuItem>
              )}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">State</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
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
            <OnlyNumbersInput label="Area" value={area} adornment="m²" onChange={(value) => {
              dispatch(setArea(value));
            }} />
          </Grid>
          <Grid item xs={6}>
            <OnlyNumbersInput label="Plot Area" value={plotArea} adornment="m²" onChange={(value) => {
              dispatch(setPlotArea(value));
            }} />
          </Grid>
          <Grid item xs={6}>
            <OnlyNumbersInput label="Price" value={price} adornment="€" onChange={(value) => {
              dispatch(setPrice(value));
            }} />
          </Grid>

          <Grid
            item
            xs={6}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              id="outlined-controlled"
              value={rented}
              checked={rented}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setRented(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Elevator" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Rented
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-start-adornment"
              label="Key Code"
              value={keyCode}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setKeyCode(event.target.value));
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <OnlyNumbersInput label="Current Rent Price" value={currentRentPrice} adornment="€" onChange={(value) => {
              dispatch(setCurrentRentPrice(value));
            }} />
          </Grid>

          <Grid item xs={6}>
            <OnlyNumbersInput label="Estimated Rent Price" value={estimatedRentPrice} adornment="€" onChange={(value) => {
              dispatch(setEstimatedRentPrice(value));
            }} />
          </Grid>

          <Grid
            item
            xs={6}
            flexDirection="row"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              height: "100px",
            }}
          >
            <DatePicker
              label=" Rental Start"
              value={rentalPeriodStart}
              onChange={(newValue: Date) => setRentalPeriodStart(newValue)}
              sx={{ width: "100%", height: " 50px" }}
            />
          </Grid>
          <Grid
            item
            xs={6}
            flexDirection="row"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              height: "100px",
            }}
          >
            <DatePicker
              label="Rental End"
              value={rentalPeriodEnd}
              onChange={(newValue: Date) => setRentalPeriodEnd(newValue)}
              sx={{ width: "100%", height: " 50px" }}
            />
          </Grid>

          <Grid
            item
            xs={6}
            flexDirection="row"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              height: "100px",
            }}
          >
            <DatePicker
              label="Available After"
              value={availableAfter}
              onChange={handleDateChange}
              sx={{ width: "100%", height: " 50px" }}
            />
          </Grid>

          <Grid item xs={6}>
            <LabelCreate
              existingLabels={propertyLabels}
              assignedLabels={assignedLabels}
              newLabels={newLabels}
              onLabelClick={handleLabelClick}
              onLabelCreate={handleLabelCreate}
            />
          </Grid>

          <Grid
            item
            xs={3}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={debatablePrice}
              checked={debatablePrice}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setDebatablePrice(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Floor Heating Checkbox" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Debatable Price
            </Typography>
          </Grid>

          <Grid
            item
            xs={2}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={buildable}
              checked={buildable}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setBuildable(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Buildable" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Buildable
            </Typography>
          </Grid>

          <Grid
            item
            xs={2}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              value={auction}
              checked={auction}
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {
                dispatch(setAuction(checked));
              }}
              sx={{ cursor: "default" }}
              color="primary"
              inputProps={{ "aria-label": "Floor Heating Checkbox" }}
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
              Auction
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BasicForLandSection;
