import { useCallback, Dispatch, SetStateAction } from "react";
import { IPropertyFilter } from "src/types/properties";
import { IFilterProps } from "./types";
import { initialState } from "./constant";

const getInitialValue = (v: any) =>
    Array.isArray(v) ? [...v] : typeof v === "object" ? { ...v } : v;

const useStateMethods = (setState: Dispatch<SetStateAction<IFilterProps>>) => {
    const updateFilter = useCallback(
        (key: keyof IPropertyFilter, value: any) => {
            setState((prevState) => {
                const newState = { ...prevState };

                // Update filter value
                newState.filters = {
                    ...newState.filters,
                    [key]: value,
                };

                // Update IDs array if needed
                if (!newState.ids.includes(key)) {
                    newState.ids = [...newState.ids, key];
                }

                return newState;
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
                if (newArray.length === 0 && prevState.ids.includes(key)) {
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

    return { updateFilter, deleteFilter, toggleFilterArray };
};

export default useStateMethods;
