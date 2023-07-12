import {
  Checkbox,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentRentPrice,
  selectEstimatedRentPrice,
  selectPrice,
  setCurrentRentPrice,
  setEstimatedRentPrice,
  setPrice
} from "src/slices/property";

import { useAllGlobalsQuery } from "src/services/global";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";
const ROIChangeCalculation: React.FC<any> = (props) => {
  const { data } = useAllGlobalsQuery();
  const enums: IGlobalProperty = data?.property as IGlobalProperty;
  const details = enums?.details as IGlobalPropertyDetails;
  const dispatch = useDispatch();
  const price = useSelector(selectPrice);
  const currentRentPrice = useSelector(selectCurrentRentPrice);
  const estimatedRentPrice = useSelector(selectEstimatedRentPrice);
  const [roi, setRoi] = useState(0);

  const [additionalCheckbox1Enabled, setAdditionalCheckbox1Enabled] =
    useState(false); // State variable for enabling additional checkboxes
  const [additionalCheckboxROIEnabled, setAdditionalCheckboxROIEnabled] =
    useState(false); // State variable for enabling additional checkboxes
  const [additionalCheckbox2Enabled, setAdditionalCheckbox2Enabled] =
    useState(false); // State variable for enabling additional checkboxes

  //συνάρτηση click/checkbox
  const handleROICheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    setAdditionalCheckboxROIEnabled(checked);
  };

  // // calculate price and change roi calculator with rend price stack
  // useEffect(() => {
  //   const calculatePrice = (() => {
  //     if (additionalCheckbox1Enabled) {
  //       return ((currentRentPrice * 12) / roi) * 100;
  //     } else if (additionalCheckbox2Enabled) {
  //       return ((estimatedRentPrice * 12) / roi) * 100;
  //     }
  //     return price; // Use the initial value of `price` if no conditions match
  //   })();

  //   dispatch(setPrice(calculatePrice));
  // }, [
  //   additionalCheckboxROIEnabled,
  //   additionalCheckbox1Enabled,
  //   additionalCheckbox2Enabled,
  //   currentRentPrice,
  //   estimatedRentPrice,
  //   price,
  //   dispatch,
  // ]);
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9.,]/g, ""); // Remove non-numeric characters from the input
    dispatch(setPrice(numericValue));
  };
  const handleCurrentRentPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9.,]/g, ""); // Remove non-numeric characters from the input
    dispatch(setCurrentRentPrice(numericValue));
  };
  const handleEstimatedRentPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9.,]/g, ""); // Remove non-numeric characters from the input
    dispatch(setEstimatedRentPrice(numericValue));
  };
  const handleRoiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9.,]/g, ""); // Remove non-numeric characters from the input
    // dispatch(setRoi(numericValue));
  };
  //handle onlynumbers
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const regex = /[0-9.,]/;
    if (!regex.test(keyValue)) {
      event.preventDefault(); // Prevent entering non-numeric characters
    }
  };

  return (
    <Grid container xs={12} spacing={2} padding={2}>
      ON ROI CHANGE
      {/* //////////////////////////////// onROIChange  //////////////////////////////// */}
      <Grid container xs={12} spacing={2} padding={2}>
        <Grid item xs={5}>
          <TextField
            fullWidth
            id='outlined-select-currency'
            label='Price' /* < euro sticky to field> */
            value={price}
            disabled
            InputProps={{
              endAdornment: <InputAdornment position='end'>€</InputAdornment>,
            }}
            inputProps={{
              style: {
                height: "8px",
              },
            }}
          />
        </Grid>

        <Grid item xs={1}></Grid>
        <Grid item xs={5}>
          <TextField
            fullWidth
            id='outlined-select-currency'
            label='ROI' /* < euro sticky to field> */
            value={roi}
            onChange={handleRoiChange}
            onKeyPress={handleKeyPress}
            InputProps={{
              endAdornment: <InputAdornment position='end'>%</InputAdornment>,
            }}
            inputProps={{
              style: {
                height: "8px",
              },
            }}
          />
        </Grid>

        <Grid item xs={1}>
          <Typography>price stack</Typography>
          <Checkbox
            onChange={handleROICheckboxChange}
            checked={additionalCheckboxROIEnabled} // Set the checked state based on additionalCheckboxesEnabled
            sx={{ cursor: "default" }}
            color='primary'
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            fullWidth
            id='outlined-select-currency'
            label='Current Rent Price' /* < euro sticky to field> */
            value={currentRentPrice}
            onChange={handleCurrentRentPriceChange}
            onKeyPress={handleKeyPress}
            disabled
            InputProps={{
              endAdornment: <InputAdornment position='end'>€</InputAdornment>,
            }}
            inputProps={{
              style: {
                height: "8px",
              },
            }}
          />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={5}>
          <TextField
            fullWidth
            id='outlined-select-currency'
            label='Estimated Rent Price' /* < euro sticky to field> */
            value={estimatedRentPrice}
            onChange={handleEstimatedRentPriceChange}
            onKeyPress={handleKeyPress}
            disabled // Disable if additional checkboxes are not enabled
            InputProps={{
              endAdornment: <InputAdornment position='end'>€</InputAdornment>,
            }}
            inputProps={{
              style: {
                height: "8px",
              },
            }}
          />
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </Grid>
  );
};

export default ROIChangeCalculation;
