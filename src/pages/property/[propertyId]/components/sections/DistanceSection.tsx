import React from "react";
import { IProperties } from "src/types/properties";

import { Typography, Box } from "@mui/material";

import { List, ListItem } from "src/components/List";

interface DistanceSectionProps {
  data: IProperties;
}

const DistanceSection: React.FC<DistanceSectionProps> = (props) => {
  const { data } = props;
  if (!data) return null;
  const distances = data?.distances;
  if (!distances) return null;

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
          label="Schools"
          value={distances?.schools}
          align="horizontal"
          divider
        />
        <ListItem
          label="Supermarket"
          value={distances?.supermarket}
          align="horizontal"
          divider
        />
        <ListItem
          label="Cafe Restaurant"
          value={distances?.cafeRestaurant}
          align="horizontal"
          divider
        />
        <ListItem
          label="Hospital"
          value={distances?.hospital}
          align="horizontal"
          divider
        />
        <ListItem
          label="Airport"
          value={distances?.airport}
          align="horizontal"
          divider
        />
        <ListItem
          label="From Sea"
          value={distances?.sea}
          align="horizontal"
          divider
        />
        <ListItem
          label="From Public Transport"
          value={distances?.publicTransport}
          align="horizontal"
          divider
        />
        <ListItem
          label="Entertainment"
          value={distances?.entertainment}
          align="horizontal"
          divider
        />
      </List>
    </>
  );
};

export default DistanceSection;
