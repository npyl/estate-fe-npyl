import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Rating,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useAllGlobalsQuery } from "src/services/global";
import { useAllUsersQuery } from "src/services/user";

import CreateLabel from "./CreateLabel";

import {
  selectDateOfBirth,
  selectEmail,
  selectFax,
  selectFirstName,
  selectHomePhone,
  selectIdNumber,
  selectLabels,
  selectLastName,
  selectLeadSource,
  selectManagedBy,
  selectMobilePhone,
  selectNationality,
  selectPassportNumber,
  selectPreferredLanguage,
  selectStatus,
  selectSuggestedBy,
  setDateOfBirth,
  setEmail,
  setFax,
  // setters
  setFirstName,
  setHomePhone,
  setIdNumber,
  setLastName,
  setLeadSource,
  setMobilePhone,
  setNationality,
  setPassportNumber,
  setPreferredLanguage,
  setStatus,
} from "src/slices/customer";

import { useDispatch, useSelector } from "react-redux";

const CustomerInformation: React.FC<any> = (props) => {
  const enums = useAllGlobalsQuery().data;
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

  const dispatch = useDispatch();

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
              onChange={(e) => {
                dispatch(setFirstName(e.target.value));
              }}
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
              onChange={(e) => {
                dispatch(setLastName(e.target.value));
              }} //   onKeyPress={handleKeyPress}
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
              onChange={(e) => {
                dispatch(setEmail(e.target.value));
              }}
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
              onChange={(e) => {
                dispatch(setMobilePhone(e.target.value));
              }}
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
              onChange={(e) => {
                dispatch(setHomePhone(e.target.value));
              }}
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
              onChange={(e) => {
                dispatch(setFax(e.target.value));
              }}
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
              onChange={(e) => {
                dispatch(setNationality(e.target.value));
              }}
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
              onChange={(e) => {
                dispatch(setIdNumber(e.target.value));
              }}
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
              onChange={(e) => {
                dispatch(setDateOfBirth(e.target.value));
              }}
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
              onChange={(e) => {
                dispatch(setPassportNumber(e.target.value));
              }}
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
              onChange={(e) => {
                dispatch(setPreferredLanguage(e.target.value));
              }}
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
                  dispatch(setLeadSource(e.target.value));
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
              onChange={(e) => {
                // dispatch(selectSuggestedBy(e.target.value));
              }}
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
                  onChange={(_event, newValue) => {
                    dispatch(setStatus(newValue));
                  }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <CreateLabel />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default CustomerInformation;
