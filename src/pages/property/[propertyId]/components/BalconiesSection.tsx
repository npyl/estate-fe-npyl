import React from "react";
import { IProperties } from "src/types/properties";

import { Typography, Box, Grid } from "@mui/material";

import { List, ListItem } from "src/components/List";

interface BalconiesSectionProps {
  data: IProperties;
}

const BalconiesSection: React.FC<BalconiesSectionProps> = (props) => {
  const { data } = props;
  const details = data?.propertyDetail;
  const balconies = details.balconies;

  return (
    <>
      {balconies?.map((balcony, index) => {
        return (
          <Grid
            sx={{ border: 1, borderColor: "divider", borderRadius: 1 }}
            item
            key={index}
          >
            <Box
              sx={{
                px: 3,
                py: 1.5,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6">Balcony No.{index + 1}</Typography>
            </Box>
            <List>
              <ListItem
                label="Area"
                value={balcony?.area.toString() || ""}
                align="horizontal"
                divider
              />
              <ListItem
                label="Side"
                value={balcony?.side.toString() || ""}
                align="horizontal"
                divider
              />
            </List>
          </Grid>
        );
      })}
    </>
  );
};

export default BalconiesSection;
