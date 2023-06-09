import { Divider, Grid, List, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

import * as React from "react";
import { useTranslation } from "react-i18next";

import { ListItem } from "src/components/List";
import ListLabelsItem from "src/components/List/labels-item";
import { useGetCustomerByIdQuery } from "src/services/customers";

import { useRouter } from "next/router";

const CustomerInformationSection: React.FC = (props) => {
  const router = useRouter();
  const { customerId } = router.query;
  const { t } = useTranslation();
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
        <Typography variant='h6'>Customer Information</Typography>
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
              label={t("First Name")}
              value={data?.firstName}
              align='horizontal'
            />
            <ListItem
              label={t("Last Name")}
              value={data?.lastName}
              align='horizontal'
            />
            <ListItem
              label={t("email")}
              value={data?.email}
              align='horizontal'
            />
            <ListItem
              label={t("Managed By")}
              value={data?.managedBy}
              align='horizontal'
            />
            <ListItem
              label={t("Mobile Phone")}
              value={data?.mobilePhone}
              align='horizontal'
            />
            <ListItem
              label={t("Home Phone")}
              value={data?.homePhone}
              align='horizontal'
            />
            <ListItem label={t("Fax")} value={data?.fax} align='horizontal' />
            <ListItem
              label={t("Status")}
              value={data?.status}
              align='horizontal'
            />
          </List>
        </Grid>

        <Grid item xs={6} padding={0}>
          <List>
            <ListItem
              label={t("Nationality")}
              value={data?.nationality}
              align='horizontal'
            />
            <ListItem
              label={t("Id Number")}
              value={data?.idNumber}
              align='horizontal'
            />
            <ListItem
              label={t("Date of Birth")}
              value={data?.dateOfBirth}
              align='horizontal'
            />
            <ListItem
              label={t("Passport Number")}
              value={data?.passportNumber}
              align='horizontal'
            />
            <ListItem
              label={t("Preferred Language")}
              value={data?.preferredLanguage}
              align='horizontal'
            />
            <ListItem
              label={t("Lead Source")}
              value={data?.leadSource}
              align='horizontal'
            />
            <ListItem
              label={t("Suggested By")}
              value={data?.suggestedBy}
              align='horizontal'
            />
            <ListLabelsItem label={t("Labels")} labels={data?.labels} />
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CustomerInformationSection;
