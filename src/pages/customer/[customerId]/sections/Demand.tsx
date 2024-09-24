import { Divider, Grid, List, Paper, Typography } from "@mui/material";
import { Box } from "@mui/material";
import * as React from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ListItem } from "src/components/List";
import ListLabelsItem from "@/components/List/Items/labels";
import { useGetLabelsQuery } from "src/services/labels";
import AreaOfPreference from "./AreaOfPreference";
import FeaturesDemandSection from "./FeaturesDemand";
import useGetCustomer from "@/hooks/customer";
import AreaOfPreferenceDemands from "./AreaOfPreferenceDemands";

interface DemandSectionProps {
    index: number;
}

const formatPrice = (price: any) => {
    return new Intl.NumberFormat("de-DE").format(price);
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

const getRangeDisplayValueForYearOfConstruction = (
    min: number | null | undefined,
    max: number | null | undefined
) => {
    const hasMin = min !== null && min !== undefined;
    const hasMax = max !== null && max !== undefined;

    if (!hasMin && !hasMax) return "-";
    if (hasMin && !hasMax) return `${min}`;
    if (!hasMin && hasMax) return `${max}`;

    return min === max ? `${min}` : `${min} - ${max}`;
};

const getRangeDisplayValue = (
    min: number | null | undefined,
    max: number | null | undefined
) => {
    const hasMin = min !== null && min !== undefined && min !== 0;
    const hasMax = max !== null && max !== undefined && max !== 0;

    if (!hasMin && !hasMax) return "-";
    if (hasMin && !hasMax) return formatPrice(min);
    if (!hasMin && hasMax) return `0 - ${formatPrice(max)}`;

    const minValue = formatPrice(min);
    const maxValue = formatPrice(max);

    return minValue === maxValue ? minValue : `${minValue} - ${maxValue}`;
};

const getRangeDisplayValueString = (
    min: string | null | undefined,
    max: string | null | undefined
): string => {
    const minValue =
        min !== null && min !== undefined && min !== "0" ? min : "";
    const maxValue =
        max !== null && max !== undefined && max !== "0" ? max : "";

    if (!minValue && !maxValue) return "-";
    if (minValue && !maxValue) return minValue;
    if (!minValue && maxValue) return maxValue;

    return minValue === maxValue ? minValue : `${minValue} - ${maxValue}`;
};
const DemandSection: React.FC<DemandSectionProps> = ({ index }) => {
    const { t } = useTranslation();

    const { customer: data } = useGetCustomer();

    const { data: allLabels } = useGetLabelsQuery();

    const propertyLabels = allLabels?.propertyLabels;

    const demand = data?.demands[index];
    const demandFilters = demand?.filters;
    const demandFilterLabelIDs = demandFilters?.labels;
    const shapes = demand?.shapes;

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
        (!shapes || shapes?.length === 0) &&
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
                <Grid container marginBottom={1}>
                    <Grid item xs={6} padding={0}>
                        <List>
                            <ListItem
                                label={t("Parent Category")}
                                value={demandFilters?.parentCategories
                                    ?.map((i) => t(i.value)) // Translate each item first and then join with the ,
                                    ?.join(", ")}
                            />
                            <ListItem
                                label={t("Furnished")}
                                value={demandFilters?.furnished
                                    ?.map((i) => t(i.value))
                                    ?.join(", ")}
                            />
                            <ListLabelsItem
                                label={t("Labels")}
                                labels={selectedLabels}
                            />
                            <ListItem
                                label={t("Construction")}
                                value={getRangeDisplayValueForYearOfConstruction(
                                    demandFilters?.minYearOfConstruction,
                                    demandFilters?.maxYearOfConstruction
                                )}
                            />
                            <ListItem
                                label={t("Bedrooms")}
                                value={getRangeDisplayValue(
                                    demandFilters?.minBedrooms,
                                    demandFilters?.maxBedrooms
                                )}
                            />
                            <ListItem
                                label={t("Covered")}
                                value={
                                    getRangeDisplayValue(
                                        demandFilters?.minCovered,
                                        demandFilters?.maxCovered
                                    ) + " m²"
                                }
                            />
                            <ListItem
                                label={t("Price")}
                                value={
                                    getRangeDisplayValue(
                                        demandFilters?.minPrice,
                                        demandFilters?.maxPrice
                                    ) + " €"
                                }
                            />
                        </List>
                    </Grid>

                    <Grid item xs={6} padding={0}>
                        <List>
                            <ListItem
                                label={t("Category")}
                                value={demandFilters?.categories
                                    ?.map((i) => t(i.value))
                                    ?.join(", ")}
                            />
                            <ListItem
                                label={t("State")}
                                value={demandFilters?.states
                                    ?.map((i) => t(i.value))
                                    ?.join(", ")}
                            />
                            <ListItem
                                label={t("Time Frame")}
                                value={demand?.timeframe.value}
                            />
                            <ListItem
                                label={t("Bathrooms")}
                                value={getRangeDisplayValue(
                                    demandFilters?.minBathrooms,
                                    demandFilters?.maxBathrooms
                                )}
                            />
                            <ListItem
                                label={t("Plot")}
                                value={
                                    getRangeDisplayValue(
                                        demandFilters?.minPlot,
                                        demandFilters?.maxPlot
                                    ) + " m²"
                                }
                            />
                            <ListItem
                                label={t("Floor")}
                                value={getRangeDisplayValueString(
                                    demandFilters?.minFloor?.value,
                                    demandFilters?.maxFloor?.value
                                )}
                            />
                        </List>
                    </Grid>
                </Grid>
                <Divider sx={{ width: "maxWidth" }} />
                <AreaOfPreferenceDemands index={index} />
                <FeaturesDemandSection index={index}></FeaturesDemandSection>
            </Paper>
        );
};

export default DemandSection;
