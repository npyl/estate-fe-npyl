import { Chip, Grid, Stack, Typography } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useGetLabelsQuery } from "src/services/labels";
import {
    deleteFilter,
    getChangedFields,
    selectIds,
} from "src/slices/customer/filters";

const ChosenFilters = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { data } = useGetLabelsQuery();

    const changedProps = useSelector(getChangedFields);
    const ids = useSelector(selectIds);

    const filterTags: Record<string, { label: string }> = {
        status: {
            label: t("Status"),
        },
        labels: {
            label: t("Labels"),
        },
        leaser: {
            label: t("Leaser"),
        },
        seller: {
            label: t("Seller"),
        },
        buyer: {
            label: t("Buyer"),
        },
        lessor: {
            label: t("Lessor"),
        },
        minPrice: {
            label: t("Minimum Price"),
        },
        maxPrice: {
            label: t("Maximun Price"),
        },
        minArea: {
            label: t("Minimum Covered Area"),
        },
        maxArea: {
            label: t("Maximun Covered Area"),
        },
        managerId: {
            label: t("Managed By"),
        },

        parentCategories: {
            label: t("Parent Categories"),
        },
        categories: {
            label: t("Categories"),
        },
    };
    const pairFilterTags: Record<string, { label: string }> = {
        minMaxPrice: {
            label: t("Price (€)"),
        },
        minMaxArea: {
            label: t("Area (m²)"),
        },
    };
    const hasMinMaxPair = (suffix: string | null): boolean => {
        if (!suffix) return false;

        const minKey = `min${suffix}`;
        const maxKey = `max${suffix}`;

        return (
            changedProps.hasOwnProperty(minKey) &&
            changedProps.hasOwnProperty(maxKey)
        );
    };
    const allLabels = useMemo(
        () => data?.customerLabels || [],
        [data?.customerLabels]
    );

    const getLabelNames = useCallback(
        (labelIds: number[]) =>
            labelIds
                .map((id) => {
                    const label = allLabels.find((label) => label.id === id);
                    return label ? label.name : "Unknown";
                })
                .join(", "),
        [allLabels]
    );

    return (
        <Grid container direction="row">
            {ids.map((key, index) => {
                const values = changedProps[key];
                let label = filterTags[key].label;

                if (!values || !label) return <></>;

                const isRole =
                    key === "leaser" ||
                    key === "buyer" ||
                    key === "lessor" ||
                    key === "seller";

                let valuesToDisplay =
                    key === "labels" ? getLabelNames(values) : values;
                const suffix =
                    key.includes("min") || key.includes("max")
                        ? key.slice(3)
                        : null;

                if (hasMinMaxPair(suffix) && key === `max${suffix}`)
                    return <></>;

                // If we have min-max pair show chip differently
                if (hasMinMaxPair(suffix)) {
                    label = pairFilterTags[`minMax${suffix}`].label;
                    const minValue = changedProps[`min${suffix}`];
                    const maxValue = changedProps[`max${suffix}`];

                    return (
                        <Chip
                            key={index}
                            label={
                                <Stack direction="row">
                                    <Typography
                                        sx={{
                                            fontWeight: "medium",
                                            paddingRight: 1,
                                        }}
                                    >
                                        {label}:
                                    </Typography>
                                    <Typography
                                        sx={{
                                            textTransform: "lowercase",
                                            paddingRight: 1,
                                        }}
                                    >
                                        {minValue}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: "medium",
                                            paddingRight: 1,
                                        }}
                                    >
                                        -
                                    </Typography>
                                    <Typography
                                        sx={{ textTransform: "lowercase" }}
                                    >
                                        {maxValue}
                                    </Typography>
                                </Stack>
                            }
                            onDelete={() => {
                                dispatch(deleteFilter(`min${suffix}`));
                                dispatch(deleteFilter(`max${suffix}`));
                            }}
                            sx={{ m: 0.5 }}
                        />
                    );
                } else {
                    return (
                        <Chip
                            key={index}
                            label={
                                <Stack direction="row">
                                    <Typography
                                        sx={{
                                            fontWeight: "medium",
                                            paddingRight: 1,
                                        }}
                                    >
                                        {label}
                                        {isRole ? "" : ":"}
                                    </Typography>
                                    <Typography
                                        sx={{ textTransform: "lowercase" }}
                                    >
                                        {Array.isArray(valuesToDisplay)
                                            ? valuesToDisplay.join(", ")
                                            : valuesToDisplay}
                                    </Typography>
                                </Stack>
                            }
                            onDelete={() => dispatch(deleteFilter(key))}
                            sx={{ m: 0.5 }}
                        />
                    );
                }
            })}
        </Grid>
    );
};

export default ChosenFilters;
