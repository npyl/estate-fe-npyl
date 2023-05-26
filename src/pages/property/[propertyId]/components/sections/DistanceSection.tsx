import React from "react";
import { IProperties } from "src/types/properties";

import { Typography, Box, Paper, Divider, Grid } from "@mui/material";

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
    <Paper elevation={10} sx={{ overflow: "auto" }}>
      <Box
        sx={{
          px: 3,
          py: 1.5,
          display: "flex",
          justifyContent: "left",
        }}
      >
        <Typography variant="h6">Distance</Typography>
      </Box>
      <Divider></Divider>
      <Grid container spacing={1}>
        <Grid item xs={6} order={"row"} padding={0}>
          <List>
            <ListItem
              label="Schools"
              value={distances?.schools}
              align="horizontal"
            />
            <ListItem
              label="Supermarket"
              value={distances?.supermarket}
              align="horizontal"
            />
            <ListItem
              label="Cafe Restaurant"
              value={distances?.cafeRestaurant}
              align="horizontal"
            />
            <ListItem
              label="Hospital"
              value={distances?.hospital}
              align="horizontal"
            />
          </List>
        </Grid>
        <Grid item xs={6}>
          <List>
            <ListItem
              label="Airport"
              value={distances?.airport}
              align="horizontal"
            />
            <ListItem
              label="From Sea"
              value={distances?.sea}
              align="horizontal"
            />
            <ListItem
              label="From Public Transport"
              value={distances?.publicTransport}
              align="horizontal"
            />
            <ListItem
              label="Entertainment"
              value={distances?.entertainment}
              align="horizontal"
            />
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DistanceSection;
