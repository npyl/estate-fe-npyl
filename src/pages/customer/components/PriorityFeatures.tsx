import { Box, Grid, Paper, Typography } from "@mui/material";

import FeaturesSection from "./DemandForm/Features";
import FeaturesForCommercialSection from "./DemandForm/FeaturesForCommercial";
import FeaturesForLandSection from "./DemandForm/FeaturesForLand";
import FeaturesForOtherSection from "./DemandForm/FeaturesForOther";

import { useDispatch, useSelector } from "react-redux";
import {
  selectBuyer,
  selectDemand,
  selectLeaser,
  setPriorityFeature,
} from "src/slices/customer";
import { IDemandPOST } from "src/types/demand";

const PriorityFeatures = () => {
  const dispatch = useDispatch();

  const leaser = useSelector(selectLeaser);
  const buyer = useSelector(selectBuyer);
  const demand: IDemandPOST = useSelector(selectDemand);

  const parentCategory = demand.filters?.parentCategory;
  if (!parentCategory) return null;

  const handleChange = (key: string, checked: boolean) => {
    dispatch(setPriorityFeature({ key }));
  };

  return leaser || buyer ? (
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
        <Typography variant='h6'>Priority Features</Typography>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container spacing={2}>
          {parentCategory === "Residential" && (
            <FeaturesSection priorityFeaturesMode onChange={handleChange} />
          )}
          {parentCategory === "Land" && (
            <FeaturesForLandSection
              priorityFeaturesMode
              onChange={handleChange}
            />
          )}
          {parentCategory === "Commercial" && (
            <FeaturesForCommercialSection
              priorityFeaturesMode
              onChange={handleChange}
            />
          )}
          {parentCategory === "Other" && (
            <FeaturesForOtherSection
              priorityFeaturesMode
              onChange={handleChange}
            />
          )}
        </Grid>
      </Grid>
    </Paper>
  ) : (
    <></>
  );
};
export default PriorityFeatures;
