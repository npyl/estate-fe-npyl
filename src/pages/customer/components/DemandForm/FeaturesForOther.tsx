import { Typography, Box, Grid, Paper } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import CheckboxItem from "./components/CheckboxItem";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPriorityFeatures, selectNonPriorityFeatures } from "src/slices/customer";

interface IFeatureSectionProps {
  priorityFeaturesMode: boolean;
}

const FeaturesForOtherSection = (props: IFeatureSectionProps) => {
  const { priorityFeaturesMode } = props;

  const dispatch = useDispatch();

  const priorityFeatures = useSelector(selectPriorityFeatures);
  const nonPriorityFeatures = useSelector(selectPriorityFeatures);
  const features = (priorityFeaturesMode) ? priorityFeatures : nonPriorityFeatures;

  const handleChange = () => {
    if (priorityFeaturesMode) {

    }
    else {

    }
  }


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
        <Typography variant="h6">Feautures</Typography>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container spacing={2}>
          <CheckboxItem label="Panoramic View" value={features.panoramicView} onChange={handleChange} />
          <CheckboxItem label="Alarm System" value={features.alarmSystem} onChange={handleChange} />
          <CheckboxItem label="Facade" value={features.facade} onChange={handleChange} />
          <CheckboxItem label="Loading Dock" value={features.loadingDock} onChange={handleChange} />

          <CheckboxItem label="Veranda" value={features.veranda} onChange={handleChange} />
          <CheckboxItem label="View" value={features.view} onChange={handleChange} />
        </Grid>
      </Grid>
    </Paper>
  );
};
export default FeaturesForOtherSection;
