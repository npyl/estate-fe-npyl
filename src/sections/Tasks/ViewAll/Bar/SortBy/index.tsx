import FilterSortBy from "@/sections/Filters/SortBy";
import useSortingOptions from "./useSortingOptions";
import useCurrentValue from "./useCurrentValue";
import { useCallback } from "react";
import { useFiltersContext } from "@/sections/Tasks/filters";
import { SxProps, Theme } from "@mui/material";

const ButtonSx: SxProps<Theme> = {
    minWidth: "fit-content",

    "& .PPSortByButton-Label": {
        display: {
            xs: "block",
        },
    },
};

const SortBy = () => {
    const options = useSortingOptions();
    const sorting = useCurrentValue();

    const { setSorting } = useFiltersContext();
    const handleSortingChange = useCallback(
        (v: string) => {
            const o = options?.find(({ value }) => value === v);
            if (!o) return;

            const { sorting } = o;

            setSorting(sorting);
        },
        [options]
    );

    return (
        <FilterSortBy
            options={options}
            sorting={sorting}
            onSortingChange={handleSortingChange}
            sx={ButtonSx}
        />
    );
};

export default SortBy;
