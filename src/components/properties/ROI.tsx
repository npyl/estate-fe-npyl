// import {
//   Checkbox,
//   Grid,
//   InputAdornment,
//   Paper,
//   TextField,
// } from "@mui/material";
// import Typography from "@mui/material/Typography";
// import * as React from "react";

// import { Box } from "@mui/system";

// import { useDispatch, useSelector } from "react-redux";
// import { useAllCustomersQuery } from "src/services/customers";
// import {
//   selectPrice,
//   selectCottage,
//   selectDoctorsOffice,
//   selectInvestment,
//   selectEstimatedRentPrice,
//   setEstimatedRentPrice,
//   selectProfessionalUse,
//   selectRenovation,
//   selectCurrentRentPrice,
//   setCurrentRentPrice,
//   selectStudent,
//   selectTouristRental,
//   setPrice,
//   setAgriculturalUse,
//   setInvestment,
// } from "src/slices/property";

// import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";

// import { useState } from "react";
// import { useAllUsersQuery } from "src/services/user";
// import { useAllPropertyGlobalQuery } from "src/services/global";

// const ROISection: React.FC<any> = (props) => {
//   const [rentalPeriodStart, setRentalPeriodStart] = useState<Date | null>(
//     new Date()
//   );

//   const { data } = useAllPropertyGlobalQuery();
//   const enums: IGlobalProperty = data?.property as IGlobalProperty;
//   const details = enums?.details as IGlobalPropertyDetails;
//   const dispatch = useDispatch();

//   const student = useSelector(selectStudent);

//   const cottage = useSelector(selectCottage);
//   const touristRental = useSelector(selectTouristRental);
//   const investment = useSelector(selectInvestment);
//   const doctorsOffice = useSelector(selectDoctorsOffice);
//   const professionalUse = useSelector(selectProfessionalUse);
//   const renovation = useSelector(selectRenovation);
//   const price = useSelector(selectPrice);
//   const currentRentPrice = useSelector(selectCurrentRentPrice);
//   const estimatedRentPrice = useSelector(selectEstimatedRentPrice);

//   // get list of owners & managers
//   const { data: owners } = useAllCustomersQuery();
//   const { data: managers } = useAllUsersQuery();
//   if (!enums) return null;
//   return (
//     <Paper elevation={10} sx={{ padding: 0.5, overflow: "auto" }}>
//       <Box
//         sx={{
//           px: 3,
//           py: 1.5,
//           display: "flex",
//           justifyContent: "center",
//         }}
//       >
//         <Typography variant="h6">ROI</Typography>
//       </Box>

//       <Grid item xs={12} padding={1}>
//         <Grid container spacing={2}>
//           <Grid item xs={5}>
//             <TextField
//               fullWidth
//               id="outlined-select-currency"
//               label="Price" /* < euro sticky to field> */
//               value={price}
//               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
//                 dispatch(setPrice(event.target.value));
//               }}
//               InputProps={{
//                 endAdornment: <InputAdornment position="end">€</InputAdornment>,
//               }}
//               inputProps={{
//                 style: {
//                   height: "8px",
//                 },
//               }}
//             />
//           </Grid>
//           <Grid item xs={7}></Grid>

//           <Grid item xs={5}>
//             <TextField
//               fullWidth
//               id="outlined-select-currency"
//               label="Current Rent Price" /* < euro sticky to field> */
//               value={currentRentPrice}
//               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
//                 dispatch(setCurrentRentPrice(event.target.value));
//               }}
//               InputProps={{
//                 endAdornment: <InputAdornment position="end">€</InputAdornment>,
//               }}
//               inputProps={{
//                 style: {
//                   height: "8px",
//                 },
//               }}
//             />
//           </Grid>
//           <Grid
//             item
//             xs={1}
//             flexDirection="row"
//             sx={{ display: "inline-flex", alignItems: "center" }}
//           >
//             <Checkbox
//               onChange={(
//                 event: React.ChangeEvent<unknown>,
//                 checked: boolean
//               ) => {}}
//               sx={{ cursor: "default" }}
//               color="primary"
//             />
//             <Typography variant="body1" sx={{ ml: 0 }}></Typography>
//           </Grid>
//           <Grid item xs={5}>
//             <TextField
//               fullWidth
//               id="outlined-select-currency"
//               label="Estimated Rent Price" /* < euro sticky to field> */
//               value={estimatedRentPrice}
//               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
//                 dispatch(setEstimatedRentPrice(event.target.value));
//               }}
//               InputProps={{
//                 endAdornment: <InputAdornment position="end">€</InputAdornment>,
//               }}
//               inputProps={{
//                 style: {
//                   height: "8px",
//                 },
//               }}
//             />
//           </Grid>
//           <Grid
//             item
//             xs={1}
//             flexDirection="row"
//             sx={{ display: "inline-flex", alignItems: "center" }}
//           >
//             <Checkbox
//               onChange={(
//                 event: React.ChangeEvent<unknown>,
//                 checked: boolean
//               ) => {}}
//               sx={{ cursor: "default" }}
//               color="primary"
//             />
//             <Typography variant="body1" sx={{ ml: 0 }}></Typography>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// };

// export default ROISection;

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
  selectEstimatedRentPrice,
  setEstimatedRentPrice,
  selectCurrentRentPrice,
  setCurrentRentPrice,
  selectStudent,
  setPrice,
} from "src/slices/property";

import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";

import { useState } from "react";
import { useAllUsersQuery } from "src/services/user";
import { useAllPropertyGlobalQuery } from "src/services/global";

const ROISection: React.FC<any> = (props) => {
  const { data } = useAllPropertyGlobalQuery();
  const enums: IGlobalProperty = data?.property as IGlobalProperty;
  const details = enums?.details as IGlobalPropertyDetails;
  const dispatch = useDispatch();

  const student = useSelector(selectStudent);

  const price = useSelector(selectPrice);
  const currentRentPrice = useSelector(selectCurrentRentPrice);
  const estimatedRentPrice = useSelector(selectEstimatedRentPrice);

  // get list of owners & managers
  const { data: owners } = useAllCustomersQuery();
  const { data: managers } = useAllUsersQuery();
  if (!enums) return null;

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
          <Grid item xs={7}></Grid>
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
      </Grid>
    </Paper>
  );
};

export default ROISection;
