import { Grid } from "@mui/material";
import CheckboxItem from "./components/CheckboxItem";
import * as React from "react";
import { useSelector } from "react-redux";
import { selectPriorityFeatures, selectNonPriorityFeatures } from "src/slices/customer";
import { IFeatureSectionProps } from "./types/FeatureSectionProps";


const FeaturesForOtherSection = (props: IFeatureSectionProps) => {
  const { priorityFeaturesMode, onChange: handleChange } = props;

  const priorityFeatures = useSelector(selectPriorityFeatures);
  const nonPriorityFeatures = useSelector(selectNonPriorityFeatures);
  const features = (priorityFeaturesMode) ? priorityFeatures : nonPriorityFeatures;

  return (
    <Grid item xs={12} padding={1}>
      <Grid container spacing={2}>
        <CheckboxItem label="Panoramic View" value={features.panoramicView} sliceKey={"panoramicView"} onChange={handleChange} />
        <CheckboxItem label="Alarm System" value={features.alarmSystem} sliceKey={"alarmSystem"} onChange={handleChange} />
        <CheckboxItem label="Facade" value={features.facade} sliceKey={"facade"} onChange={handleChange} />
        <CheckboxItem label="Loading Dock" value={features.loadingDock} sliceKey={"loadingDock"} onChange={handleChange} />

        <CheckboxItem label="Veranda" value={features.veranda} sliceKey={"veranda"} onChange={handleChange} />
        <CheckboxItem label="View" value={features.view} sliceKey={"view"} onChange={handleChange} />
      </Grid>
    </Grid>
  );
};
export default FeaturesForOtherSection;
