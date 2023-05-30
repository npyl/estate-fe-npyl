import { Box, Grid, Paper, Typography } from "@mui/material";
import CheckboxItem from "./components/CheckboxItem";

import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPriorityFeatures, setPriorityFeature, setNonPriorityFeature, selectLeaser, selectBuyer } from "src/slices/customer";

interface IFeatureSectionProps {
  priorityFeaturesMode: boolean;
}

const FeaturesSection = (props: IFeatureSectionProps) => {
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
          <CheckboxItem label="Smart Home" value={features.smartHome} onChange={handleChange} />
          <CheckboxItem label="Organized Garden" value={features.organizedGarden} onChange={handleChange} />
          <CheckboxItem label="Alarm System" value={features.alarmSystem} onChange={handleChange} />


          <CheckboxItem label="Sea View" value={features.seaView} onChange={handleChange} />
          <CheckboxItem label="Guestroom" value={features.guestroom} onChange={handleChange} />
          <CheckboxItem label="Jacuzzi" value={features.jacuzzi} onChange={handleChange} />
          <CheckboxItem label="Has 24 Hours Security" value={features.has24HoursSecurity} onChange={handleChange} />


          <CheckboxItem label="Mountain View" value={features.mountainView} onChange={handleChange} />
          <CheckboxItem label="Office" value={features.office} onChange={handleChange} />
          <CheckboxItem label="Well" value={features.well} onChange={handleChange} />
          <CheckboxItem label="CCTV" value={features.cctv} onChange={handleChange} />


          <CheckboxItem label="Sea Front" value={features.seaFront} onChange={handleChange} />
          <CheckboxItem label="Home Cinema" value={features.homeCinema} onChange={handleChange} />
          <CheckboxItem label="Drilling" value={features.drilling} onChange={handleChange} />
          <CheckboxItem label="Internet" value={features.internet} onChange={handleChange} />

          <CheckboxItem label="Walkable Distance to Beach" value={features.walkableDistanceToBeach} onChange={handleChange} />
          <CheckboxItem label="Combined Kitchen and Dining Area" value={features.combinedKitchenAndDiningArea} onChange={handleChange} />
          <CheckboxItem label="Masonry Fence" value={features.masonryFence} onChange={handleChange} />
          <CheckboxItem label="Fire Detector" value={features.fireDetector} onChange={handleChange} />

          <CheckboxItem label="Quiet Area" value={features.quietArea} onChange={handleChange} />
          <CheckboxItem label="Sound Insulation" value={features.soundInsulation} onChange={handleChange} />
          <CheckboxItem label="Access for Disabled" value={features.accessForDisabled} onChange={handleChange} />
          <CheckboxItem label="Independent Heating Per Room" value={features.fireDetector} onChange={handleChange} />

          <CheckboxItem label="Bright" value={features.bright} onChange={handleChange} />
          <CheckboxItem label="Thermal Insulation" value={features.thermalInsulation} onChange={handleChange} />
          <CheckboxItem label="Adapting to the Ground" value={features.adaptingToTheGround} onChange={handleChange} />
          <CheckboxItem label="Pool" value={features.pool} onChange={handleChange} />

          <CheckboxItem label="View" value={features.view} onChange={handleChange} />
          <CheckboxItem label="Thermal Insulation" value={features.thermalInsulation} onChange={handleChange} />
          <CheckboxItem label="Adapting to the Ground" value={features.adaptingToTheGround} onChange={handleChange} />
          <CheckboxItem label="Veranda" value={features.veranda} onChange={handleChange} />

          <CheckboxItem label="Tents" value={features.tents} onChange={handleChange} />
          <CheckboxItem label="Barbeque" value={features.barbeque} onChange={handleChange} />
          <CheckboxItem label="Corner" value={features.corner} onChange={handleChange} />
          <CheckboxItem label="Facade" value={features.facade} onChange={handleChange} />

          <CheckboxItem label="Heated Pool" value={features.heatedPool} onChange={handleChange} />
          <CheckboxItem label="Indoor Pool" value={features.indoorPool} onChange={handleChange} />
          <CheckboxItem label="Near Bus Route" value={features.nearBusRoute} onChange={handleChange} />
        </Grid>
      </Grid>
    </Paper>
  );
};
export default FeaturesSection;
