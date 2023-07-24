import { Divider, Grid, List, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { ListItem } from "src/components/List";
import ListLabelsItem from "src/components/List/labels-item";
import { useGetCustomerByIdQuery } from "src/services/customers";
import { useGetLabelsQuery } from "src/services/labels";

const DemandSection: React.FC = (props) => {
  const router = useRouter();
  const { customerId } = router.query;
  const { t } = useTranslation();
  const { data } = useGetCustomerByIdQuery(parseInt(customerId as string)); // basic details
  const { data: allLabels } = useGetLabelsQuery();
  const customerLabels = allLabels?.customerLabels;
  const demandFilters = data?.demand?.filters;
  const demandFilterLabelIDs = demandFilters?.labels;

  if (!data || !demandFilters || !customerLabels) {
    return null;
  }

  const selectedLabels =
    customerLabels.filter((customerLabel) =>
      demandFilterLabelIDs?.find((labelID) => labelID === customerLabel.id)
    ) || [];
  if (
    data?.demand.filters.parentCategory === null &&
    data?.demand.filters.minYearOfConstruction === null &&
    data?.demand.filters.furnished === null &&
    data?.demand.filters.maxYearOfConstruction === null &&
    data?.demand.filters.minBedrooms === null &&
    data?.demand.filters.maxBedrooms === null &&
    data?.demand.filters.minCovered === null &&
    data?.demand.filters.maxCovered === null &&
    data?.demand.filters.minPrice === null &&
    data?.demand.filters.maxPrice === null &&
    data?.demand.filters.category === null &&
    data?.demand.filters.state === null &&
    data?.demand.timeframe === null &&
    data?.demand.filters.minBathrooms === null &&
    data?.demand.filters.maxBathrooms === null &&
    data?.demand.filters.minPlot === null &&
    data?.demand.filters.maxPlot === null &&
    data?.demand.filters.minFloor === null &&
    data?.demand.filters.maxFloor === null
  )
    return null;
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
        <Typography variant="h6">{t("Demand")}</Typography>
      </Box>
      <Divider></Divider>
      <Grid container>
        <Grid item xs={6} padding={0}>
          <List>
            <ListItem
              label={t("Parent Category")}
              value={data?.demand.filters.parentCategory}
              align="horizontal"
            />
            <ListItem
              label={t("Furnished")}
              value={data?.demand.filters.furnished}
              align="horizontal"
            />
            <ListLabelsItem
              label={t("Labels")}
              labels={selectedLabels}
              align="horizontal"
            />

            <ListItem
              label={t("Construction")}
              value={` ${data?.demand.filters.minYearOfConstruction} - ${data?.demand.filters.maxYearOfConstruction}`}
              align="horizontal"
            />
            <ListItem
              label={t("Bedrooms")}
              value={` ${data?.demand.filters.minBedrooms} - ${data?.demand.filters.maxBedrooms}`}
              align="horizontal"
            />
            <ListItem
              label={t("Covered")}
              value={`${data?.demand.filters.minCovered} - ${data?.demand.filters.maxCovered} (m²)`}
              align="horizontal"
            />
            <ListItem
              label={t("Price")}
              value={`${data?.demand.filters.minPrice} - ${data?.demand.filters.maxPrice} (€)`}
              align="horizontal"
            />
          </List>
        </Grid>

        <Grid item xs={6} padding={0}>
          <List>
            <ListItem
              label={t("Category")}
              value={data?.demand.filters.category}
              align="horizontal"
            />

            <ListItem
              label={t("State")}
              value={data?.demand.filters.state}
              align="horizontal"
            />

            <ListItem
              label={t("Time Frame")}
              value={data?.demand.timeframe}
              align="horizontal"
            />

            <ListItem
              label={t("Bathrooms")}
              value={`${data?.demand.filters.minBathrooms} - ${data?.demand.filters.maxBathrooms}`}
              align="horizontal"
            />
            <ListItem
              label={t("Plot")}
              value={`${data?.demand.filters.minPlot} - ${data?.demand.filters.maxPlot} (m²)`}
              align="horizontal"
            />
            <ListItem
              label={t("Floor")}
              value={`${data?.demand.filters.minFloor} - ${data?.demand.filters.maxFloor}`}
              align="horizontal"
            />
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DemandSection;
