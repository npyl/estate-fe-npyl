import { Grid } from "@mui/material";
import CheckboxItem from "./components/CheckboxItem";
import * as React from "react";
import { useSelector } from "react-redux";
import {
  selectPriorityFeatures,
  selectNonPriorityFeatures,
} from "src/slices/customer";
import { IFeatureSectionProps } from "./types/FeatureSectionProps";
import { useTranslation } from "react-i18next";

const FeaturesForCommercialSection = (props: IFeatureSectionProps) => {
  const { priorityFeaturesMode, onChange: handleChange } = props;

  const priorityFeatures = useSelector(selectPriorityFeatures);
  const nonPriorityFeatures = useSelector(selectNonPriorityFeatures);
  const features = priorityFeaturesMode
    ? priorityFeatures
    : nonPriorityFeatures;
  const { t } = useTranslation();
  return (
    <Grid item xs={12} padding={1}>
      <Grid container spacing={2}>
        <CheckboxItem
          label={t("Organized Garden")}
          value={features.organizedGarden}
          sliceKey={"organizedGarden"}
          onChange={handleChange}
        />
        <CheckboxItem
          label="Alarm System"
          value={features.alarmSystem}
          sliceKey={"alarmSystem"}
          onChange={handleChange}
        />
        <CheckboxItem
          label="Has 24 Hours Security"
          value={features.has24HoursSecurity}
          sliceKey={"has24HoursSecurity"}
          onChange={handleChange}
        />
        <CheckboxItem
          label="CCTV"
          value={features.cctv}
          sliceKey={"cctv"}
          onChange={handleChange}
        />

        <CheckboxItem
          label="Internet"
          value={features.internet}
          sliceKey={"internet"}
          onChange={handleChange}
        />
        <CheckboxItem
          label="Walkable Distance to Beach"
          value={features.walkableDistanceToBeach}
          sliceKey={"walkableDistanceToBeach"}
          onChange={handleChange}
        />
        <CheckboxItem
          label="Fire Detector"
          value={features.fireDetector}
          sliceKey={"fireDetector"}
          onChange={handleChange}
        />
        <CheckboxItem
          label="Quiet Area"
          value={features.quietArea}
          sliceKey={"quietArea"}
          onChange={handleChange}
        />

        <CheckboxItem
          label="Sound Insulation"
          value={features.soundInsulation}
          sliceKey={"soundInsulation"}
          onChange={handleChange}
        />
        <CheckboxItem
          label="Access for Disabled"
          value={features.accessForDisabled}
          sliceKey={"accessForDisabled"}
          onChange={handleChange}
        />
        <CheckboxItem
          label="Independent Heating Per Room"
          value={features.fireDetector}
          sliceKey={"independentHeatingPerRoom"}
          onChange={handleChange}
        />
        <CheckboxItem
          label="Bright"
          value={features.bright}
          sliceKey={"bright"}
          onChange={handleChange}
        />

        <CheckboxItem
          label="Adapting to the Ground"
          value={features.adaptingToTheGround}
          sliceKey={"adaptingToTheGround"}
          onChange={handleChange}
        />
        <CheckboxItem
          label="Pool"
          value={features.pool}
          sliceKey={"pool"}
          onChange={handleChange}
        />
        <CheckboxItem
          label="View"
          value={features.view}
          sliceKey={"view"}
          onChange={handleChange}
        />
        <CheckboxItem
          label="Veranda"
          value={features.veranda}
          sliceKey={"veranda"}
          onChange={handleChange}
        />

        <CheckboxItem
          label="Corner"
          value={features.corner}
          sliceKey={"corner"}
          onChange={handleChange}
        />
        <CheckboxItem
          label="Facade"
          value={features.facade}
          sliceKey={"facade"}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};
export default FeaturesForCommercialSection;
