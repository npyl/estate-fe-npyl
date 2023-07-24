import { Grid, Paper, Typography, Box } from "@mui/material";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectAttic,
  selectBalconiesArea,
  selectBasement,
  selectCovered,
  selectGarden,
  selectPlotArea,
  selectStoreroom,
  setAttic,
  setBalconies,
  setBasement,
  setCovered,
  setGarden,
  setStoreroom,
} from "src/slices/property";

import FloorAreasInput from "./FloorAreasInput";
import OnlyNumbersInput from "src/components/OnlyNumbers";
import { useTranslation } from "react-i18next";

const AreasSection: React.FC<any> = () => {
  const dispatch = useDispatch();

  const plot = useSelector(selectPlotArea);
  const covered = useSelector(selectCovered);
  const basement = useSelector(selectBasement);
  const attic = useSelector(selectAttic);
  const garden = useSelector(selectGarden);
  const balconies = useSelector(selectBalconiesArea);
  const storeroom = useSelector(selectStoreroom);
  const { t } = useTranslation();
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
          justifyContent: "left",
        }}
      >
        <Typography variant="h6">{t("Areas")}</Typography>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FloorAreasInput />
          </Grid>

          <Grid item xs={6}>
            <OnlyNumbersInput
              label={t("Covered")}
              value={covered}
              adornment="m²"
              onChange={(value) => {
                dispatch(setCovered(value));
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <OnlyNumbersInput
              label={t("Basement")}
              value={basement}
              adornment="m²"
              onChange={(value) => {
                dispatch(setBasement(value));
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <OnlyNumbersInput
              label={t("Attic")}
              value={attic}
              adornment="m²"
              onChange={(value) => {
                dispatch(setAttic(value));
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <OnlyNumbersInput
              label={t("Garden")}
              value={garden}
              adornment="m²"
              onChange={(value) => {
                dispatch(setGarden(value));
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <OnlyNumbersInput
              label={t("Balconies")}
              value={balconies}
              adornment="m²"
              onChange={(value) => {
                dispatch(setBalconies(value));
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <OnlyNumbersInput
              label={t("Storeroom")}
              value={storeroom}
              adornment="m²"
              onChange={(value) => {
                dispatch(setStoreroom(value));
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default AreasSection;
