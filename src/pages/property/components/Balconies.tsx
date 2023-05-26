import { Grid, MenuItem, Paper, TextField, Typography, Box } from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAllGlobalsQuery } from "src/services/global";
import {
  selectArea,
  selectBalconySide,
  setArea,
  setBalconySide,
} from "src/slices/property";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";
import OnlyNumbersInput from "./OnlyNumbers";

const BalconiesSection: React.FC<any> = (props) => {
  const { data } = useAllGlobalsQuery();
  const enums: IGlobalProperty = data?.property as IGlobalProperty;
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

      <Grid item xs={12} padding={1}>
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
            <OnlyNumbersInput label="Area" value={area} onChange={(value) => {
              dispatch(setArea(value));
            }} />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default BalconiesSection;
