import { Divider, Grid, List, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import * as React from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ListItem } from "src/components/List";
import ListLabelsItem from "src/components/List/labels-item";
import { useGetCustomerByIdQuery } from "src/services/customers";
import { useGetLabelsQuery } from "src/services/labels";

const DemandSection: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation();

    const { customerId } = router.query;

    const { data } = useGetCustomerByIdQuery(parseInt(customerId as string)); // basic details
    const { data: allLabels } = useGetLabelsQuery();

    const propertyLabels = allLabels?.propertyLabels;
    const demandFilters = data?.demand?.filters;
    const demandFilterLabelIDs = demandFilters?.labels;

    const selectedLabels = useMemo(
        () =>
            propertyLabels?.filter((propertyLabel) =>
                demandFilterLabelIDs?.find(
                    (labelID) => labelID === propertyLabel.id
                )
            ) || [],
        [propertyLabels, demandFilterLabelIDs]
    );

    if (
        demandFilters?.parentCategory === null &&
        demandFilters?.minYearOfConstruction === null &&
        demandFilters?.furnished === null &&
        demandFilters?.maxYearOfConstruction === null &&
        demandFilters?.minBedrooms === null &&
        demandFilters?.maxBedrooms === null &&
        demandFilters?.minCovered === null &&
        demandFilters?.maxCovered === null &&
        demandFilters?.minPrice === null &&
        demandFilters?.maxPrice === null &&
        demandFilters?.category === null &&
        demandFilters?.state === null &&
        data?.demand?.timeframe === null &&
        demandFilters?.minBathrooms === null &&
        demandFilters?.maxBathrooms === null &&
        demandFilters?.minPlot === null &&
        demandFilters?.maxPlot === null &&
        demandFilters?.minFloor === null &&
        demandFilters?.maxFloor === null &&
        demandFilters?.labels.length === 0
    )
        return null; // don't show anything

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
                            value={demandFilters?.parentCategory}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Furnished")}
                            value={demandFilters?.furnished}
                            align="horizontal"
                        />
                        <ListLabelsItem
                            label={t("Labels")}
                            labels={selectedLabels}
                            align="horizontal"
                        />

                        <ListItem
                            label={t("Construction")}
                            value={` ${demandFilters?.minYearOfConstruction} - ${demandFilters?.maxYearOfConstruction}`}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Bedrooms")}
                            value={` ${demandFilters?.minBedrooms} - ${demandFilters?.maxBedrooms}`}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Covered")}
                            value={`${demandFilters?.minCovered} - ${demandFilters?.maxCovered} (m²)`}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Price")}
                            value={`${demandFilters?.minPrice} - ${demandFilters?.maxPrice} (€)`}
                            align="horizontal"
                        />
                    </List>
                </Grid>

                <Grid item xs={6} padding={0}>
                    <List>
                        <ListItem
                            label={t("Category")}
                            value={demandFilters?.category}
                            align="horizontal"
                        />

                        <ListItem
                            label={t("State")}
                            value={demandFilters?.state}
                            align="horizontal"
                        />

                        <ListItem
                            label={t("Time Frame")}
                            value={data?.demand?.timeframe}
                            align="horizontal"
                        />

                        <ListItem
                            label={t("Bathrooms")}
                            value={`${demandFilters?.minBathrooms} - ${demandFilters?.maxBathrooms}`}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Plot")}
                            value={`${demandFilters?.minPlot} - ${demandFilters?.maxPlot} (m²)`}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Floor")}
                            value={`${demandFilters?.minFloor} - ${demandFilters?.maxFloor}`}
                            align="horizontal"
                        />
                    </List>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default DemandSection;
