import {
  Checkbox,
  Grid,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { Box } from "@mui/system";

import { useDispatch, useSelector } from "react-redux";
import { useAllCustomersQuery } from "src/services/customers";
import {
  selectPrice,
  selectCottage,
  selectDoctorsOffice,
  selectInvestment,
  selectEstimatedRentPrice,
  setEstimatedRentPrice,
  selectProfessionalUse,
  selectRenovation,
  selectCurrentRentPrice,
  setCurrentRentPrice,
  selectStudent,
  selectTouristRental,
  setPrice,
  setAgriculturalUse,
  setInvestment,
} from "src/slices/property";

import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";

import { useState } from "react";
import { useAllUsersQuery } from "src/services/user";
import { useAllPropertyGlobalQuery } from "src/services/global";

const ROISection: React.FC<any> = (props) => {
  const [rentalPeriodStart, setRentalPeriodStart] = useState<Date | null>(
    new Date()
  );

  const { data } = useAllPropertyGlobalQuery();
  const enums: IGlobalProperty = data?.property as IGlobalProperty;
  const details = enums?.details as IGlobalPropertyDetails;
  const dispatch = useDispatch();

  const student = useSelector(selectStudent);

  const cottage = useSelector(selectCottage);
  const touristRental = useSelector(selectTouristRental);
  const investment = useSelector(selectInvestment);
  const doctorsOffice = useSelector(selectDoctorsOffice);
  const professionalUse = useSelector(selectProfessionalUse);
  const renovation = useSelector(selectRenovation);
  const price = useSelector(selectPrice);
  const currentRentPrice = useSelector(selectCurrentRentPrice);
  const estimatedRentPrice = useSelector(selectEstimatedRentPrice);

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
        <Typography variant="h6">ROI</Typography>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
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
          <Grid item xs={7}></Grid>

          <Grid item xs={5}>
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
          <Grid
            item
            xs={1}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {}}
              sx={{ cursor: "default" }}
              color="primary"
            />
            <Typography variant="body1" sx={{ ml: 0 }}></Typography>
          </Grid>
          <Grid item xs={5}>
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
          <Grid
            item
            xs={1}
            flexDirection="row"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            <Checkbox
              onChange={(
                event: React.ChangeEvent<unknown>,
                checked: boolean
              ) => {}}
              sx={{ cursor: "default" }}
              color="primary"
            />
            <Typography variant="body1" sx={{ ml: 0 }}></Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ROISection;
