import { Divider, Grid, List, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import * as React from "react";
import { ListItem } from "src/components/List";
import { useGetCustomerByIdQuery } from "src/services/customers";

const CustomerAdressDetailsSection: React.FC = (props) => {
  const router = useRouter();
  const { customerId } = router.query;

  const { data } = useGetCustomerByIdQuery(parseInt(customerId as string)); // basic details
  const location = data?.location;
  if (!data || !location) {
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
        <Typography variant="h6">Adress Details</Typography>
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
              label="Street:"
              value={data?.location.street}
              align="horizontal"
            />

            <ListItem
              label="Number:"
              value={data?.location.number}
              align="horizontal"
            />

            <ListItem
              label="City:"
              value={data?.location.city}
              align="horizontal"
            />

            <ListItem
              label="Complex:"
              value={data?.location.complex}
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
              label="Zip Code:"
              value={data?.location.zipCode}
              align="horizontal"
            />
            <ListItem
              label="Region:"
              value={data?.location.region}
              align="horizontal"
            />
            <ListItem
              label="Country:"
              value={data?.location.country}
              align="horizontal"
            />
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CustomerAdressDetailsSection;
