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
import {
  selectPrice,
  selectEstimatedRentPrice,
  setEstimatedRentPrice,
  selectCurrentRentPrice,
  setCurrentRentPrice,
  setPrice,
} from "src/slices/property";

import { useState } from "react";
import { useTranslation } from "react-i18next";

const ROISection: React.FC<any> = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const price = useSelector(selectPrice);
  const currentRentPrice = useSelector(selectCurrentRentPrice);
  const estimatedRentPrice = useSelector(selectEstimatedRentPrice);

  const [additionalCheckbox1Enabled, setAdditionalCheckbox1Enabled] =
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
  //set the values for BE
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
    dispatch(setPrice(numericValue));
  };
  const handleCurrentRentPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
    dispatch(setCurrentRentPrice(numericValue));
  };
  const handleEstimatedRentPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
    dispatch(setEstimatedRentPrice(numericValue));
  };
  //handle onlynumbers
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const regex = /[0-9]/;
    if (!regex.test(keyValue)) {
      event.preventDefault(); // Prevent entering non-numeric characters
    }
  };
  const parsedPrice = price;
  const parsedCurrentRentPrice = currentRentPrice;
  const parsedEstimatedRentPrice = estimatedRentPrice;

  const roi: number = additionalCheckbox1Enabled
    ? parsedPrice && parsedCurrentRentPrice && parsedPrice !== 0
      ? ((parsedCurrentRentPrice * 12) / parsedPrice) * 100
      : 0
    : additionalCheckbox2Enabled
    ? parsedPrice && parsedEstimatedRentPrice && parsedPrice !== 0
      ? ((parsedEstimatedRentPrice * 12) / parsedPrice) * 100
      : 0
    : 0;

  return (
    <Paper elevation={10} sx={{ padding: 0.5, overflow: "auto" }}>
      <Box
        sx={{
          px: 3,
          py: 1.5,
          display: "flex",
          justifyContent: "left",
        }}
      >
        <Typography variant="h6">{t("ROI")}</Typography>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <TextField
              fullWidth
              id="outlined-select-currency"
              label={t("Price")} /* < euro sticky to field> */
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
              id="roi-textfield"
              fullWidth
              label={t("ROI")}
              value={roi}
              variant="outlined"
              disabled
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              fullWidth
              id="outlined-select-currency"
              label={t("Current Rent Price")} /* < euro sticky to field> */
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
              label={t("Estimated Rent Price")} /* < euro sticky to field> */
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
      </Grid>
    </Paper>
  );
};

export default ROISection;

// ROI = [(Current Rent Price or Estimated Rent Price *12) / Price]*100 (Μόνο στο sale)
