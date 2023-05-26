import React from "react";
import { IProperties } from "src/types/properties";

import { Box, Divider, Grid, Paper, Typography } from "@mui/material";

import { List, ListItem } from "src/components/List";

interface ParkingsSectionProps {
  data: IProperties;
}

const ParkingsSection: React.FC<ParkingsSectionProps> = (props) => {
  const { data } = props;
  const parkings = data.details?.parkings;

  return parkings && parkings.length > 0 ? (
    <Box
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        width: { md: "100%", sm: "100%" },
      }}
    >
      {parkings?.map((parking, index) => {
        return (
          <Paper elevation={10} sx={{ overflow: "auto" }}>
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
                  justifyContent: "left",
                }}
              >
                <Typography variant="h6">Parking No.{index + 1}</Typography>
              </Box>
              <Divider></Divider>
              <List>
                <ListItem
                  label="Parking Type"
                  value={parking?.parkingType}
                  align="horizontal"
                />
                <ListItem
                  label="Spots"
                  value={parking?.spots}
                  align="horizontal"
                />
              </List>
            </Grid>
          </Paper>
        );
      })}
    </Box>
  ) : (
    <></>
  );
};

export default ParkingsSection;
