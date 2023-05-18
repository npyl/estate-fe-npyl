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

const CustomerInformationSection: React.FC = (props) => {
  const router = useRouter();
  const { customerId } = router.query;

  const { data } = useGetCustomerByIdQuery(parseInt(customerId as string)); // basic details
  if (!data) {
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
        <Typography variant="h6">Customer Information</Typography>
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
              label="First Name:"
              value={data?.firstName}
              align="horizontal"
              divider
            />

            <ListItem
              label="Last Name:"
              value={data?.lastName + " €"}
              align="horizontal"
              divider
            />

            <ListItem
              label="Email:"
              value={data?.email}
              align="horizontal"
              divider
            />

            <ListItem
              label="Managed By:"
              value={data?.managedBy}
              align="horizontal"
              divider
            />
            <ListItem
              label="Mobile Phone:"
              value={data?.mobilePhone}
              align="horizontal"
              divider
            />
            <ListItem
              label="Home Phone:"
              value={data?.homePhone}
              align="horizontal"
              divider
            />
            <ListItem
              label="Fax:"
              value={data?.fax}
              align="horizontal"
              divider
            />

            <ListItem
              label="Status:"
              value={data?.status}
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
              label="Nationality:"
              value={data?.nationality}
              align="horizontal"
              divider
            />
            <ListItem
              label="Id Number:"
              value={data?.idNumber}
              align="horizontal"
              divider
            />
            <ListItem
              label="Date of Birth:"
              value={data?.dateOfBirth}
              align="horizontal"
              divider
            />
            <ListItem
              label="Passport Number:"
              value={data?.passportNumber}
              align="horizontal"
              divider
            />
            <ListItem
              label="Preferred Language:"
              value={data?.preferredLanguage}
              align="horizontal"
              divider
            />
            <ListItem
              label="Lead Source:"
              value={data?.leadSource}
              align="horizontal"
              divider
            />
            <ListItem
              label="Suggested By:"
              value={data?.suggestedBy}
              align="horizontal"
              divider
            />
            <ListLabelsItem label="Labels:" labels={data?.labels} />
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CustomerInformationSection;
