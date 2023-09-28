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

interface DemandSectionProps {
    index: number;
}

const DemandSection: React.FC<DemandSectionProps> = ({ index }) => {
    const router = useRouter();
    const { t } = useTranslation();

    const { customerId } = router.query;

    const { data } = useGetCustomerByIdQuery(+customerId!); // basic details
    const { data: allLabels } = useGetLabelsQuery();

    const propertyLabels = allLabels?.propertyLabels;

    const demand = data?.demands[index];
    const demandFilters = demand?.filters;
    const demandFilterLabelIDs = demandFilters?.labels;
    const shape = demand?.shape;

    const selectedLabels = useMemo(
        () =>
            propertyLabels?.filter((propertyLabel) =>
                demandFilterLabelIDs?.find(
                    (labelID) => labelID === propertyLabel.id
                )
            ) || [],
        [propertyLabels, demandFilterLabelIDs]
    );

    const getRangeDisplayValue = (
        min: number | null | undefined,
        max: number | null | undefined
    ) => {
        if (min === null && max === null) return "-";

        const minValue = min !== null && min !== undefined ? min : 0;
        const maxValue = max !== null && max !== undefined ? max : 0;
        return `${minValue} - ${maxValue}`;
    };

    const getRangeDisplayValueString = (
        min: string | null | undefined,
        max: string | null | undefined
    ): string => {
        if (min === null && max === null) return "-";

        const minValue = min !== null && min !== undefined ? min : "0";
        const maxValue = max !== null && max !== undefined ? max : "0";
        return `${minValue} - ${maxValue}`;
    };

    const isEmptyOrComma = (str: string | string[]): boolean => {
        if (typeof str === "string") {
            return !str || str.trim() === "" || str.trim() === ",";
        } else if (Array.isArray(str)) {
            return (
                str.length === 0 ||
                (str.length === 1 &&
                    (str[0].trim() === "" || str[0].trim() === ","))
            );
        }
        return true;
    };

    if (
        !demandFilters?.minYearOfConstruction &&
        !demandFilters?.maxYearOfConstruction &&
        !demandFilters?.minBedrooms &&
        !demandFilters?.maxBedrooms &&
        !demandFilters?.minCovered &&
        !demandFilters?.maxCovered &&
        !demandFilters?.minPrice &&
        !demandFilters?.maxPrice &&
        !demandFilters?.minBathrooms &&
        !demandFilters?.maxBathrooms &&
        !demandFilters?.minPlot &&
        !demandFilters?.maxPlot &&
        !demandFilters?.minFloor &&
        !demandFilters?.maxFloor &&
        demandFilters?.labels.length === 0 &&
        !shape &&
        !demand?.timeframe &&
        isEmptyOrComma(demandFilters?.parentCategories.map((i) => i.key)) &&
        isEmptyOrComma(demandFilters?.furnished.map((i) => i.key)) &&
        isEmptyOrComma(demandFilters?.categories.map((i) => i.key)) &&
        isEmptyOrComma(demandFilters?.states.map((i) => i.key))
    )
        return null;
    else
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
                    <Typography variant="h6">
                        {t("Demand")} No.{index + 1}
                    </Typography>
                </Box>
                <Divider />
                <Grid container>
                    <Grid item xs={6} padding={0}>
                        <List>
                            <ListItem
                                label={t("Parent Category")}
                                value={demandFilters?.parentCategories
                                    ?.map((i) => i.value)
                                    ?.join(", ")}
                                align="horizontal"
                            />
                            <ListItem
                                label={t("Furnished")}
                                value={demandFilters?.furnished
                                    ?.map((i) => i.value)
                                    ?.join(", ")}
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
                                value={demandFilters?.categories
                                    ?.map((i) => i.value)
                                    ?.join(", ")}
                                align="horizontal"
                            />
                            <ListItem
                                label={t("State")}
                                value={demandFilters?.states
                                    ?.map((i) => i.value)
                                    ?.join(", ")}
                                align="horizontal"
                            />
                            <ListItem
                                label={t("Time Frame")}
                                value={demand?.timeframe.value}
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
                                    ) + " m²"
                                }
                                align="horizontal"
                            />

                            <ListItem
                                label={t("Floor")}
                                value={getRangeDisplayValueString(
                                    demandFilters?.minFloor.value,
                                    demandFilters?.maxFloor.value
                                )}
                                align="horizontal"
                            />
                        </List>
                    </Grid>
                </Grid>

                <AreaOfPreference index={index} />
            </Paper>
        );
};

export default DemandSection;
