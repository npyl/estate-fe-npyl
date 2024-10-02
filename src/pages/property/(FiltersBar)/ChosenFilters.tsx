import { useGlobals } from "@/hooks/useGlobals";
import { TranslationType } from "@/types/translation";
import { Chip, Stack, StackProps, Typography } from "@mui/material";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteFilter,
    getChangedFields,
    selectActiveState,
    selectIds,
} from "src/slices/filters";

interface Props extends StackProps {}

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

// getting the value and not the key of each enumValue
const getEnumLabel = (key: any, enumValues: any) => {
    const foundItem = enumValues.find((item: any) => item.key === key);
    return foundItem ? foundItem.value : "Unknown";
};

type TTags = Record<string, { label: string }>;

const getFilterTags = (t: TranslationType): TTags => ({
    regions: {
        label: t("Regions"),
    },
    cities: {
        label: t("Cities"),
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
});

const getPairFilterTags = (t: TranslationType): TTags => ({
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
});

interface ChipLabelProps {
    title: string;
    value: string;
}

const ChipLabel: FC<ChipLabelProps> = ({ title, value }) => (
    <Stack direction="row" spacing={1}>
        <Typography fontWeight="medium">{title}:</Typography>
        <Typography textTransform="capitalize">{value}</Typography>
    </Stack>
);

const ActiveChip = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const isActive = useSelector(selectActiveState);
    const activeLabel = isActive ? t("Active") : t("Inactive");

    const handleDelete = () => dispatch(deleteFilter("active"));

    return <Chip label={activeLabel} onDelete={handleDelete} />;
};

interface MinMaxChipProps {
    suffix: string;
    pairFilterTags: TTags;
}

const MinMaxChip: FC<MinMaxChipProps> = ({ suffix, pairFilterTags }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { minFloorEnum, maxFloorEnum } = useEnums();
    const changedProps = useSelector(getChangedFields);

    const label = pairFilterTags[`minMax${suffix}`].label;

    const minValue = changedProps[`min${suffix}`];
    const maxValue = changedProps[`max${suffix}`];

    const handleClear = () => {
        dispatch(deleteFilter(`min${suffix}`));
        dispatch(deleteFilter(`max${suffix}`));
    };

    if (suffix === "Floor") {
        const min = getEnumLabel(minValue, minFloorEnum);
        const max = getEnumLabel(maxValue, maxFloorEnum);

        return (
            <Chip
                label={<ChipLabel title={t("Floor")} value={`${min}-${max}`} />}
                onDelete={handleClear}
            />
        );
    }

    if (suffix === "Price") {
        const min = minValue.toLocaleString("el-GR");
        const max = maxValue.toLocaleString("el-GR");

        return (
            <Chip
                label={<ChipLabel title={label} value={`${min}-${max}`} />}
                onDelete={handleClear}
            />
        );
    }

    return (
        <Chip
            label={
                <ChipLabel title={label} value={`${minValue}-${maxValue}`} />
            }
            onDelete={handleClear}
        />
    );
};

const ChosenFilters: FC<Props> = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const {
        frameTypeEnum,
        furnishedEnum,
        heatingTypeEnum,
        minFloorEnum,
        maxFloorEnum,
    } = useEnums();

    const changedProps = useSelector(getChangedFields);
    const ids = useSelector(selectIds);

    const filterTags = useMemo(() => getFilterTags(t), [t]);
    const pairFilterTags = useMemo(() => getPairFilterTags(t), [t]);

    const hasMinMaxPair = (suffix: string | null): boolean => {
        if (!suffix) return false;

        const minKey = `min${suffix}`;
        const maxKey = `max${suffix}`;

        return (
            changedProps.hasOwnProperty(minKey) &&
            changedProps.hasOwnProperty(maxKey)
        );
    };

    return (
        <Stack direction="row" gap={0.3} {...props}>
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

                // INFO: this should not happen
                if (!suffix) return null;

                // If we have min-max pair, make sure we ignore one of them (don't show the same chip twice)
                if (hasMinMaxPair(suffix) && key === `max${suffix}`)
                    return null;

                // If we have min-max pair show chip differently
                if (hasMinMaxPair(suffix)) {
                    return (
                        <MinMaxChip
                            suffix={suffix}
                            pairFilterTags={pairFilterTags}
                        />
                    );
                }

                //
                //  Single
                //
                if (key === "minFloor") {
                    const minValue = changedProps[`minFloor`];
                    const minLabel = getEnumLabel(minValue, minFloorEnum);
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
                else if (key === "maxFloor") {
                    const maxValue = changedProps[`maxFloor`];
                    const maxLabel = getEnumLabel(maxValue, maxFloorEnum);
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
                } else if (key === "active") {
                    return <ActiveChip />;
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
        </Stack>
    );
};

export default ChosenFilters;
