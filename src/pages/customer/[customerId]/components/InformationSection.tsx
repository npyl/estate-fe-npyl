import { Divider, Grid, List, Paper, Rating, Typography } from "@mui/material";
import { Box } from "@mui/system";

import * as React from "react";
import { useTranslation } from "react-i18next";

import { ListItem, ListManagerItem } from "src/components/List";
import ListLabelsItem from "src/components/List/labels-item";
import { useGetCustomerByIdQuery } from "src/services/customers";

import { useRouter } from "next/router";

const InformationSection: React.FC = (props) => {
  const router = useRouter();
  const { customerId } = router.query;
  const { t } = useTranslation();
  const { data } = useGetCustomerByIdQuery(parseInt(customerId as string)); // basic details
  if (!data) return;

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
        <Typography variant="h6">{t("Customer Information")}</Typography>
      </Box>
      <Divider></Divider>
      <Grid container>
        <Grid item xs={6} padding={0}>
          <List>
            <ListItem
              label={t("First Name")}
              value={data?.firstName}
              align="horizontal"
            />
            <ListItem
              label={t("Last Name")}
              value={data?.lastName}
              align="horizontal"
            />
            <ListItem
              label={t("email")}
              value={data?.email}
              align="horizontal"
            />
            <ListManagerItem
              label={t("Managed By")}
              manager={data?.managedBy}
            />
            <ListItem
              label={t("Mobile Phone")}
              value={data?.mobilePhone}
              align="horizontal"
            />
            <ListItem
              label={t("Home Phone")}
              value={data?.homePhone}
              align="horizontal"
            />
            <ListItem label={t("Fax")} value={data?.fax} align="horizontal" />

            <div style={{ display: "flex", alignItems: "center" }}>
              <ListItem label={t("Status")} />
              <Rating name="simple-controlled" value={data?.status} readOnly />
            </div>
          </List>
        </Grid>

        <Grid item xs={6} padding={0}>
          <List>
            <ListItem
              label={t("Nationality")}
              value={data?.nationality}
              align="horizontal"
            />
            <ListItem
              label={t("ID Number")}
              value={data?.idNumber}
              align="horizontal"
            />
            <ListItem
              label={t("Date of Birth")}
              value={data?.dateOfBirth}
              align="horizontal"
            />
            <ListItem
              label={t("Passport Number")}
              value={data?.passportNumber}
              align="horizontal"
            />
            <ListItem
              label={t("Preferred Language")}
              value={data?.preferredLanguage}
              align="horizontal"
            />
            <ListItem
              label={t("Lead Source")}
              value={data?.leadSource}
              align="horizontal"
            />
            <ListItem
              label={t("Suggested by")}
              value={data?.suggestedBy}
              align="horizontal"
            />
            <ListLabelsItem label={t("Labels")} labels={data?.labels} />
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default InformationSection;
