import { useSorting } from "@/sections/Properties/FiltersContext";
import { useMemo } from "react";
import useSortingOptions from "./useSortingOptions";

const useCurrentSortingOption = () => {
    const sortingOptions = useSortingOptions();

    const sorting = useSorting();

    const option = useMemo(
        () => sortingOptions.find(({ value }) => value === sorting),
        [sortingOptions, sorting]
    );

    return option;
};

export default useCurrentSortingOption;
