import { Chip, Grid, GridProps, Stack, Typography } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useGetLabelsQuery } from "src/services/labels";
import { useAllUsersQuery } from "src/services/user";
import { deleteFilter, getChangedFields, selectIds } from "src/slices/filters";

interface Props extends GridProps {}

const ChosenFilters = (props: Props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { data } = useGetLabelsQuery();
    const { data: managers } = useAllUsersQuery();

    const changedProps = useSelector(getChangedFields);
    const ids = useSelector(selectIds);

    const filterTags: Record<string, { label: string }> = {
        parentLocation: {
            label: t("Location"),
        },
        subLocation: {
            label: t("SubLocation"),
        },
        filterName: {
            label: t("Filter Name"),
        },
        code: {
            label: t("Code"),
        },
        minPrice: {
            label: t("Minimum Price"),
        },
        maxPrice: {
            label: t("Maximun Price"),
        },
        minArea: {
            label: t("Minimum Area"),
        },
        maxArea: {
            label: t("Maximun Area"),
        },
        minBedrooms: {
            label: t("Minimun Number of Bedrooms"),
        },
        maxBedrooms: {
            label: t("Maximun Number of Bedrooms"),
        },
        minFloor: {
            label: t("Minimum Floor"),
        },
        maxFloor: {
            label: t("Maximun Floor"),
        },
        minConstructionYear: {
            label: t("Minimun Constuction Year"),
        },
        maxConstructionYear: {
            label: t("Maximun Construction Year"),
        },
        heatingType: {
            label: t("Heating Type"),
        },
        frameType: {
            label: t("Frame Type"),
        },
        furnished: {
            label: t("Furnished"),
        },
        managerId: {
            label: t("Manager"),
        },
        states: {
            label: t("State"),
        },
        parentCategories: {
            label: t("Category"),
        },
        categories: {
            label: t("Subcategory"),
        },
        labels: {
            label: t("Labels"),
        },
    };

    const pairFilterTags: Record<string, { label: string }> = {
        minMaxPrice: {
            label: t("Price (€)"),
        },
        minMaxArea: {
            label: t("Area (m²)"),
        },
        minMaxBedrooms: {
            label: t("Bedrooms"),
        },
        minMaxFloor: {
            label: t("Floor"),
        },
        minMaxConstructionYear: {
            label: t("Construction Year"),
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
        () => data?.propertyLabels || [],
        [data?.propertyLabels]
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

    const getManagerName = useCallback(
        (managerId: number) => {
            const manager = managers?.find((m) => m.id === managerId);
            return manager?.firstName && manager.lastName
                ? `${manager?.firstName} ${manager?.lastName}`
                : "";
        },
        [managers]
    );

    return (
        <Grid container direction="row" gap={0.3} {...props}>
            {ids.map((key, index) => {
                const values = changedProps[key];
                let label = filterTags[key].label;

                if (
                    values === 0 ||
                    values == undefined ||
                    (Array.isArray(values) && values.length === 0)
                )
                    return null;

                const suffix =
                    key.includes("min") || key.includes("max")
                        ? key.slice(3)
                        : null;

                // If we have min-max pair, make sure we ignore one of them (don't show the same chip twice)
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
                        />
                    );
                } else {
                    const valuesToDisplay =
                        key === "labels"
                            ? getLabelNames(values)
                            : key === "managerId"
                            ? getManagerName(values)
                            : values;

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
                                        sx={{ textTransform: "lowercase" }}
                                    >
                                        {Array.isArray(valuesToDisplay)
                                            ? valuesToDisplay.join(", ")
                                            : valuesToDisplay}
                                    </Typography>
                                </Stack>
                            }
                            onDelete={() => dispatch(deleteFilter(key))}
                        />
                    );
                }
            })}
        </Grid>
    );
};

export default ChosenFilters;
