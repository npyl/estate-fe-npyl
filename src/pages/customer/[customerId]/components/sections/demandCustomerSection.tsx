import { Grid, List, Paper, Typography } from "@mui/material";
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
        padding: 0.5,
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 1.5,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant='h6'>Demand</Typography>
      </Box>
      <Grid container>
        <Grid item xs={6} padding={1}>
          {/* <Grid container spacing={2}> */}
          <List>
            {/* <ListStatusItem
          label="Publiced"
          status={isAvailable(data?.state)}
          align="horizontal"
          divider
        /> */}

            <ListItem
              label='ParentCategory:'
              value={data?.demand.filters.parentCategory}
              align='horizontal'
              divider
            />

            <ListItem
              label='Furnished:'
              value={data?.demand.filters.furnished}
              align='horizontal'
              divider
            />

            <ListLabelsItem label='Labels:' labels={data?.labels} />

            <ListItem
              label='Minimum Bedrooms:'
              value={data?.demand.filters.minBedrooms}
              align='horizontal'
              divider
            />
            <ListItem
              label='Minimum Covered:'
              value={data?.demand.filters.minCovered}
              align='horizontal'
              divider
            />
            <ListItem
              label='Minimum Price:'
              value={data?.demand.filters.minPrice}
              align='horizontal'
              divider
            />
            <ListItem
              label='Minimum Construction Year:'
              value={data?.demand.filters.minYearOfConstruction}
              align='horizontal'
              divider
            />
            <ListItem
              label='Minimum Bathrooms Number:'
              value={data?.demand.filters.minBathrooms}
              align='horizontal'
              divider
            />
            <ListItem
              label='Minimum Plot:'
              value={data?.demand.filters.minPlot}
              align='horizontal'
              divider
            />
            <ListItem
              label='Minimum Floor:'
              value={data?.demand.filters.minFloor}
              align='horizontal'
              divider
            />
          </List>
        </Grid>

        <Grid item xs={6} padding={1}>
          {/* <Grid container spacing={2}> */}
          <List>
            {/* <ListStatusItem
          label="Publiced"
          status={isAvailable(data?.state)}
          align="horizontal"
          divider
        /> */}
            <ListItem
              label='Category:'
              value={data?.demand.filters.category}
              align='horizontal'
              divider
            />

            <ListItem
              label='State:'
              value={data?.demand.filters.state}
              align='horizontal'
              divider
            />

            <ListItem
              label='Time Frame:'
              value={data?.demand.timeframe}
              align='horizontal'
              divider
            />
            <ListItem
              label='Maximum Bedrooms:'
              value={data?.demand.filters.maxBedrooms}
              align='horizontal'
              divider
            />
            <ListItem
              label='Maximum Covered:'
              value={data?.demand.filters.maxCovered}
              align='horizontal'
              divider
            />
            <ListItem
              label='Maximum Price:'
              value={data?.demand.filters.maxPrice}
              align='horizontal'
              divider
            />
            <ListItem
              label='Maximum Construction Year:'
              value={data?.demand.filters.maxYearOfConstruction}
              align='horizontal'
              divider
            />
            <ListItem
              label='Maximum Bathrooms Number:'
              value={data?.demand.filters.maxBathrooms}
              align='horizontal'
              divider
            />
            <ListItem
              label='Maximum Plot:'
              value={data?.demand.filters.maxPlot}
              align='horizontal'
              divider
            />
            <ListItem
              label='Maximum Floor:'
              value={data?.demand.filters.maxFloor}
              align='horizontal'
              divider
            />
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DemandCustomerSection;
