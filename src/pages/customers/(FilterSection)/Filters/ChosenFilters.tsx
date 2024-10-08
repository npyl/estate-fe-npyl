import { Chip, Grid, GridProps, Stack, Typography } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useGetLabelsQuery } from "src/services/labels";
import { useAllUsersQuery } from "src/services/user";
import {
    deleteFilter,
    getChangedFields,
    selectIds,
} from "src/slices/customer/filters";

const ChosenFilters = (props: GridProps) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { data: labelsQuery } = useGetLabelsQuery();
    const { data: users } = useAllUsersQuery();
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
        () => labelsQuery?.customerLabels || [],
        [labelsQuery?.customerLabels]
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
            const user = users?.find((user) => user.id === managerId);
            return `${user?.firstName} ${user?.lastName}`;
        },
        [users]
    );

    return (
        <Grid container direction="row" {...props}>
            {ids.map((key, index) => {
                const values = changedProps[key];
                let label = filterTags[key].label;
                let manager = filterTags[key].label;
                if (!values || !label) return <></>;

                const isRole =
                    key === "leaser" ||
                    key === "buyer" ||
                    key === "lessor" ||
                    key === "seller";

                let valuesToDisplay =
                    key === "labels"
                        ? getLabelNames(values)
                        : key === "managerId"
                        ? getManagerName(values)
                        : values;

                const suffix =
                    key.includes("min") || key.includes("max")
                        ? key.slice(3)
                        : null;

                if (isRole && values === true) {
                    // For role filters, just show the role name
                    return (
                        <Chip
                            key={index}
                            label={label}
                            onDelete={() => dispatch(deleteFilter(key))}
                            sx={{ m: 0.5 }}
                        />
                    );
                }

                if (hasMinMaxPair(suffix) && key === `max${suffix}`)
                    return <></>;

                // If we have min-max pair show chip differently
                if (hasMinMaxPair(suffix)) {
                    label = pairFilterTags[`minMax${suffix}`].label;
                    // manager = pairFilterTags[`minMax${suffix}`].label;
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
                                    {/* <Typography
                                        sx={{
                                            fontWeight: "medium",
                                            paddingRight: 1,
                                        }}
                                    >
                                        {manager}:
                                    </Typography> */}
                                    <Typography
                                        sx={{
                                            textTransform: "capitalize",
                                        }}
                                    >
                                        {minValue.toLocaleString("el-GR")}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: "medium",
                                        }}
                                    >
                                        -
                                    </Typography>
                                    <Typography
                                        sx={{ textTransform: "capitalize" }}
                                    >
                                        {maxValue.toLocaleString("el-GR")}
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
                } else if (suffix === "Price") {
                    const minValue = changedProps[`minPrice`];
                    const maxValue = changedProps[`maxPrice`];
                    if (minValue) {
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
                                            {t("Minimum Price")}
                                            {" (€):"}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                textTransform: "capitalize",
                                            }}
                                        >
                                            {minValue.toLocaleString("el-GR")}
                                        </Typography>
                                    </Stack>
                                }
                                onDelete={() => {
                                    dispatch(deleteFilter("minPrice"));
                                }}
                            />
                        );
                    } else if (maxValue) {
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
                                            {t("Maximum Price")}
                                            {` (€):`}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                textTransform: "capitalize",
                                            }}
                                        >
                                            {maxValue.toLocaleString("el-GR")}
                                        </Typography>
                                    </Stack>
                                }
                                onDelete={() => {
                                    dispatch(deleteFilter("maxPrice"));
                                }}
                            />
                        );
                    }
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
                                        {label}:{/* {isRole ? "" : ":"} */}
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
                            sx={{ m: 0.5 }}
                        />
                    );
                }
            })}
        </Grid>
    );
};

export default ChosenFilters;
