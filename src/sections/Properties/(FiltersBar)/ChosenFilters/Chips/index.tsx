import { FC } from "react";
import { TTags } from "../types";
import { IPropertyFilter } from "@/types/properties";
import { useChangedFields } from "@/sections/Properties/FiltersContext";
import ValidChip from "./ValidChip";

const shouldAvoid = (values: any) =>
    values === 0 ||
    values == undefined ||
    (Array.isArray(values) && values.length === 0);

interface GeneralChipProps {
    filterKey: keyof IPropertyFilter;
    filterTags: TTags;
    pairFilterTags: TTags;
}

const GeneralChip: FC<GeneralChipProps> = ({
    filterKey,
    filterTags,
    pairFilterTags,
}) => {
    const changedProps = useChangedFields();
    const values = changedProps[filterKey];

    if (shouldAvoid(values)) return null;

    const label = filterTags[filterKey]?.label;

    return (
        <ValidChip
            filterKey={filterKey}
            label={label}
            values={values}
            pairFilterTags={pairFilterTags}
            changedProps={changedProps}
        />
    );
};

export default GeneralChip;
