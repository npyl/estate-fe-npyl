import { FC } from "react";
import { useDispatch } from "react-redux";
import useEnums from "../../useEnums";
import Chip from "@mui/material/Chip";
import { deleteFilter } from "@/slices/filters";
import ChipLabel from "./ChipLabel";
import { useTranslation } from "react-i18next";
import getEnumLabel from "./util";
import { TTags } from "../types";
import dynamic from "next/dynamic";
import { Stack, Typography } from "@mui/material";

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
// --------------------------------------------------------------------------------

interface SimpleChipProps {
    title: string;
    values: string[];
    filterKey: string;
}

const SimpleChip: FC<SimpleChipProps> = ({ values, title, filterKey }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const label = Array.isArray(values)
        ? values.map((v) => t(v)).join(", ")
        : t(values);

    const handleClear = () => dispatch(deleteFilter(filterKey));

    return (
        <Chip
            label={<ChipLabel title={title} value={label} />}
            onDelete={handleClear}
        />
    );
};

// --------------------------------------------------------------------------------

interface GeneralChipProps {
    filterKey: string;
    changedProps: any;
    filterTags: TTags;
    pairFilterTags: TTags;
}

const GeneralChip: FC<GeneralChipProps> = ({
    filterKey,
    changedProps,
    filterTags,
    pairFilterTags,
}) => {
    const { frameTypeEnum, furnishedEnum, heatingTypeEnum } = useEnums();

    const values = changedProps[filterKey];
    const label = filterTags[filterKey]?.label;

    if (
        values === 0 ||
        values == undefined ||
        (Array.isArray(values) && values.length === 0)
    )
        return null;

    const suffix =
        filterKey.includes("min") || filterKey.includes("max")
            ? filterKey.slice(3)
            : null;

    const hasMinMaxPair = (suffix: string | null): boolean => {
        if (!suffix) return false;

        const minKey = `min${suffix}`;
        const maxKey = `max${suffix}`;

        return (
            changedProps.hasOwnProperty(minKey) &&
            changedProps.hasOwnProperty(maxKey)
        );
    };

    // If we have min-max pair, make sure we ignore one of them (don't show the same chip twice)
    if (hasMinMaxPair(suffix) && filterKey === `max${suffix}`) return null;

    // If we have min-max pair show chip differently
    if (hasMinMaxPair(suffix)) {
        return <MinMaxChip suffix={suffix!} pairFilterTags={pairFilterTags} />;
    }

    //

    //  Single Chips
    //
    if (filterKey === "locationSearch") {
        return <LocationChip />;
    }

    if (filterKey === "minFloor") {
        return <MinFloorChip />;
    }

    // If only maxFloor is selected
    if (filterKey === "maxFloor") {
        return <MaxFloorChip />;
    }

    if (filterKey === "minPrice") {
        return <MinPriceChip />;
    }

    if (filterKey === "maxPrice") {
        return <MaxPriceChip />;
    }

    if (filterKey === "active") {
        return <ActiveChip />;
    }

    if (filterKey === "labels") {
        return <LabelsChip />;
    }

    if (filterKey === "managerId") {
        return <ManagerChip />;
    }

    if (filterKey === "regions") {
        return <Regions />;
    }

    if (filterKey === "cities") {
        return <Cities />;
    }

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

    return (
        <SimpleChip
            filterKey={filterKey}
            title={label}
            values={valuesToDisplay}
        />
    );
};

export default GeneralChip;
