import { Chip, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Tags } from "./types";
import { useFiltersContext } from "../../Context";
import { ICustomerFilter } from "@/types/customer";

interface IIdData {
    filterTags: Tags;
    pairFilterTags: Tags;
    changedProps: any;
}
interface IIdMethods {
    hasMinMaxPair: (suffix: string | null) => boolean;
    getLabelNames: (labelIds: number[]) => string;
    getManagerName: (managerId: number) => string;
}

interface IdProps {
    filterKey: keyof ICustomerFilter;
    index: number;
    data: IIdData;
    methods: IIdMethods;
}

const Id: FC<IdProps> = ({ filterKey, index, data, methods }) => {
    const { filterTags, pairFilterTags, changedProps } = data;
    const { getLabelNames, getManagerName, hasMinMaxPair } = methods;

    const { t } = useTranslation();

    console.log("FILTERKEY: ", filterKey);

    const { deleteFilter } = useFiltersContext();

    const router = useRouter();

    let values: any = [];
    let label = "";

    try {
        values = changedProps[filterKey];
        label = filterTags[filterKey].label;
    } catch (ex) {}

    if (
        values === undefined ||
        values === null ||
        (Array.isArray(values) && values.length === 0) ||
        !label
    ) {
        return null;
    }

    const isRole =
        filterKey === "leaser" ||
        filterKey === "buyer" ||
        filterKey === "lessor" ||
        filterKey === "seller";

    let valuesToDisplay =
        filterKey === "labels"
            ? getLabelNames(values)
            : filterKey === "managerId"
              ? getManagerName(values)
              : values;

    const suffix =
        (filterKey as string).includes("min") ||
        (filterKey as string).includes("max")
            ? (filterKey as string).slice(3)
            : null;

    if (isRole && values === true) {
        // For role filters, just show the role name
        return (
            <Chip
                key={index}
                label={label}
                onDelete={() => deleteFilter(filterKey)}
            />
        );
    }

    if (hasMinMaxPair(suffix) && filterKey === `max${suffix}`) return null;

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
                        <Typography fontWeight="medium">{label}:</Typography>

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
                        <Typography sx={{ textTransform: "capitalize" }}>
                            {maxValue.toLocaleString("el-GR")}
                        </Typography>
                    </Stack>
                }
                onDelete={() => {
                    deleteFilter(`min${suffix}`);
                    deleteFilter(`max${suffix}`);
                }}
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
                            <Typography fontWeight="medium">
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
                        deleteFilter("minPrice");
                    }}
                />
            );
        } else if (maxValue) {
            return (
                <Chip
                    key={index}
                    label={
                        <Stack direction="row">
                            <Typography fontWeight="medium">
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
                        deleteFilter("maxPrice");
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
                        <Typography fontWeight="medium">{label}:</Typography>
                        <Typography sx={{ textTransform: "capitalize" }}>
                            {Array.isArray(valuesToDisplay)
                                ? valuesToDisplay
                                      .map((value) => t(value))
                                      .join(", ")
                                : t(valuesToDisplay)}
                        </Typography>
                    </Stack>
                }
                onDelete={() => {
                    deleteFilter(filterKey);

                    if (filterKey === "managerId") {
                        const newQuery = { ...router.query };
                        delete newQuery.managerId;

                        router.replace(
                            {
                                pathname: router.pathname,
                                query: newQuery,
                            },
                            undefined,
                            { shallow: true }
                        );
                    }
                }}
            />
        );
    }
};

const getId =
    (data: IIdData, methods: IIdMethods) =>
    (filterKey: keyof ICustomerFilter, index: number) => (
        <Id
            key={filterKey}
            filterKey={filterKey}
            index={index}
            // ...
            data={data}
            methods={methods}
        />
    );

export default getId;
