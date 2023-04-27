import React from "react";
import { IProperties } from "src/types/properties";

import { Typography, Box } from "@mui/material";

import { List, ListItem } from "src/components/List";

interface AreaSectionProps {
  data: IProperties;
}

const AreaSection: React.FC<AreaSectionProps> = (props) => {
  const { data } = props;
  const details = data?.propertyDetail;
  const areas = details.areas;

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
        <Typography variant="h6">Area</Typography>
      </Box>
      <List>
        <ListItem
          label="Plot"
          value={areas?.plot.toString() || ""}
          align="horizontal"
          divider
        />
        <ListItem
          label="Covered"
          value={areas?.covered.toString() || ""}
          align="horizontal"
          divider
        />
        <ListItem
          label="Basement"
          value={areas?.basement.toString() || ""}
          align="horizontal"
          divider
        />
        <ListItem
          label="Attic"
          value={areas?.attic.toString() || ""}
          align="horizontal"
          divider
        />
        <ListItem
          label="Garden"
          value={areas?.garden.toString() || ""}
          align="horizontal"
          divider
        />
        <ListItem
          label="Balconies"
          value={areas?.balconies.toString() || ""}
          align="horizontal"
          divider
        />
      </List>
    </>
  );
};

export default AreaSection;
