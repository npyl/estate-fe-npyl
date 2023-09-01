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
import { AreaOfPreference } from "./AreaOfPreference";

const DemandSection: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation();

    const { customerId } = router.query;

    const { data } = useGetCustomerByIdQuery(parseInt(customerId as string)); // basic details
    const { data: allLabels } = useGetLabelsQuery();

    const propertyLabels = allLabels?.propertyLabels;
    const demandFilters = data?.demand?.filters;
    const demandFilterLabelIDs = demandFilters?.labels;
    const shape = data?.demand?.shape;

    const selectedLabels = useMemo(
        () =>
            propertyLabels?.filter((propertyLabel) =>
                demandFilterLabelIDs?.find(
                    (labelID) => labelID === propertyLabel.id
                )
            ) || [],
        [propertyLabels, demandFilterLabelIDs]
    );
    const getDisplayValue = (value: string | number | null | undefined) => {
        if (value === null || value === undefined) {
            return typeof value === "number" ? "0" : "-";
        }
        return value;
    };
    const getRangeDisplayValue = (
        min: number | null | undefined,
        max: number | null | undefined
    ) => {
        const minValue = min !== null && min !== undefined ? min : 0;
        const maxValue = max !== null && max !== undefined ? max : 0;
        return `${minValue} - ${maxValue}`;
    };
    const getRangeDisplayValueString = (
        min: string | null | undefined,
        max: string | null | undefined
    ): string => {
        const minValue = min !== null && min !== undefined ? min : "0";
        const maxValue = max !== null && max !== undefined ? max : "0";
        return `${minValue} - ${maxValue}`;
    };
    if (
        demandFilters?.parentCategories === null &&
        demandFilters?.minYearOfConstruction === null &&
        demandFilters?.furnished === null &&
        demandFilters?.maxYearOfConstruction === null &&
        demandFilters?.minBedrooms === null &&
        demandFilters?.maxBedrooms === null &&
        demandFilters?.minCovered === null &&
        demandFilters?.maxCovered === null &&
        demandFilters?.minPrice === null &&
        demandFilters?.maxPrice === null &&
        demandFilters?.categories === null &&
        demandFilters?.states === null &&
        data?.demand?.timeframe === null &&
        demandFilters?.minBathrooms === null &&
        demandFilters?.maxBathrooms === null &&
        demandFilters?.minPlot === null &&
        demandFilters?.maxPlot === null &&
        demandFilters?.minFloor === null &&
        demandFilters?.maxFloor === null &&
        !shape &&
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
                            value={getDisplayValue(
                                demandFilters?.parentCategories.join(",")
                            )}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Furnished")}
                            value={getDisplayValue(
                                demandFilters?.furnished.join(",")
                            )}
                            align="horizontal"
                        />
                        <ListLabelsItem
                            label={t("Labels")}
                            labels={selectedLabels}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Construction")}
                            value={getRangeDisplayValue(
                                demandFilters?.minYearOfConstruction,
                                demandFilters?.maxYearOfConstruction
                            )}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Bedrooms")}
                            value={getRangeDisplayValue(
                                demandFilters?.minBedrooms,
                                demandFilters?.maxBedrooms
                            )}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Covered")}
                            value={
                                getRangeDisplayValue(
                                    demandFilters?.minCovered,
                                    demandFilters?.maxCovered
                                ) + " m²"
                            }
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Price")}
                            value={
                                getRangeDisplayValue(
                                    demandFilters?.minPrice,
                                    demandFilters?.maxPrice
                                ) + " €"
                            }
                            align="horizontal"
                        />
                    </List>
                </Grid>

                <Grid item xs={6} padding={0}>
                    <List>
                        <ListItem
                            label={t("Category")}
                            value={getDisplayValue(
                                demandFilters?.categories.join(",")
                            )}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("State")}
                            value={getDisplayValue(
                                demandFilters?.states.join(",")
                            )}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Time Frame")}
                            value={getDisplayValue(data?.demand?.timeframe)}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Bathrooms")}
                            value={getRangeDisplayValue(
                                demandFilters?.minBathrooms,
                                demandFilters?.maxBathrooms
                            )}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Plot")}
                            value={
                                getRangeDisplayValue(
                                    demandFilters?.minPlot,
                                    demandFilters?.maxPlot
                                ) + " (m²)"
                            }
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Floor")}
                            value={getRangeDisplayValueString(
                                demandFilters?.minFloor,
                                demandFilters?.maxFloor
                            )}
                            align="horizontal"
                        />
                    </List>
                </Grid>
                {shape && (
                    <Grid item xs={12}>
                        <Typography variant="h6" mb={2}>
                            {t("Area of Preference")}
                        </Typography>
                        <AreaOfPreference shape={shape} />
                    </Grid>
                )}
            </Grid>
        </Paper>
    );
};

export default DemandSection;
