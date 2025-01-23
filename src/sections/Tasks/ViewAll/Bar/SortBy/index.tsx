import FilterSortBy from "@/sections/Filters/SortBy";
import useSortingOptions from "./useSortingOptions";
import useCurrentValue from "./useCurrentValue";
import { useCallback } from "react";
import { useFiltersContext } from "@/sections/Tasks/filters";

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

    console.log("GOT: ", sorting);

    return (
        <FilterSortBy
            options={options}
            sorting={sorting}
            onSortingChange={handleSortingChange}
        />
    );
};

export default SortBy;
