import { Checkbox, Grid, MenuItem, Paper, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { Box } from "@mui/system";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { useAllCustomersQuery } from "src/services/customers";
import {
  selectArea,
  selectValueOfRenovation,
  selectRented,
  selectRentalPeriodStart,
  selectRentalPeriodEnd,
  selectPlotArea,
  selectAuction,
  selectDebatablePrice,
  selectAvgUtils,
  selectCurrentRentPrice,
  selectEstimatedRentPrice,
  selectCode,
  selectKeyCode,
  selectManager,
  selectOwner,
  selectParentCategory,
  selectPrice,
  selectState,
  setArea,
  setAuction,
  setDebatablePrice,
  setAvgUtils,
  setCurrentRentPrice,
  setEstimatedRentPrice,
  setPlotArea,
  setCode,
  setKeyCode,
  setManager,
  setOwner,
  setRentalPeriodStart,
  setRentalPeriodEnd,
  setParentCategory,
  setRented,
  setPrice,
  setState,
  setValueOfRenovation,
} from "src/slices/property";

import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";

import { useAllUsersQuery } from "src/services/user";

const BasicSection: React.FC<any> = (props) => {
  const [value, setValue] = React.useState<Date | null>(new Date());

  const enums = props.enums as IGlobalProperty;
  const details = enums?.details as IGlobalPropertyDetails;
  const dispatch = useDispatch();

  const valueOfRenovation = useSelector(selectValueOfRenovation);
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
  const plotArea = useSelector(selectPlotArea);
  const rented = useSelector(selectRented);
  const rentalPeriodStart = useSelector(selectRentalPeriodStart);
  const rentalPeriodEnd = useSelector(selectRentalPeriodEnd);
  const auction = useSelector(selectAuction);
  const debatablePrice = useSelector(selectDebatablePrice);

  // const [value, setValue] = React.useState<Date>(new Date());

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
            <TextField
              fullWidth
              id="outlined-start-adornment"
              label="Code"
              value={code}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setCode(event.target.value));
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
            <TextField
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
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-select-currency"
              label="Area"
              value={area}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setArea(event.target.value));
              }}
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
              id="outlined-select-currency"
              label="Plot Area"
              value={plotArea}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setPlotArea(event.target.value));
              }}
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
              id="outlined-select-currency"
              label="Price" /* < euro sticky to field> */
              value={price}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setPrice(event.target.value));
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">€</InputAdornment>,
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
              label="Average Utils"
              value={avgUtils}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setAvgUtils(event.target.value));
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">€/Month</InputAdornment>
                ),
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
            />
          </Grid>

          {/*εδω πάλι μου βγάζει ερρορ οταν βάζω τις ημερομηνίες και κάνω refresh το page */}
          {/* <LocalizationProvider fullwidthdateAdapter={AdapterDayjs}>
      <DemoContainer  components={['DatePicker']}>
        <DatePicker label="Year of Constrution" />
      </DemoContainer>
    </LocalizationProvider>

    <LocalizationProvider fullwidthdateAdapter={AdapterDayjs}>
      <DemoContainer  components={['DatePicker']}>
        <DatePicker label="Year of Renovation" />
      </DemoContainer>
    </LocalizationProvider> */}

          {/* <Grid item xs={1} direction="row" left={2}>
                          <FormGroup>
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Basement"
                              value={basement}
                              onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                              ) => {
                                setBasements(checked);
                              }}
                            />
                          </FormGroup>
                        </Grid> */}

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
            <TextField
              fullWidth
              id="outlined-select-currency"
              label="Current Rent Price" /* < euro sticky to field> */
              value={currentRentPrice}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setCurrentRentPrice(event.target.value));
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">€</InputAdornment>,
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
              id="outlined-select-currency"
              label="Estimated Rent Price" /* < euro sticky to field> */
              value={estimatedRentPrice}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setEstimatedRentPrice(event.target.value));
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">€</InputAdornment>,
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
            />
          </Grid>
          {/*
          <Grid item xs={6}>
            <DatePicker
              label=" Rental Start"
              value={rentalPeriodStart}
              onChange={(newValue) => setRentalPeriodStart(newValue)}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label="Rental End"
              value={rentalPeriodEnd}
              onChange={(newValue) => setRentalPeriodEnd(newValue)}
              sx={{ width: "100%" }}
            />
          </Grid> */}

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
            {/* <DatePicker
              label="Available After"
              value={value}
              onChange={(newValue) => setValue(newValue)}
              sx={{ width: "100%" }}
            /> */}
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

          {/* <Grid item xs={6}></Grid> */}

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

export default BasicSection;

{
  /* <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-start-adornment"
              label="Year of Renovation"
              value={valueOfRenovation}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setValueOfRenovation(event.target.value));
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
            />
          </Grid> */
}
