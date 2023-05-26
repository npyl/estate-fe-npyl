import { Grid, MenuItem, Paper, TextField, Typography, Box, IconButton } from "@mui/material";
import { AddCircle, Cancel } from "@mui/icons-material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAllGlobalsQuery } from "src/services/global";
import {
  selectBalconies,
  setBalconySide,
  setBalconyArea,
  addBalcony,
  removeBalcony
} from "src/slices/property";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";
import OnlyNumbersInput from "./OnlyNumbers";

const BalconiesSection: React.FC<any> = (props) => {
  const { data } = useAllGlobalsQuery();
  const enums: IGlobalProperty = data?.property as IGlobalProperty;
  const details = enums?.details as IGlobalPropertyDetails;

  const dispatch = useDispatch();

  const balconies = useSelector(selectBalconies);

  if (!details || !details.balconySide) return null;

  return (
    <Paper elevation={10} sx={{ padding: 0.5, overflow: "auto" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6" flex={1}>
          Balconies
        </Typography>
        <IconButton
          onClick={() => {
            dispatch(addBalcony({}));
          }}
        >
          <AddCircle />
        </IconButton>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container spacing={1}>
          {balconies.map((balcony, index) => {
            return <>
              <Grid item xs={5.5} key={index}>
                <TextField
                  fullWidth
                  id="outlined-select-currency"
                  select
                  label="Side"
                  value={balcony.side}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    dispatch(setBalconySide({ balconyIndex: index, side: event.target.value }));
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

              <Grid item xs={5.5}>
                <OnlyNumbersInput label="Area" value={balcony.area} onChange={(value) => {
                  dispatch(setBalconyArea({ balconyIndex: index, area: value }));
                }} />
              </Grid>

              <Grid item xs={1}>
                <IconButton
                  onClick={() => {
                    dispatch(removeBalcony(index));
                  }}
                >
                  <Cancel />
                </IconButton>
              </Grid>
            </>
          })}
        </Grid>
      </Grid>
    </Paper >
  );
};
export default BalconiesSection;
