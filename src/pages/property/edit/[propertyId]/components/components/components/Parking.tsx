import {
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { AddCircle, Cancel } from "@mui/icons-material";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";
import {
  selectParkings,
  setParkingType,
  setParkingSpots,
  addParking,
  removeParking,
} from "src/slices/property";
import { useAllGlobalsQuery } from "src/services/global";
import OnlyNumbersInput from "../../../../../../../components/OnlyNumbers";
import { useTranslation } from "react-i18next";

const ParkingSection: React.FC<any> = () => {
  const { data } = useAllGlobalsQuery();
  const enums: IGlobalProperty = data?.property as IGlobalProperty;
  const details = enums?.details as IGlobalPropertyDetails;

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const parkings = useSelector(selectParkings) || [];

  if (!details || !details.parkingType) return null;

  return (
    <Paper elevation={10} sx={{ padding: 0.5, overflow: "auto" }}>
      <Box
        sx={{
          px: 3,
          py: 1.5,
          display: "flex",
          justifyContent: "left",
        }}
      >
        <Typography variant="h6" flex={1}>
          {t("Parking")}
        </Typography>
        <IconButton
          onClick={() => {
            dispatch(addParking({}));
          }}
        >
          <AddCircle />
        </IconButton>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container spacing={1}>
          {parkings.map((parking, index) => {
            return (
              <>
                <Grid item xs={5.5} key={index}>
                  <TextField
                    fullWidth
                    id="outlined-select-currency"
                    select
                    label={t("Type")}
                    value={parking.parkingType}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(
                        setParkingType({
                          parkingIndex: index,
                          type: event.target.value,
                        })
                      );
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

                <Grid item xs={5.5}>
                  <OnlyNumbersInput
                    label={t("Number of Spots")}
                    value={parking.spots}
                    onChange={(value) => {
                      dispatch(
                        setParkingSpots({ parkingIndex: index, spots: value })
                      );
                    }}
                  />
                </Grid>

                <Grid item xs={1}>
                  <IconButton
                    onClick={() => {
                      dispatch(removeParking(index));
                    }}
                  >
                    <Cancel />
                  </IconButton>
                </Grid>
              </>
            );
          })}
        </Grid>
      </Grid>
    </Paper>
  );
};
export default ParkingSection;
