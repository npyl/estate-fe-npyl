import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid, Paper, TextField, MenuItem, List } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { PropertyListBooleanItem } from "src/components/property-list-boolean-item";
import { PropertyListItem } from "src/components/property-list-item";
import { PropertyListManagerItem } from "src/components/property-list-manager-item";
import { PropertyListStatusItem } from "src/components/property-list-availability-item";
import { IProperties } from "src/types/properties";

import { useDispatch } from "react-redux";
import {
  selectStreet,
  selectNumber,
  selectCity,
  selectComplex,
  selectZipCode,
  selectRegion,
  selectCountry,
  selectOrientation,
  setStreet,
  setNumber,
  setCity,
  setComplex,
  setZipCode,
  setRegion,
  setCountry,
  setOrientation
  
} from "src/slices/property";

const LocationSection: React.FC<any> = (props) => {
  const enums = props.enums as IGlobalProperty;
  const details = enums?.details as IGlobalPropertyDetails;

  const dispatch = useDispatch();

  const street = useSelector(selectStreet);
  const number = useSelector(selectNumber);
  const city = useSelector(selectCity);
  const complex = useSelector(selectComplex);
  const zipCode = useSelector(selectZipCode);
  const region = useSelector(selectRegion);
  const country = useSelector(selectCountry);
  const orientation = useSelector(selectOrientation);

  return (
   
            <Paper
              elevation={10}
              sx={{ padding: 0.5, overflow: "auto"}}
            >
              <Box
                sx={{
                  px: 3,
                  py: 1.5,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6">Location</Typography>
              </Box>

              <Grid item xs={12} padding={1}>
                <Grid container item xs={12} spacing={2}>

                <Grid item xs={6}>
                     {/* <> */}
                     <TextField
                      fullWidth
                      id="outlined-controlled"
                      label="Street*"
                      value={street}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        dispatch(setStreet(event.target.value));
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end"></InputAdornment>
                        ),
                      }}
                      inputProps={{
                        shrink: true,
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
                      label="Number*"
                      value={number}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        dispatch(setNumber(event.target.value));
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="end"></InputAdornment>
                        ),
                      }}
                      inputProps={{
                        shrink: true,
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
                      label="City*"
                      value={city}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        dispatch(setCity(event.target.value));
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="end"></InputAdornment>
                        ),
                      }}
                      inputProps={{
                        shrink: true,
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
                      label="Complex"
                      value={complex}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        dispatch(setComplex(event.target.value));
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="end"></InputAdornment>
                        ),
                      }}
                      inputProps={{
                        shrink: true,
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
                      label="Zip Code*"
                      value={zipCode}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        dispatch(setZipCode(event.target.value));
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="end"></InputAdornment>
                        ),
                      }}
                      inputProps={{
                        shrink: true,
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
                      label="Region*"
                      value={region}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        dispatch(setRegion(event.target.value));
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="end"></InputAdornment>
                        ),
                      }}
                      inputProps={{
                        shrink: true,
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
                      label="Country*"
                      value={country}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        dispatch(setCountry(event.target.value));
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="end"></InputAdornment>
                        ),
                      }}
                      inputProps={{
                        shrink: true,
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
                            select
                            label="Orientation"
                            value={orientation}
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              dispatch(setOrientation(event.target.value));
                            }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="end"></InputAdornment>
                              ),
                            }}
                            inputProps={{
                              shrink: true,
                              style: {
                                height: "8px",
                              },
                              
                            }}
                            size="small"
                          >
                            {details?.orientation?.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                </Grid>
              </Grid>
            </Paper>
  );
};
export default LocationSection;
