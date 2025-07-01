import { FC } from "react";
import Chip from "@mui/material/Chip";
import ChipLabel from "@/ui/Filters/ChipLabel";
import { useTranslation } from "react-i18next";
import { TTags } from "../types";
import {
    useChangedFields,
    useFiltersContext,
} from "@/sections/Blog/ViewAll/Filters/Context";
import { BlogFilters } from "@/types/company";

// --------------------------------------------------------------------------------

interface SimpleChipProps {
    title: string;
    values: string[];
    filterKey: keyof BlogFilters;
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

interface GeneralChipProps {
    filterKey: keyof BlogFilters;
    filterTags: TTags;
}

const GeneralChip: FC<GeneralChipProps> = ({ filterKey, filterTags }) => {
    const changedProps = useChangedFields();
    const values = changedProps[filterKey];
    const label = filterTags[filterKey]?.label;

    if (values == undefined || (Array.isArray(values) && values.length === 0))
        return null;

    return (
        <SimpleChip
            filterKey={filterKey}
            title={label}
            values={values as any}
        />
    );
};

export default GeneralChip;
