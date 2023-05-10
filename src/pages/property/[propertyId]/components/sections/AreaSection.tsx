import React from "react";
import { IProperties } from "src/types/properties";

import { Typography, Box } from "@mui/material";

import { List, ListItem } from "src/components/List";

interface AreaSectionProps {
  data: IProperties;
}

const AreaSection: React.FC<AreaSectionProps> = (props) => {
  const { data } = props;
  if (!data) return null;
  const areas = data?.areas;
  if (!areas) return null;

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
        {areas?.first && (
          <ListItem
            label="First"
            value={areas?.first}
            align="horizontal"
            divider
          />
        )}
        {areas?.second && (
          <ListItem
            label="Second"
            value={areas?.second}
            align="horizontal"
            divider
          />
        )}
        {areas?.third && (
          <ListItem
            label="Third"
            value={areas?.third}
            align="horizontal"
            divider
          />
        )}
        {areas?.fourth && (
          <ListItem
            label="Fourth"
            value={areas?.fourth}
            align="horizontal"
            divider
          />
        )}
        {areas?.fifth && (
          <ListItem
            label="Fifth"
            value={areas?.fifth}
            align="horizontal"
            divider
          />
        )}

        <ListItem label="Plot" value={areas?.plot} align="horizontal" divider />
        <ListItem
          label="Covered"
          value={areas?.covered}
          align="horizontal"
          divider
        />
        {areas?.basement && (
          <ListItem
            label="Basement"
            value={areas?.basement}
            align="horizontal"
            divider
          />
        )}
        {areas?.attic && (
          <ListItem
            label="Attic"
            value={areas?.attic}
            align="horizontal"
            divider
          />
        )}
        {areas?.garden && (
          <ListItem
            label="Garden"
            value={areas?.garden}
            align="horizontal"
            divider
          />
        )}
        {areas?.balconies && (
          <ListItem
            label="Balconies"
            value={areas?.balconies}
            align="horizontal"
            divider
          />
        )}
        {areas?.storeroom && (
          <ListItem
            label="Storeroom"
            value={areas?.storeroom}
            align="horizontal"
            divider
          />
        )}
        {areas?.groundFloor && (
          <ListItem
            label="Ground Floor"
            value={areas?.groundFloor}
            align="horizontal"
            divider
          />
        )}
      </List>
    </>
  );
};

export default AreaSection;
