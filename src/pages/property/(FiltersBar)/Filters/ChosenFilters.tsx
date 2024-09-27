import { useGlobals } from "@/hooks/useGlobals";
import { Chip, Grid, GridProps, Stack, Typography } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useGetLabelsQuery } from "src/services/labels";
import { useAllUsersQuery } from "src/services/user";
import { deleteFilter, getChangedFields, selectIds } from "src/slices/filters";

interface Props extends GridProps {}

const useEnums = () => {
    const enums = useGlobals();

    const details = useMemo(() => enums?.property?.details, [enums]);

    return {
        frameTypeEnum: details?.frameType || [],
        furnishedEnum: details?.furnished || [],
        heatingTypeEnum: details?.heatingType || [],
        minFloorEnum: details?.floors || [],
        maxFloorEnum: details?.floors || [],
    };
};

const ChosenFilters = (props: Props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const {
        frameTypeEnum,
        furnishedEnum,
        heatingTypeEnum,
        minFloorEnum,
        maxFloorEnum,
    } = useEnums();

    const { data } = useGetLabelsQuery();
    const { data: managers } = useAllUsersQuery();

    const changedProps = useSelector(getChangedFields);
    const ids = useSelector(selectIds);

    // getting the value and not the key of each enumValue
    const getEnumLabel = (key: any, enumValues: any) => {
        const foundItem = enumValues.find((item: any) => item.key === key);
        return foundItem ? foundItem.value : "Unknown";
    };

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
            label: t("Maximum Price"),
        },
        minArea: {
            label: t("Minimum Area"),
        },
        maxArea: {
            label: t("Maximum Area"),
        },
        minBedrooms: {
            label: t("Minimum Number of Bedrooms"),
        },
        maxBedrooms: {
            label: t("Maximum Number of Bedrooms"),
        },
        minFloor: {
            label: t("Minimum Floor"),
        },
        maxFloor: {
            label: t("Maximum Floor"),
        },
        minConstructionYear: {
            label: t("Minimum Constuction Year"),
        },
        maxConstructionYear: {
            label: t("Maximum Construction Year"),
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
        active: {
            label: t("Active"),
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

                    if (suffix === "Floor") {
                        const minValue = changedProps[`minFloor`];
                        const maxValue = changedProps[`maxFloor`];

                        if (minValue && maxValue) {
                            const minLabel = getEnumLabel(
                                minValue,
                                minFloorEnum
                            );
                            const maxLabel = getEnumLabel(
                                maxValue,
                                maxFloorEnum
                            );

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
                                                {t("Floor")}:
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                {minLabel}-{maxLabel}
                                            </Typography>
                                        </Stack>
                                    }
                                    onDelete={() => {
                                        dispatch(deleteFilter("minFloor"));
                                        dispatch(deleteFilter("maxFloor"));
                                    }}
                                />
                            );
                        }
                        // If only minFloor is selected
                        if (minValue) {
                            const minLabel = getEnumLabel(
                                minValue,
                                minFloorEnum
                            );
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
                                                {t("Minimum Floor")}:
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                {minLabel}
                                            </Typography>
                                        </Stack>
                                    }
                                    onDelete={() => {
                                        dispatch(deleteFilter("minFloor"));
                                    }}
                                />
                            );
                        }

                        // If only maxFloor is selected
                        if (maxValue) {
                            const maxLabel = getEnumLabel(
                                maxValue,
                                maxFloorEnum
                            );
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
                                                {t("Maximum Floor")}:
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                {maxLabel}
                                            </Typography>
                                        </Stack>
                                    }
                                    onDelete={() => {
                                        dispatch(deleteFilter("maxFloor"));
                                    }}
                                />
                            );
                        }
                    }
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
                                    {suffix === "Price" ? (
                                        <Typography
                                            sx={{
                                                textTransform: "capitalize",
                                            }}
                                        >
                                            {minValue.toLocaleString("el-GR")}
                                        </Typography>
                                    ) : (
                                        <Typography
                                            sx={{
                                                textTransform: "capitalize",
                                            }}
                                        >
                                            {minValue}
                                        </Typography>
                                    )}

                                    <Typography
                                        sx={{
                                            fontWeight: "medium",
                                        }}
                                    >
                                        -
                                    </Typography>
                                    {suffix === "Price" ? (
                                        <Typography
                                            sx={{ textTransform: "capitalize" }}
                                        >
                                            {maxValue.toLocaleString("el-GR")}
                                        </Typography>
                                    ) : (
                                        <Typography
                                            sx={{ textTransform: "capitalize" }}
                                        >
                                            {maxValue}
                                        </Typography>
                                    )}
                                </Stack>
                            }
                            onDelete={() => {
                                dispatch(deleteFilter(`min${suffix}`));
                                dispatch(deleteFilter(`max${suffix}`));
                            }}
                        />
                    );
                } else {
                    let valuesToDisplay = values;

                    // Map the keys to their corresponding labels for frameType, furnished, heatingType
                    if (key === "frameType") {
                        valuesToDisplay = values.map((val: any) =>
                            getEnumLabel(val, frameTypeEnum)
                        );
                    } else if (key === "furnished") {
                        valuesToDisplay = values.map((val: any) =>
                            getEnumLabel(val, furnishedEnum)
                        );
                    } else if (key === "heatingType") {
                        valuesToDisplay = values.map((val: any) =>
                            getEnumLabel(val, heatingTypeEnum)
                        );
                    }

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
                                        sx={{ textTransform: "capitalize" }}
                                    >
                                        {Array.isArray(valuesToDisplay)
                                            ? valuesToDisplay
                                                  .map((value) => t(value))
                                                  .join(", ")
                                            : t(valuesToDisplay)}
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
