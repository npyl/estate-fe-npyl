import React from "react";
import { IProperties } from "src/types/properties";

import { Typography, Box } from "@mui/material";

import { List, ListBooleanItem, ListItem } from "src/components/List";

interface TechnicalFeaturesProps {
  data: IProperties;
}

const TechnicalFeatures: React.FC<TechnicalFeaturesProps> = (props) => {
  const { data } = props;
  const technicalFeatures = data?.technicalFeatures;
  if (!data || !technicalFeatures) return null;

  return (
    <>
      <Box
        sx={{
          px: 3,
          py: 1.5,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">Technical Details</Typography>
      </Box>
      <List>
        <ListItem
          label="Entrances"
          value={technicalFeatures?.entrances}
          align="horizontal"
          divider
        />
        <ListItem
          label="Display Windows Length"
          value={technicalFeatures?.displayWindowsLength}
          align="horizontal"
          divider
        />
        <ListBooleanItem
          label="Safety Door"
          status={technicalFeatures?.safetyDoor}
          align="horizontal"
          divider
        />
        <ListBooleanItem
          label="Alarm System"
          status={technicalFeatures?.alarmSystem}
          align="horizontal"
          divider
        />
        <ListBooleanItem
          label="Painted"
          status={technicalFeatures?.painted}
          align="horizontal"
          divider
        />
        <ListItem
          label="Furnished"
          value={technicalFeatures?.furnished}
          align="horizontal"
          divider
        />
        <ListItem
          label="Frame Type"
          value={technicalFeatures?.frameType}
          align="horizontal"
          divider
        />
        <ListItem
          label="Pane Glass Type"
          value={technicalFeatures?.paneGlassType}
          align="horizontal"
          divider
        />
        <ListBooleanItem
          label="Window Screens"
          status={technicalFeatures?.windowScreens}
          align="horizontal"
          divider
        />
        <ListBooleanItem
          label="Fireplace"
          status={technicalFeatures?.fireplace}
          align="horizontal"
          divider
        />
        <ListBooleanItem
          label="Bright"
          status={technicalFeatures?.bright}
          align="horizontal"
          divider
        />
        <ListBooleanItem
          label="Luxurious"
          status={technicalFeatures?.luxurious}
          align="horizontal"
          divider
        />
        <ListBooleanItem
          label="Electric Car Charging Facilities"
          status={technicalFeatures?.electricCarChargingFacilities}
          align="horizontal"
          divider
        />
        <ListBooleanItem
          label="Reception"
          status={technicalFeatures?.reception}
          align="horizontal"
          divider
        />
        <ListBooleanItem
          label="Pets Allowed"
          status={technicalFeatures?.petsAllowed}
          align="horizontal"
          divider
        />
        <ListItem
          label="Floor Type"
          value={technicalFeatures?.floorType}
          align="horizontal"
          divider
        />
        <ListBooleanItem
          label="Satellite TV"
          status={technicalFeatures?.satelliteTV}
          align="horizontal"
          divider
        />
        <ListBooleanItem
          label="Wiring"
          status={technicalFeatures?.wiring}
          align="horizontal"
          divider
        />
        <ListBooleanItem
          label="Loading - Unloading Elevator"
          status={technicalFeatures?.loadingUnloadingElevator}
          align="horizontal"
          divider
        />
        <ListBooleanItem
          label="False Ceiling"
          status={technicalFeatures?.falseCeiling}
          align="horizontal"
          divider
        />
        <ListBooleanItem
          label="With Equipment"
          status={technicalFeatures?.withEquipment}
          align="horizontal"
          divider
        />
        <ListBooleanItem
          label="Double Frontage"
          status={technicalFeatures?.doubleFrontage}
          align="horizontal"
          divider
        />
        <ListBooleanItem
          label="Consideration"
          status={technicalFeatures?.consideration}
          align="horizontal"
          divider
        />

        <ListItem
          label="Floor to Area Ratio"
          value={technicalFeatures?.floorToAreaRatio}
          align="horizontal"
          divider
        />
        <ListItem
          label="Coverage Factor"
          value={technicalFeatures?.coverageFactor}
          align="horizontal"
          divider
        />
        <ListItem
          label="Facade Length"
          value={technicalFeatures?.facadeLength}
          align="horizontal"
          divider
        />
        <ListItem
          label="Inclination"
          value={technicalFeatures?.inclination}
          align="horizontal"
          divider
        />
      </List>
    </>
  );
};

export default TechnicalFeatures;
