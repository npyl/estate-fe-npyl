import React from "react";
import { IProperties } from "src/types/properties";

import { Typography, Box } from "@mui/material";

import { List, ListItem, ListBooleanItem } from "src/components/List";

interface HeatingSectionProps {
  data: IProperties;
}

const HeatingSection: React.FC<HeatingSectionProps> = (props) => {
  const { data } = props;
  if (!data) return null;
  const heating = data?.heatingAndEnergy;
  if (!heating) return null;

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
        <Typography variant="h6">Heating & Energy</Typography>
      </Box>
      <List>
        <ListItem
          label="Energy Class"
          value={heating?.energyClass}
          align="horizontal"
          divider
        />
        <ListItem
          label="Heating Type"
          value={heating?.heatingType}
          align="horizontal"
          divider
        />
        <ListItem
          label="Heating System"
          value={heating?.heatingSystem}
          align="horizontal"
          divider
        />
        <ListItem
          label="Electricity Type"
          value={heating?.electricityType}
          align="horizontal"
          divider
        />
        <ListBooleanItem
          label="Floor Heating"
          status={heating?.floorHeating}
          align="horizontal"
          divider
        />
        <ListBooleanItem
          label="Air Conditioning"
          status={heating?.airConditioning}
          align="horizontal"
          divider
        />
        <ListBooleanItem
          label="Solar Boiler"
          status={heating?.solarBoiler}
          align="horizontal"
          divider
        />
        <ListItem
          label="Economy Electricity"
          value={heating?.offPeakElectricity}
          align="horizontal"
          divider
        />
      </List>
    </>
  );
};

export default HeatingSection;
