import { Grid, List, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import {
  ListItem,
  ListManagerItem,
  ListBooleanItem,
  ListStatusItem,
} from "src/components/List";
import ListLabelsItem from "src/components/List/labels-item";
import {
  useAllCustomersQuery,
  useGetCustomerByIdQuery,
} from "src/services/customers";
import { useRouter } from "next/router";

const DemandCustomerSection: React.FC = (props) => {
  const router = useRouter();
  const { customerId } = router.query;

  const { data } = useGetCustomerByIdQuery(parseInt(customerId as string)); // basic details
  const demand = data?.demand;
  if (!data || !demand) {
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
        <Typography variant="h6">Demand</Typography>
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
              label="Street:"
              value={data?.demand}
              align="horizontal"
              divider
            />

            <ListItem
              label="Number:"
              value={data?.location.number}
              align="horizontal"
              divider
            />

            <ListItem
              label="City:"
              value={data?.location.city}
              align="horizontal"
              divider
            />

            <ListItem
              label="Complex:"
              value={data?.location.complex}
              align="horizontal"
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
              label="Zip Code:"
              value={data?.location.zipCode}
              align="horizontal"
              divider
            />
            <ListItem
              label="Region:"
              value={data?.location.region}
              align="horizontal"
              divider
            />
            <ListItem
              label="Country:"
              value={data?.location.country}
              align="horizontal"
              divider
            />
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DemandCustomerSection;
