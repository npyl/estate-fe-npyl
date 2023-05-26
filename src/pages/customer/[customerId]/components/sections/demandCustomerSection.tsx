import { Divider, Grid, List, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import * as React from "react";
import { ListItem } from "src/components/List";
import ListLabelsItem from "src/components/List/labels-item";
import { useGetCustomerByIdQuery } from "src/services/customers";

const DemandCustomerSection: React.FC = (props) => {
  const router = useRouter();
  const { customerId } = router.query;

  const { data } = useGetCustomerByIdQuery(parseInt(customerId as string)); // basic details
  const demandFilters = data?.demand.filters;
  if (!data || !demandFilters) {
    return null;
  }

  return (
    <Paper
      elevation={10}
      sx={{
        overflow: "auto",
        padding: 0,
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 1.5,
          display: "flex",
          justifyContent: "left",
        }}
      >
        <Typography variant="h6">Demand</Typography>
      </Box>
      <Divider></Divider>
      <Grid container>
        <Grid item xs={6} padding={0}>
          {/* <Grid container spacing={2}> */}
          <List>
            {/* <ListStatusItem
          label="Publiced"
          status={isAvailable(data?.state)}
          align="horizontal"
          
        /> */}
            <ListItem
              label="ParentCategory:"
              value={data?.demand.filters.parentCategory}
              align="horizontal"
            />
            <ListItem
              label="Furnished:"
              value={data?.demand.filters.furnished}
              align="horizontal"
            />
            <ListLabelsItem
              label="Labels:"
              labels={data?.labels}
              align="horizontal"
            />

            <ListItem
              label="Construction Min-Max:"
              value={` ${data?.demand.filters.minYearOfConstruction} - ${data?.demand.filters.maxYearOfConstruction}`}
              align="horizontal"
            />
            <ListItem
              label="Bedrooms Min-Max:"
              value={` ${data?.demand.filters.minBedrooms} - ${data?.demand.filters.maxBedrooms}`}
              align="horizontal"
            />
            <ListItem
              label="Covered Min-Max:"
              value={`${data?.demand.filters.minCovered} - ${data?.demand.filters.maxCovered}`}
              align="horizontal"
            />
            <ListItem
              label="Price Min-Max:"
              value={`${data?.demand.filters.minPrice} - ${data?.demand.filters.maxPrice}`}
              align="horizontal"
            />
          </List>
        </Grid>

        <Grid item xs={6} padding={0}>
          {/* <Grid container spacing={2}> */}
          <List>
            {/* <ListStatusItem
          label="Publiced"
          status={isAvailable(data?.state)}
          align="horizontal"
          
        /> */}
            <ListItem
              label="Category:"
              value={data?.demand.filters.category}
              align="horizontal"
            />

            <ListItem
              label="State:"
              value={data?.demand.filters.state}
              align="horizontal"
            />

            <ListItem
              label="Time Frame:"
              value={data?.demand.timeframe}
              align="horizontal"
            />

            <ListItem
              label="Bathrooms Number Min-Max:"
              value={`${data?.demand.filters.minBathrooms} - ${data?.demand.filters.maxBathrooms}`}
              align="horizontal"
            />
            <ListItem
              label="Plot Min-Max:"
              value={`${data?.demand.filters.minPlot} - ${data?.demand.filters.maxPlot}`}
              align="horizontal"
            />
            <ListItem
              label="Floor Min-Max:"
              value={`${data?.demand.filters.minFloor} - ${data?.demand.filters.maxFloor}`}
              align="horizontal"
            />
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DemandCustomerSection;
