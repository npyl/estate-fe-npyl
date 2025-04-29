import { useCallback, Dispatch, SetStateAction } from "react";
import { IPropertyFilter } from "src/types/properties";
import { IFilterProps } from "./types";
import { initialState } from "./constant";
import { parseAsString, parseAsStringLiteral, useQueryState } from "nuqs";

const getInitialValue = (v: any) => {
    // INFO: explicitly support null and undefined values!
    if (!v) return v;
    return Array.isArray(v) ? [...v] : typeof v === "object" ? { ...v } : v;
};

const useStateMethods = (setState: Dispatch<SetStateAction<IFilterProps>>) => {
    const updateFilter = useCallback(
        (key: keyof IPropertyFilter, value: any) => {
            setState((prevState) => {
                const newState = { ...prevState };

                // Update filter value
                const newFilters = {
                    ...newState.filters,
                    [key]: value,
                };

                let newIds;
                if (Array.isArray(value) && value.length === 0) {
                    newIds = prevState.ids.filter((id) => id !== key);
                } else {
                    const isIncluded = prevState.ids.includes(key);

                    newIds = isIncluded
                        ? prevState.ids
                        : [...prevState.ids, key];
                }

                return { ...prevState, filters: newFilters, ids: newIds };
            });
        },
        []
    );

    const toggleFilterArray = useCallback(
        (key: keyof IPropertyFilter, value: string) =>
            setState((prevState) => {
                // Safely get the current array
                const currentArray = [...prevState.filters[key]];

                // Determine the new array state
                let newArray;
                if (currentArray.includes(value)) {
                    // Remove value if it exists
                    newArray = currentArray.filter((item) => item !== value);
                } else {
                    // Add value if it doesn't exist
                    newArray = [...currentArray, value];
                }

                // Create a new filters object
                const newFilters = {
                    ...prevState.filters,
                    [key]: newArray,
                };

                // Update IDs based on the new array state
                let newIds;
                if (newArray.length === 0) {
                    // Remove from IDs if array is empty
                    newIds = prevState.ids.filter((id) => id !== key);
                } else if (
                    newArray.length > 0 &&
                    !prevState.ids.includes(key)
                ) {
                    // Add to IDs if array is not empty and ID isn't already included
                    newIds = [...prevState.ids, key];
                } else {
                    // Keep the same IDs but create a new array
                    newIds = [...prevState.ids];
                }

                // Return a completely new state object
                return {
                    ...prevState,
                    filters: newFilters,
                    ids: newIds,
                };
            }),
        []
    );

    const deleteFilter = useCallback(
        (key: keyof IPropertyFilter) =>
            setState((prevState) => ({
                ...prevState,
                filters: {
                    ...prevState.filters,
                    [key]: getInitialValue(initialState.filters[key]),
                },
                ids: prevState.ids.filter((id) => id !== key),
            })),
        []
    );

    //
    //  Url params
    //

    const [_, setAssignee] = useQueryState("assignee");
    const deleteAssigneeUrlParam = useCallback(() => setAssignee(null), []);

    const [activeStateRaw, setActiveState] = useQueryState(
        "activeState",
        parseAsString
    );
    const deleteActiveStateUrlParam = useCallback(
        () => setActiveState(null),
        []
    );
    return {
        updateFilter,
        deleteFilter,
        toggleFilterArray,
        // ...
        deleteAssigneeUrlParam,
        deleteActiveStateUrlParam,
    };
};

export default useStateMethods;
