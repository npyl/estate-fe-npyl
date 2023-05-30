import { Box, Typography, Grid, Paper } from "@mui/material";
import CheckboxItem from "./components/CheckboxItem";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectPriorityFeatures, setPriorityFeature, setNonPriorityFeature, selectLeaser, selectBuyer } from "src/slices/customer";

interface IFeatureSectionProps {
  priorityFeaturesMode: boolean;
}

const FeaturesForLandSection = (props: IFeatureSectionProps) => {
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
    <Grid item xs={12} padding={1}>
      <Grid container spacing={2}>
        <CheckboxItem label="Panoramic View" value={features.panoramicView} onChange={handleChange} />
        <CheckboxItem label="Corner" value={features.corner} onChange={handleChange} />
        <CheckboxItem label="Facade" value={features.facade} onChange={handleChange} />
        <CheckboxItem label="Within City Plan" value={features.withinCityPlan} onChange={handleChange} />
        <CheckboxItem label="Within Residential Zone" value={features.withinResidentialZone} onChange={handleChange} />
      </Grid>
    </Grid>
  );
};
export default FeaturesForLandSection;
