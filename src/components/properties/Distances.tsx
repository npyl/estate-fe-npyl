import * as React from "react";
import Typography from "@mui/material/Typography";
import { Grid, Paper, TextField, MenuItem, List } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";

import { useDispatch } from "react-redux";
import {
  selectToPublicTransport,
  selectToSea,
  setToPublicTransport,
  setToSea,
} from "src/slices/property";

const DistancesSection: React.FC<any> = (props) => {
  const enums = props.enums as IGlobalProperty;
  const details = enums?.details as IGlobalPropertyDetails;

  const dispatch = useDispatch();

  const toPublicTransport = useSelector(selectToPublicTransport);
  const toSea = useSelector(selectToSea);

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
        <Typography variant="h6">Distances</Typography>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-controlled"
              label="Public Transportation"
              value={toPublicTransport}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setToPublicTransport(event.target.value));
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">km</InputAdornment>
                ),
              }}
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
              label="Sea"
              value={toSea}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setToSea(event.target.value));
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">km</InputAdornment>
                ),
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default DistancesSection;
