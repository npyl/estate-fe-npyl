import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating,
} from "@mui/material";
import * as React from "react";
import { useAllPropertyGlobalQuery } from "src/services/global";
import { useAllUsersQuery } from "src/services/user";

import {
  selectFirstName,
  selectLastName,
  selectEmail,
  selectManagedBy,
  selectMobilePhone,
  selectHomePhone,
  selectFax,
  selectLabels,
  selectNationality,
  selectIdNumber,
  selectDateOfBirth,
  selectPassportNumber,
  selectPreferredLanguage,
  selectLeadSource,
  selectSuggestedBy,
  selectStatus,
} from "src/slices/customer";

import { useSelector } from "react-redux";

const CustomerInformation: React.FC<any> = (props) => {
  const enums = useAllPropertyGlobalQuery().data;
  const propertyEnums = enums?.property;
  const managers = useAllUsersQuery().data;

  const leadSourceEnum = ["1", "2"]; // TODO

  const firstName = useSelector(selectFirstName);
  const lastName = useSelector(selectLastName);
  const email = useSelector(selectEmail);
  const managedBy = useSelector(selectManagedBy);
  const mobilePhone = useSelector(selectMobilePhone);
  const homePhone = useSelector(selectHomePhone);
  const fax = useSelector(selectFax);
  const labels = useSelector(selectLabels);
  const nationality = useSelector(selectNationality);
  const idNumber = useSelector(selectIdNumber);
  const dateOfBirth = useSelector(selectDateOfBirth);
  const passportNumber = useSelector(selectPassportNumber);
  const preferredLanguage = useSelector(selectPreferredLanguage);
  const leadSource = useSelector(selectLeadSource);
  const suggestedBy = useSelector(selectSuggestedBy);
  const status = useSelector(selectStatus);

  if (!enums || !propertyEnums || !managers) return null;

  return (
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
        <Typography variant="h6">Customer Information</Typography>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-controlled"
              label="First Name"
              value={firstName}
              //   onChange={handlePlotChange}
              //   onKeyPress={handleKeyPress}
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
              label="Last Name"
              value={lastName}
              //   onChange={handleCoveredChange}
              //   onKeyPress={handleKeyPress}
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
              label="Email"
              value={email}
              //   onChange={handleBasementChange}
              //   onKeyPress={handleKeyPress}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Managed By</InputLabel>
              <Select
                value={managedBy}
                label="Managed By"
                onChange={(e) => {
                  // dispatch(setParentCategory(e.target.value));
                }}
              >
                {managers.map((manager, index) => {
                  return (
                    <MenuItem key={index} value={manager.id}>
                      {manager.firstName + " " + manager.lastName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-controlled"
              label="Mobile Phone"
              value={mobilePhone}
              //   onChange={handleGardenChange}
              //   onKeyPress={handleKeyPress}
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
              label="Home Phone"
              value={homePhone}
              //   onChange={handleBalconiesChange}
              //   onKeyPress={handleKeyPress}
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
              label="Fax"
              value={fax}
              //   onChange={handleStoreroomChange}
              //   onKeyPress={handleKeyPress}
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
              label="Labels"
              value={labels}
              //   onChange={handleStoreroomChange}
              //   onKeyPress={handleKeyPress}
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
              label="Nationality"
              value={nationality}
              //   onChange={handleStoreroomChange}
              //   onKeyPress={handleKeyPress}
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
              label="ID Number"
              value={idNumber}
              //   onChange={handleStoreroomChange}
              //   onKeyPress={handleKeyPress}
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
              label="Date of birth"
              value={dateOfBirth}
              //   onChange={handleStoreroomChange}
              //   onKeyPress={handleKeyPress}
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
              label="Passport number"
              value={passportNumber}
              //   onChange={handleStoreroomChange}
              //   onKeyPress={handleKeyPress}
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
              label="Preferred Language"
              value={preferredLanguage}
              //   onChange={handleStoreroomChange}
              //   onKeyPress={handleKeyPress}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Lead Source</InputLabel>
              <Select
                value={leadSource}
                label="Lead Source"
                onChange={(e) => {
                  // dispatch(setParentCategory(e.target.value));
                }}
              >
                {leadSourceEnum.map((leadSource, index) => {
                  return (
                    <MenuItem key={index} value={leadSource}>
                      {leadSource}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-controlled"
              label="Suggested by"
              value={suggestedBy}
              //   onChange={handleStoreroomChange}
              //   onKeyPress={handleKeyPress}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                height: "100%",
                px: 3,
                py: 1.5,
                display: "flex",
                justifyContent: "center",
              }}
              flexDirection={"column"}
            >
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="h6">Status</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "center", py: 1.5 }}>
                <Rating
                  name="simple-controlled"
                  value={status}
                  onChange={(event, newValue) => {
                    // setValue(newValue);
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default CustomerInformation;
