import React from "react";
import { IProperties } from "src/types/properties";

import { Typography, Box, Grid } from "@mui/material";

import { List, ListItem } from "src/components/List";

interface ParkingsSectionProps {
  data: IProperties;
}

const ParkingsSection: React.FC<ParkingsSectionProps> = (props) => {
  const { data } = props;
  const details = data?.propertyDetail;
  const parkings = details.parkings;

  return (
    <>
      {parkings?.map((parking, index) => {
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
              <Typography variant="h6">Parking No.{index + 1}</Typography>
            </Box>
            <List>
              <ListItem
                label="Parking Type"
                value={parking?.parkingType.toString() || ""}
                align="horizontal"
                divider
              />
              <ListItem
                label="Spots"
                value={parking?.spots.toString() || ""}
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

export default ParkingsSection;
