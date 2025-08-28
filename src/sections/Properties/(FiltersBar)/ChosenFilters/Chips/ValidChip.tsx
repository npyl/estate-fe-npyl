import { ComponentType, FC, useMemo } from "react";
import useEnums from "../../useEnums";
import getEnumLabel from "./util";
import { TTags } from "../types";
import dynamic from "next/dynamic";
import { IPropertyFilter } from "@/types/properties";
import Points from "./Points";
import IntegrationsChip from "./Integrationts";
import Chip from "@mui/material/Chip";
import ChipLabel from "@/ui/Filters/ChipLabel";
import { useTranslation } from "react-i18next";
import { useFiltersContext } from "@/sections/Properties/FiltersContext";

// Chips
const MinMaxChip = dynamic(() => import("./MinMax"));
const MinFloorChip = dynamic(() => import("./MinFloor"));
const MaxFloorChip = dynamic(() => import("./MaxFloor"));
const ActiveChip = dynamic(() => import("./Active"));
const MinPriceChip = dynamic(() => import("./MinPrice"));
const MaxPriceChip = dynamic(() => import("./MaxPrice"));
const LabelsChip = dynamic(() => import("./Labels"));
const ManagerChip = dynamic(() => import("./Manager"));
const Regions = dynamic(() => import("./Regions"));
const Cities = dynamic(() => import("./Cities"));
const LocationChip = dynamic(() => import("./Location"));
const LifestyleChip = dynamic(() => import("./Lifestyle"));

// --------------------------------------------------------------------------------

interface SimpleChipProps {
    title: string;
    values: string[];
    filterKey: keyof IPropertyFilter;
}

const SimpleChip: FC<SimpleChipProps> = ({ values, title, filterKey }) => {
    const { t } = useTranslation();

    const label = Array.isArray(values)
        ? values.map((v) => t(v)).join(", ")
        : t(values);

    const { deleteFilter } = useFiltersContext();
    const handleClear = () => deleteFilter(filterKey);

    return (
        <Chip
            label={<ChipLabel title={title} value={label} />}
            onDelete={handleClear}
        />
    );
};

// --------------------------------------------------------------------------------

const getSuffix = (_filterKey: keyof IPropertyFilter) => {
    const filterKey = _filterKey as string;

    return filterKey.includes("min") || filterKey.includes("max")
        ? filterKey.slice(3)
        : null;
};

const SINGLE_CHIP_MAP = new Map<keyof IPropertyFilter, ComponentType>([
    ["integrationSites", IntegrationsChip],
    ["locationSearch", LocationChip],
    ["minFloor", MinFloorChip],
    ["maxFloor", MaxFloorChip],
    ["minPrice", MinPriceChip],
    ["maxPrice", MaxPriceChip],
    ["active", ActiveChip],
    ["labels", LabelsChip],
    ["managerId", ManagerChip],
    ["regions", Regions],
    ["cities", Cities],
    ["extras", LifestyleChip],
    ["points", Points],
]);

interface ValidChipProps {
    filterKey: keyof IPropertyFilter;
    pairFilterTags: TTags;
    label: string;
    changedProps: Partial<IPropertyFilter>;
    values: any;
}

const ValidChip: FC<ValidChipProps> = ({
    filterKey,
    pairFilterTags,
    label,
    changedProps,
    values,
}) => {
    const { frameTypeEnum, furnishedEnum, heatingTypeEnum } = useEnums();

    const suffix = getSuffix(filterKey);

    const hasMinMaxPair = useMemo(() => {
        if (!suffix) return false;

        const minKey = `min${suffix}`;
        const maxKey = `max${suffix}`;

        return (
            changedProps.hasOwnProperty(minKey) &&
            changedProps.hasOwnProperty(maxKey)
        );
    }, [changedProps, suffix]);

    // If we have min-max pair, make sure we ignore one of them (don't show the same chip twice)
    if (hasMinMaxPair && filterKey === `max${suffix}`) return null;

    // If we have min-max pair show chip differently
    if (hasMinMaxPair) {
        return <MinMaxChip suffix={suffix!} pairFilterTags={pairFilterTags} />;
    }

    //
    //  Enums
    //
    let valuesToDisplay = values;

    // Map the keys to their corresponding labels for frameType, furnished, heatingType
    if (filterKey === "frameType") {
        valuesToDisplay = values.map((val: any) =>
            getEnumLabel(val, frameTypeEnum)
        );
    } else if (filterKey === "furnished") {
        valuesToDisplay = values.map((val: any) =>
            getEnumLabel(val, furnishedEnum)
        );
    } else if (filterKey === "heatingType") {
        valuesToDisplay = values.map((val: any) =>
            getEnumLabel(val, heatingTypeEnum)
        );
    }

    //
    //  Single Chips
    //
    const SingleChip = SINGLE_CHIP_MAP.get(filterKey);
    if (SingleChip) return <SingleChip />;

    return (
        <SimpleChip
            filterKey={filterKey}
            title={label}
            values={valuesToDisplay}
        />
    );
};

export default ValidChip;
