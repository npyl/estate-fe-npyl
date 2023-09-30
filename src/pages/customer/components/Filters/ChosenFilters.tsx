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
        buyer: {
            label: t("Buyer"),
        },
        lessor: {
            label: t("Lessor"),
        },
        seller: {
            label: t("Seller"),
        },
        parentCategories: {
            label: t("Parent Categories"),
        },
        categories: {
            label: t("Categories"),
        },
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
                                <Typography sx={{ textTransform: "lowercase" }}>
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
            })}
        </Grid>
    );
};

export default ChosenFilters;
