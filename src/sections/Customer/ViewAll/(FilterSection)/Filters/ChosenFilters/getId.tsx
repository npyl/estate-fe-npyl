import { Chip, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Tags } from "./types";
import { useFiltersContext } from "../../Context";
import { ICustomerFilter } from "@/types/customer";
import debugLog from "@/_private/debugLog";

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

interface SimpleChipProps {
    filterKey: keyof ICustomerFilter;
    methods: IIdMethods;
    label: string;
    values: any;
}

const SimpleChip: FC<SimpleChipProps> = ({
    filterKey,
    methods,
    values,
    label,
}) => {
    const { t } = useTranslation();

    const router = useRouter();

    const { getLabelNames, getManagerName } = methods;

    const valuesToDisplay =
        filterKey === "labels"
            ? getLabelNames(values)
            : filterKey === "managerId"
              ? getManagerName(values)
              : values;

    const { deleteFilter } = useFiltersContext();

    return (
        <Chip
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
};

interface ValidChipProps {
    filterKey: keyof ICustomerFilter;
    methods: IIdMethods;
    data: IIdData;
    label: string;
    values: any;
}

const ValidChip: FC<ValidChipProps> = ({
    filterKey,
    label,
    methods,
    data,
    values,
}) => {
    const { pairFilterTags, changedProps } = data;
    const { hasMinMaxPair } = methods;

    const { t } = useTranslation();

    const { deleteFilter } = useFiltersContext();

    const isRole =
        filterKey === "leaser" ||
        filterKey === "buyer" ||
        filterKey === "lessor" ||
        filterKey === "seller";

    const suffix =
        (filterKey as string).includes("min") ||
        (filterKey as string).includes("max")
            ? (filterKey as string).slice(3)
            : null;

    if (isRole && values === true) {
        // For role filters, just show the role name
        return <Chip label={label} onDelete={() => deleteFilter(filterKey)} />;
    }

    if (hasMinMaxPair(suffix) && filterKey === `max${suffix}`) return null;

    // If we have min-max pair show chip differently
    if (hasMinMaxPair(suffix)) {
        label = pairFilterTags[`minMax${suffix}`].label;

        const minValue = changedProps[`min${suffix}`];
        const maxValue = changedProps[`max${suffix}`];

        return (
            <Chip
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
    }

    return (
        <SimpleChip
            filterKey={filterKey}
            methods={methods}
            label={label}
            values={values}
        />
    );
};

// -------------------------------------------------------------------------------------------

const shouldAvoid = (values: string[], label: string) =>
    values === undefined ||
    values === null ||
    (Array.isArray(values) && values.length === 0) ||
    !label;

interface IdProps {
    filterKey: keyof ICustomerFilter;
    data: IIdData;
    methods: IIdMethods;
}

const Id: FC<IdProps> = ({ filterKey, data, methods }) => {
    const { filterTags, changedProps } = data;

    let values: any = [];
    let label = "";

    try {
        values = changedProps[filterKey];
        label = filterTags[filterKey].label;
    } catch (ex) {
        debugLog(ex);
    }

    if (shouldAvoid(values, label)) return null;

    return (
        <ValidChip
            filterKey={filterKey}
            label={label}
            data={data}
            methods={methods}
            values={values}
        />
    );
};

// -------------------------------------------------------------------------------------------

const getId =
    (data: IIdData, methods: IIdMethods) =>
    (filterKey: keyof ICustomerFilter) => (
        <Id
            key={filterKey}
            filterKey={filterKey}
            // ...
            data={data}
            methods={methods}
        />
    );

export default getId;
