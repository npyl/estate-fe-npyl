import {
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import DateFieldStyled from "./DateFieldStyled"; // adjust the path based on your directory structure
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import * as React from "react";
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import dynamic from "next/dynamic";
import OnlyNumbersInput from "./OnlyNumbers";
import { useDispatch, useSelector } from "react-redux";
import { useAllCustomersQuery } from "src/services/customers";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import {
  selectArea,
  selectAuction,
  selectAvgUtils,
  selectCode,
  selectCurrentRentPrice,
  selectDebatablePrice,
  selectEstimatedRentPrice,
  selectKeyCode,
  selectLabelIDs,
  selectManager,
  selectOwner,
  selectPlotArea,
  selectPrice,
  selectRentalPeriodEnd,
  selectRentalPeriodStart,
  selectRented,
  selectState,
  setArea,
  setAuction,
  setAvailableAfter,
  setAvgUtils,
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
  setRentalPeriodStart,
  setRented,
  setState,
} from "src/slices/property";

import { useState } from "react";

import { IGlobalCustomer, IGlobalProperty } from "src/types/global";
import { ILabel, ILabels } from "src/types/label";

import { useAllUsersQuery } from "src/services/user";
import { useAllGlobalsQuery } from "src/services/global";

import { LabelCreate } from "src/components/label";

// Property Slice
import { addLabel as addLabelID } from "src/slices/property";
// Labels Slice (for new labels)
import {
  addLabel as addNewLabel,
  selectAll as selectAllNewLabels,
} from "src/slices/labels";
import { useGetLabelsQuery } from "src/services/labels";
import { DateField } from "@mui/x-date-pickers";
import { format, parse } from "date-fns";
import { selectAvailableAfter } from "src/slices/property";

const BasicSection: React.FC<any> = (props) => {
  const { data } = useAllGlobalsQuery();
  const enums: IGlobalProperty = data?.property as IGlobalProperty;
  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2022-04-17"));

  const { data: labels } = useGetLabelsQuery();
  const propertyLabels = labels?.propertyLabels;

  const dispatch = useDispatch();

  const code = useSelector(selectCode);
  const owner = useSelector(selectOwner);
  const manager = useSelector(selectManager);
  const currentRentPrice = useSelector(selectCurrentRentPrice);
  const estimatedRentPrice = useSelector(selectEstimatedRentPrice);

  const price = useSelector(selectPrice);
  const keyCode = useSelector(selectKeyCode);
  const avgUtils = useSelector(selectAvgUtils);
  const area = useSelector(selectArea);
  const plotArea = useSelector(selectPlotArea);
  const rented = useSelector(selectRented);
  const availableAfter = useSelector(selectAvailableAfter);
  const rentalPeriodStart = useSelector(selectRentalPeriodStart);
  const rentalPeriodEnd = useSelector(selectRentalPeriodEnd);
  const auction = useSelector(selectAuction);
  const debatablePrice = useSelector(selectDebatablePrice);
  const state = useSelector(selectState);
  const stateEnum = enums?.state;

  const labelIDs = useSelector(selectLabelIDs);
  const assignedLabels =
    (labelIDs &&
      labelIDs.length > 0 &&
      propertyLabels &&
      propertyLabels.length > 0 &&
      labelIDs
        .filter((labelID) => labelID)
        .map((labelID, index) => {
          // get label object with id
          return propertyLabels.find((label) => label.id === labelID)!;
        })) ||
    [];
  const newLabels = useSelector(selectAllNewLabels);

  // const [value, setValue] = React.useState<Date>(new Date());
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
  if (!enums || !propertyLabels) return null;

  //set the values for BE

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
            <OnlyNumbersInput
              label="Code"
              value={code}
              onChange={(value) => {
                dispatch(setCode(value));
              }}
            />
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
            {/* <TextField
              fullWidth
              id="outlined-select-currency"
              slot=""
              select
              label="State"
              value={state}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setState(event.target.value));
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
              size="small"
            >
              {enums && enums.state ? (
                enums?.state.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value={""}></MenuItem>
              )}
            </TextField> */}
          </Grid>
          <Grid item xs={6}>
            <OnlyNumbersInput
              label="Area"
              value={area}
              onChange={(value) => {
                dispatch(setArea(value));
              }}
              adornment="m²"
            />
          </Grid>
          <Grid item xs={6}>
            <OnlyNumbersInput
              label="Plot Area"
              value={plotArea}
              onChange={(value) => {
                dispatch(setPlotArea(value));
              }}
              adornment="m²"
            />
          </Grid>
          <Grid item xs={6}>
            <OnlyNumbersInput
              label="Price"
              value={price}
              onChange={(value) => {
                dispatch(setPrice(value));
              }}
              adornment="€"
            />
          </Grid>

          <Grid item xs={6}>
            <OnlyNumbersInput
              label="Average Utils"
              value={avgUtils}
              onChange={(value) => {
                dispatch(setAvgUtils(value));
              }}
              adornment="€/Month"
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

          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-start-adornment"
              label="Key Code"
              value={keyCode}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setKeyCode(event.target.value));
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <OnlyNumbersInput
              label="Estimated Rent Price"
              value={estimatedRentPrice}
              onChange={(value) => {
                dispatch(setEstimatedRentPrice(value));
              }}
              adornment="€"
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

          {/* </LocalizationProvider> */}
          {/* <DatePicker label="Basic date picker" />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
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
              <DatePicker label="Basic date picker" />
              <DatePicker
                label="Rental Start"
                value={rentalPeriodStart}
                onChange={(newValue: Date | null) =>
                  setRentalPeriodStart(newValue)
                }
                renderInput={(params) => <TextField {...params} />}
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
            </Grid> */}

          {/* <Grid
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
          </LocalizationProvider> */}
        </Grid>
      </Grid>
      <Grid item xs={12} padding={1}>
        <Grid
          container
          spacing={0}
          sx={{
            padding: "10px",
            border: "1px solid #000000",
            borderRadius: "10px",
          }}
        >
          <Grid item xs={12}>
            <Grid container spacing={2}>
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
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
              <Grid item xs={6}>
                {/* <DemoContainer components={["DateField"]}> */}
                <DateFieldStyled
                  fullWidth
                  label="Available After:"
                  value={availableAfter}
                  onChange={(value) => {
                    dispatch(setAvailableAfter(value as string));
                  }}
                  disabled={!rented} // Disable the field if "rented" is unchecked
                /> */}
                {/* </DemoContainer> */}
              </Grid>

              <Grid item xs={6}>
                {/* <DemoContainer components={["DateField"]}> */}

                <DateFieldStyled
                  fullWidth
                  label="Rental Period Start"
                  value={rentalPeriodStart}
                  onChange={(value) => {
                    dispatch(setRentalPeriodStart(value as string));
                  }}
                  disabled={!rented} // Disable the field if "rented" is unchecked
                /> */}
                {/* </DemoContainer> */}
              </Grid>
              <Grid item xs={6}>
                {/* <DemoContainer components={["DateField"]}> */}
                <DateFieldStyled
                  fullWidth
                  label="Rental Period End"
                  value={rentalPeriodEnd}
                  onChange={(value) => {
                    dispatch(setRentalPeriodEnd(value as string));
                  }}
                  disabled={!rented} // Disable the field if "rented" is unchecked
                /> */}
                {/* </DemoContainer> */}
              </Grid>
              <Grid item xs={6}>
                <OnlyNumbersInput
                  label="Current Rent Price"
                  value={currentRentPrice}
                  onChange={(value) => {
                    dispatch(setCurrentRentPrice(value));
                  }}
                  adornment="€"
                  disabled={!rented}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BasicSection;
