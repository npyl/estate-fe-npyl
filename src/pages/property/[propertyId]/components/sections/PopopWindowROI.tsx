import {
  Grid,
  TextField,
  InputAdornment,
  Checkbox,
  Typography,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  selectPrice,
  selectEstimatedRentPrice,
  setEstimatedRentPrice,
  selectCurrentRentPrice,
  setCurrentRentPrice,
  setPrice,
} from "src/slices/property";

import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";
import { useAllUsersQuery } from "src/services/user";
import { useAllGlobalsQuery } from "src/services/global";
const PopupWindow: React.FC<any> = (props) => {
  const { data } = useAllGlobalsQuery();
  const enums: IGlobalProperty = data?.property as IGlobalProperty;
  const details = enums?.details as IGlobalPropertyDetails;
  const dispatch = useDispatch();
  const price = useSelector(selectPrice) || 0;
  const currentRentPrice = useSelector(selectCurrentRentPrice) || 0;
  const estimatedRentPrice = useSelector(selectEstimatedRentPrice) || 0;

  const [roi, setRoi] = useState(0);

  const [additionalCheckbox1Enabled, setAdditionalCheckbox1Enabled] =
    useState(false); // State variable for enabling additional checkboxes
  const [additionalCheckboxROIEnabled, setAdditionalCheckboxROIEnabled] =
    useState(false); // State variable for enabling additional checkboxes
  const [additionalCheckbox2Enabled, setAdditionalCheckbox2Enabled] =
    useState(false); // State variable for enabling additional checkboxes

  //συνάρτηση click/checkbox
  const handleFirstCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    setAdditionalCheckbox1Enabled(checked);
    setAdditionalCheckbox2Enabled(!checked);
  };
  const handleSecondCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    setAdditionalCheckbox2Enabled(checked);
    setAdditionalCheckbox1Enabled(!checked);
  };
  const handleROICheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    setAdditionalCheckboxROIEnabled(checked);
  };

  //roi calculator
  useEffect(() => {
    let calculatedRoi = 0;
    if (additionalCheckbox1Enabled) {
      calculatedRoi = ((currentRentPrice * 12) / price) * 100;
    } else if (additionalCheckbox2Enabled) {
      calculatedRoi = ((estimatedRentPrice * 12) / price) * 100;
    }

    setRoi(calculatedRoi);
  }, [
    additionalCheckbox1Enabled,
    additionalCheckbox2Enabled,
    currentRentPrice,
    estimatedRentPrice,
    price,
    dispatch,
  ]);

  // calculate price and change roi calculator with rend price stack
  //   useEffect(() => {
  //     const calculatePrice = (() => {
  //       if (additionalCheckbox1Enabled) {
  //         return ((currentRentPrice * 12) / roi) * 100;
  //       } else if (additionalCheckbox2Enabled) {
  //         return ((estimatedRentPrice * 12) / roi) * 100;
  //       }
  //       return price; // Use the initial value of `price` if no conditions match
  //     })();

  //     dispatch(setPrice(calculatePrice));
  //   }, [
  //     additionalCheckboxROIEnabled,
  //     additionalCheckbox1Enabled,
  //     additionalCheckbox2Enabled,
  //     currentRentPrice,
  //     estimatedRentPrice,
  //     price,
  //     dispatch,
  //   ]);
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
    setRoi(parseInt(numericValue));
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
    <Grid container xs={12}>
      <Grid container xs={12} spacing={2} padding={2}>
        <Grid item xs={5}>
          <TextField
            fullWidth
            id="outlined-select-currency"
            label="Price" /* < euro sticky to field> */
            value={price}
            onChange={handlePriceChange}
            onKeyPress={handleKeyPress}
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
        <Grid item xs={1}></Grid>
        <Grid item xs={5}>
          <TextField
            fullWidth
            id="outlined-currency"
            label="ROI" /* < euro sticky to field> */
            value={roi}
            disabled
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
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
            id="outlined-select-currency"
            label="Current Rent Price" /* < euro sticky to field> */
            value={currentRentPrice}
            onChange={handleCurrentRentPriceChange}
            onKeyPress={handleKeyPress}
            disabled={!additionalCheckbox1Enabled} // Disable if additional checkboxes are not enabled
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
            onChange={handleFirstCheckboxChange}
            checked={additionalCheckbox1Enabled} // Set the checked state based on additionalCheckboxesEnabled
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
            onChange={handleEstimatedRentPriceChange}
            onKeyPress={handleKeyPress}
            disabled={!additionalCheckbox2Enabled} // Disable if additional checkboxes are not enabled
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
            onChange={handleSecondCheckboxChange}
            checked={additionalCheckbox2Enabled} // Set the checked state based on additionalCheckboxesEnabled
            sx={{ cursor: "default" }}
            color="primary"
          />
          <Typography variant="body1" sx={{ ml: 0 }}></Typography>
        </Grid>
      </Grid>
      {/* //////////////////////////////// onROIChange  //////////////////////////////// */}
    </Grid>
  );
};

export default PopupWindow;
