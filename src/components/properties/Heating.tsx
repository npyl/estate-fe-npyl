import * as React from "react";
import Typography from "@mui/material/Typography";
import { Grid, Paper, TextField, MenuItem } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Checkbox from "@mui/material/Checkbox";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";

import { useDispatch } from "react-redux";
import {
  selectHeatingType,
  selectHeatingSystem,
  selectFloorHeating,
  selectAirConditioning,
  setHeatingType,
  setFloorHeating,
  setHeatingSystem,
  setAirConditioning,
} from "src/slices/property";

const HeatingSection: React.FC<any> = (props) => {
  const enums = props.enums as IGlobalProperty;
  const details = enums?.details as IGlobalPropertyDetails;

  const dispatch = useDispatch();

  const heatingType = useSelector(selectHeatingType);
  const heatingSystem = useSelector(selectHeatingSystem);
  const floorHeating = useSelector(selectFloorHeating);
  const airConditioning = useSelector(selectAirConditioning);

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
        <Typography variant="h6">Heating</Typography>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-select-currency"
              select
              label="Type"
              value={heatingType}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setHeatingType(event.target.value));
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end"></InputAdornment>,
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
              size="small"
            >
              {details?.heatingType?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-select-currency"
              select
              label="Heating System"
              value={heatingSystem}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setHeatingSystem(event.target.value));
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end"></InputAdornment>,
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
              size="small"
            >
              {details?.heatingSystem?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid container spacing={-11} justifyContent={"space-around"}>
            <Grid
              item
              xs={4}
              flexDirection="row"
              sx={{ display: "inline-flex", alignItems: "center" }}
            >
              <Checkbox
                value={floorHeating}
                checked={floorHeating}
                onChange={(
                  event: React.ChangeEvent<unknown>,
                  checked: boolean
                ) => {
                  dispatch(setFloorHeating(checked));
                }}
                sx={{ cursor: "default" }}
                color="primary"
                inputProps={{ "aria-label": "Floor Heating Checkbox" }}
              />
              <Typography variant="body1" sx={{ ml: 0 }}>
                Floor Heating
              </Typography>
            </Grid>

            <Grid item xs={1.8}></Grid>
            <Grid
              item
              xs={4}
              flexDirection="row"
              sx={{ display: "inline-flex", alignItems: "center" }}
            >
              <Checkbox
                value={airConditioning}
                checked={airConditioning}
                onChange={(
                  event: React.ChangeEvent<unknown>,
                  checked: boolean
                ) => {
                  dispatch(setAirConditioning(checked));
                }}
                sx={{ cursor: "default" }}
                color="primary"
                inputProps={{ "aria-label": "Floor Heating Checkbox" }}
              />
              <Typography variant="body1" sx={{ ml: 0 }}>
                Air-Coditioning
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default HeatingSection;
