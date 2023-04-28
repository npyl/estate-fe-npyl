import React from "react";
import { IProperties } from "src/types/properties";

import { Typography, Box } from "@mui/material";

import { List, ListItem, ListBooleanItem } from "src/components/List";

interface HeatingSectionProps {
  data: IProperties;
}

const HeatingSection: React.FC<HeatingSectionProps> = (props) => {
  const { data } = props;
  const details = data?.propertyDetail;
  const features = data?.features;
  const heating = details.heating;

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
          value={details?.energyClass.toString() || ""}
          align="horizontal"
          divider
        />
        <ListItem
          label="Heating System"
          value={heating?.heatingSystem.toString() || ""}
          align="horizontal"
          divider
        />
        <ListItem
          label="Heating Type"
          value={heating?.heatingType.toString() || ""}
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
          status={features?.solarBoiler || true}
          align="horizontal"
          divider
        />
        <ListBooleanItem
          label="Floor Heating"
          status={heating?.floorHeating}
          align="horizontal"
          divider
        />
        <ListItem
          label="TODO: Nyxterino Reuma"
          // value={details?..toString() || ""}
          align="horizontal"
          divider
        />
      </List>
    </>
  );
};

export default HeatingSection;
