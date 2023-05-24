import { Divider, Grid, List, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

import * as React from "react";

import { ListItem } from "src/components/List";
import ListLabelsItem from "src/components/List/labels-item";
import { useGetCustomerByIdQuery } from "src/services/customers";

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
        <Typography variant="h6">Customer Information</Typography>
      </Box>
      <Divider></Divider>
      <Grid container>
        <Grid
          item
          xs={6}
          padding={0}
          // style={{ borderRight: "1px solid #d9d9d9", paddingTop: "0" }}
        >
          <List>
            <ListItem
              label="First Name:"
              value={data?.firstName}
              align="horizontal"
            />
            <ListItem
              label="Last Name:"
              value={data?.lastName}
              align="horizontal"
            />
            <ListItem label="Email:" value={data?.email} align="horizontal" />
            <ListItem
              label="Managed By:"
              value={data?.managedBy}
              align="horizontal"
            />
            <ListItem
              label="Mobile Phone:"
              value={data?.mobilePhone}
              align="horizontal"
            />
            <ListItem
              label="Home Phone:"
              value={data?.homePhone}
              align="horizontal"
            />
            <ListItem label="Fax:" value={data?.fax} align="horizontal" />
            <ListItem label="Status:" value={data?.status} align="horizontal" />
          </List>
        </Grid>

        <Grid item xs={6} padding={0}>
          <List>
            <ListItem
              label="Nationality:"
              value={data?.nationality}
              align="horizontal"
            />
            <ListItem
              label="Id Number:"
              value={data?.idNumber}
              align="horizontal"
            />
            <ListItem
              label="Date of Birth:"
              value={data?.dateOfBirth}
              align="horizontal"
            />
            <ListItem
              label="Passport Number:"
              value={data?.passportNumber}
              align="horizontal"
            />
            <ListItem
              label="Preferred Language:"
              value={data?.preferredLanguage}
              align="horizontal"
            />
            <ListItem
              label="Lead Source:"
              value={data?.leadSource}
              align="horizontal"
            />
            <ListItem
              label="Suggested By:"
              value={data?.suggestedBy}
              align="horizontal"
            />
            <ListLabelsItem labels="Labels:" labels={data?.labels} />
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CustomerInformationSection;
