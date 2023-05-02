import * as React from "react";
import Typography from "@mui/material/Typography";
import { Grid, Paper, TextField, MenuItem } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import {
  selectBalconySide,
  selectArea,
  setBalconySide,
  setArea,
} from "src/slices/property";

const BalconiesSection: React.FC<any> = (props) => {
  const enums = props.enums as IGlobalProperty;
  const details = enums?.details as IGlobalPropertyDetails;

  const dispatch = useDispatch();

  const balconySide = useSelector(selectBalconySide);
  const area = useSelector(selectArea);

  if (!details || !details.balconySide) return null;

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
        <Typography variant="h6">Balconies</Typography>
      </Box>

      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-select-currency"
              select
              label="Side"
              value={balconySide}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setBalconySide(event.target.value));
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
              size="small"
            >
              {details?.balconySide?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-controlled"
              label="Area"
              value={area}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setArea(event.target.value));
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">m²</InputAdornment>
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
export default BalconiesSection;
