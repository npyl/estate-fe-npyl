import React from "react";
import { IProperties } from "src/types/properties";

import { Typography, Box } from "@mui/material";

import { List, ListItem } from "src/components/List";

interface DistanceSectionProps {
  data: IProperties;
}

const DistanceSection: React.FC<DistanceSectionProps> = (props) => {
  const { data } = props;
  const details = data?.propertyDetail;
  const distance = details.distance;

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
        <Typography variant="h6">Distance</Typography>
      </Box>
      <List>
        <ListItem
          label="From Public Transport"
          value={distance?.toPublicTransport.toString() || ""}
          align="horizontal"
          divider
        />
        <ListItem
          label="From Sea"
          value={distance?.toSea.toString() || ""}
          align="horizontal"
          divider
        />
      </List>
    </>
  );
};

export default DistanceSection;
