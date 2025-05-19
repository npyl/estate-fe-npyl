import { useFiltersContext } from "@/sections/Tasks/filters";
import { useMemo } from "react";
import useSortingOptions from "./useSortingOptions";

const useCurrentValue = () => {
    const sortingOptions = useSortingOptions();

    const { filters } = useFiltersContext();
    const { sorting } = filters || {};

    const option = useMemo(
        () =>
            sortingOptions.find(
                ({ sorting: _s }) =>
                    _s.direction === sorting?.direction &&
                    _s.sortBy === sorting?.sortBy
            ),
        [sortingOptions, sorting]
    );

    return option?.value || "default";
};

export default useCurrentValue;
