import { Grid, MenuItem, Paper, TextField, Typography, Box } from "@mui/material";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";
import {
  selectParkingType,
  selectSpots,
  setParkingType,
  setSpots,
} from "src/slices/property";
import { useAllGlobalsQuery } from "src/services/global";
import OnlyNumbersInput from "./OnlyNumbers";

const ParkingSection: React.FC<any> = (props) => {
  const { data } = useAllGlobalsQuery();
  const enums: IGlobalProperty = data?.property as IGlobalProperty;
  const details = enums?.details as IGlobalPropertyDetails;

  const dispatch = useDispatch();

  const parkingType = useSelector(selectParkingType);
  const spots = useSelector(selectSpots);

  if (!details || !details.parkingType) return null;

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
        <Typography variant="h6">Parking</Typography>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-select-currency"
              select
              label="Type"
              value={parkingType}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setParkingType(event.target.value));
              }}
              size="small"
            >
              {details?.parkingType?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <OnlyNumbersInput label="Number of Spots" value={spots} onChange={(value) => {
              dispatch(setSpots(value));
            }} />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default ParkingSection;
