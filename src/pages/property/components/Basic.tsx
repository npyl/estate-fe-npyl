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
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
// import { MuiPickersUtilsProvider } from "@mui/lab";

import OnlyNumbersInput from "./OnlyNumbers";

import { useDispatch, useSelector } from "react-redux";
import { useAllCustomersQuery } from "src/services/customers";
import {
  selectArea,
  selectAuction,
  selectAvgUtils,
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
  setRented,
  setState,
} from "src/slices/property";

import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";

import { useAllUsersQuery } from "src/services/user";

import { useState } from "react";
import { useAllGlobalsQuery } from "src/services/global";
import ROISection from "./ROI";

const BasicSection: React.FC<any> = (props) => {
  const [rentalPeriodStart, setRentalPeriodStart] = useState<Date | null>(
    new Date()
  );

  const { data } = useAllGlobalsQuery();
  const enums: IGlobalProperty = data?.property as IGlobalProperty;

  const details = enums?.details as IGlobalPropertyDetails;
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
  const availableAfter = useSelector(selectRented);
  // const rentalPeriodStart = useSelector(selectRentalPeriodStart);
  const rentalPeriodEnd = useSelector(selectRentalPeriodEnd);
  const auction = useSelector(selectAuction);
  const debatablePrice = useSelector(selectDebatablePrice);
  const state = useSelector(selectState);
  const stateEnum = enums?.state;

  // const [value, setValue] = React.useState<Date>(new Date());
  const handleDateChange = (date: Date | null) => {
    setAvailableAfter(date);
    // onChange(date?.toISOString().substring(0, 10) || "");
  };
  // get list of owners & managers
  const { data: owners } = useAllCustomersQuery();
  const { data: managers } = useAllUsersQuery();
  if (!enums) return null;

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
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <OnlyNumbersInput
              label="Current Rent Price"
              value={currentRentPrice}
              onChange={(value) => {
                dispatch(setCurrentRentPrice(value));
              }}
              adornment="€"
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
        </Grid>
        <Grid></Grid>
      </Grid>
    </Paper>
  );
};

export default BasicSection;
