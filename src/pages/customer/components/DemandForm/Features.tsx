import { Grid } from "@mui/material";
import CheckboxItem from "./components/CheckboxItem";
import * as React from "react";
import { useSelector } from "react-redux";
import { selectPriorityFeatures, selectNonPriorityFeatures } from "src/slices/customer";
import { IFeatureSectionProps } from "./types/FeatureSectionProps";

const FeaturesSection = (props: IFeatureSectionProps) => {
  const { priorityFeaturesMode, onChange: handleChange } = props;

  const priorityFeatures = useSelector(selectPriorityFeatures);
  const nonPriorityFeatures = useSelector(selectNonPriorityFeatures);
  const features = (priorityFeaturesMode) ? priorityFeatures : nonPriorityFeatures;

  return (
    <Grid item xs={12} padding={1}>
      <Grid container spacing={2}>
        <CheckboxItem label="Panoramic View" value={features.panoramicView} sliceKey={"panoramicView"} onChange={handleChange} />
        <CheckboxItem label="Smart Home" value={features.smartHome} sliceKey={"smartHome"} onChange={handleChange} />
        <CheckboxItem label="Organized Garden" value={features.organizedGarden} sliceKey={"organizedGarden"} onChange={handleChange} />
        <CheckboxItem label="Alarm System" value={features.alarmSystem} sliceKey={"alarmSystem"} onChange={handleChange} />

        <CheckboxItem label="Sea View" value={features.seaView} sliceKey={"seaView"} onChange={handleChange} />
        <CheckboxItem label="Guestroom" value={features.guestroom} sliceKey={"guestroom"} onChange={handleChange} />
        <CheckboxItem label="Jacuzzi" value={features.jacuzzi} sliceKey={"jacuzzi"} onChange={handleChange} />
        <CheckboxItem label="Has 24 Hours Security" value={features.has24HoursSecurity} sliceKey={"has24HoursSecurity"} onChange={handleChange} />

        <CheckboxItem label="Mountain View" value={features.mountainView} sliceKey={"mountainView"} onChange={handleChange} />
        <CheckboxItem label="Office" value={features.office} sliceKey={"office"} onChange={handleChange} />
        <CheckboxItem label="Well" value={features.well} sliceKey={"well"} onChange={handleChange} />
        <CheckboxItem label="CCTV" value={features.cctv} sliceKey={"cctv"} onChange={handleChange} />

        <CheckboxItem label="Sea Front" value={features.seaFront} sliceKey={"seaFront"} onChange={handleChange} />
        <CheckboxItem label="Home Cinema" value={features.homeCinema} sliceKey={"homeCinema"} onChange={handleChange} />
        <CheckboxItem label="Drilling" value={features.drilling} sliceKey={"drilling"} onChange={handleChange} />
        <CheckboxItem label="Internet" value={features.internet} sliceKey={"internet"} onChange={handleChange} />

        <CheckboxItem label="Walkable Distance to Beach" value={features.walkableDistanceToBeach} sliceKey={"walkableDistanceToBeach"} onChange={handleChange} />
        <CheckboxItem label="Combined Kitchen and Dining Area" value={features.combinedKitchenAndDiningArea} sliceKey={"combinedKitchenAndDiningArea"} onChange={handleChange} />
        <CheckboxItem label="Masonry Fence" value={features.masonryFence} sliceKey={"masonryFence"} onChange={handleChange} />
        <CheckboxItem label="Fire Detector" value={features.fireDetector} sliceKey={"fireDetector"} onChange={handleChange} />

        <CheckboxItem label="Quiet Area" value={features.quietArea} sliceKey={"quietArea"} onChange={handleChange} />
        <CheckboxItem label="Sound Insulation" value={features.soundInsulation} sliceKey={"soundInsulation"} onChange={handleChange} />
        <CheckboxItem label="Access for Disabled" value={features.accessForDisabled} sliceKey={"accessForDisabled"} onChange={handleChange} />
        <CheckboxItem label="Independent Heating Per Room" value={features.fireDetector} sliceKey={"independentHeatingPerRoom"} onChange={handleChange} />

        <CheckboxItem label="Bright" value={features.bright} sliceKey={"bright"} onChange={handleChange} />
        <CheckboxItem label="Thermal Insulation" value={features.thermalInsulation} sliceKey={"thermalInsulation"} onChange={handleChange} />
        <CheckboxItem label="Adapting to the Ground" value={features.adaptingToTheGround} sliceKey={"adaptingToTheGround"} onChange={handleChange} />
        <CheckboxItem label="Pool" value={features.pool} sliceKey={"pool"} onChange={handleChange} />

        <CheckboxItem label="View" value={features.view} sliceKey={"view"} onChange={handleChange} />
        <CheckboxItem label="Veranda" value={features.veranda} sliceKey={"veranda"} onChange={handleChange} />
        <CheckboxItem label="Tents" value={features.tents} sliceKey={"tents"} onChange={handleChange} />

        <CheckboxItem label="Barbeque" value={features.barbeque} sliceKey={"barbeque"} onChange={handleChange} />
        <CheckboxItem label="Corner" value={features.corner} sliceKey={"corner"} onChange={handleChange} />
        <CheckboxItem label="Facade" value={features.facade} sliceKey={"facade"} onChange={handleChange} />
        <CheckboxItem label="Heated Pool" value={features.heatedPool} sliceKey={"heatedPool"} onChange={handleChange} />

        <CheckboxItem label="Indoor Pool" value={features.indoorPool} sliceKey={"indoorPool"} onChange={handleChange} />
        <CheckboxItem label="Near Bus Route" value={features.nearBusRoute} sliceKey={"nearBusRoute"} onChange={handleChange} />
      </Grid>
    </Grid>

  );
};
export default FeaturesSection;
