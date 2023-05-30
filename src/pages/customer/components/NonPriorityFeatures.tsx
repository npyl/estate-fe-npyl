import { Typography, Grid, Paper, Box } from "@mui/material";
import * as React from "react";

import FeaturesSection from "./DemandForm/Features";
import FeaturesForCommercialSection from "./DemandForm/FeaturesForCommercial";
import FeaturesForLandSection from "./DemandForm/FeaturesForLand";
import FeaturesForOtherSection from "./DemandForm/FeaturesForOther";

import { selectLeaser, selectBuyer, selectDemand } from "src/slices/customer";
import { useSelector } from "react-redux";
import { IDemandPOST } from "src/types/demand";

const NonPriorityFeatures = () => {

  const leaser = useSelector(selectLeaser);
  const buyer = useSelector(selectBuyer);
  const demand: IDemandPOST = useSelector(selectDemand);

  const parentCategory = demand.filters?.parentCategory;
  if (!parentCategory) return null;

  return (
    (leaser || buyer) &&
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
        <Typography variant='h6'>Non-priority Features</Typography>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container spacing={2}>
          {parentCategory === "Residential" && <FeaturesSection priorityFeaturesMode />}
          {parentCategory === "Land" && <FeaturesForLandSection priorityFeaturesMode />}
          {parentCategory === "Commercial" && <FeaturesForCommercialSection priorityFeaturesMode />}
          {parentCategory === "Other" && <FeaturesForOtherSection priorityFeaturesMode />}
        </Grid>
      </Grid>
    </Paper>
  );
};
export default NonPriorityFeatures;
