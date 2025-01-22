import { useSelector } from "react-redux";
import { selectSorting } from "@/slices/filters";
import { useMemo } from "react";
import useSortingOptions from "./useSortingOptions";

const useCurrentSortingOption = () => {
    const sortingOptions = useSortingOptions();

    const sorting = useSelector(selectSorting);

    const option = useMemo(
        () => sortingOptions.find(({ value }) => value === sorting),
        [sortingOptions, sorting]
    );

    return option;
};

export default useCurrentSortingOption;
