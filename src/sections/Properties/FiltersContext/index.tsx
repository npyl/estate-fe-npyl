import {
    createContext,
    FC,
    PropsWithChildren,
    useState,
    useMemo,
    useCallback,
} from "react";
import { IPropertyFilter } from "src/types/properties";
import { IFilterProps, IFilterState } from "./types";
import { initialState } from "./constant";
import useSetters from "./setters";

const FiltersContext = createContext<IFilterState | undefined>(undefined);

const FiltersProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, setState] = useState<IFilterProps>(initialState);

    const updateFilter = useCallback(
        (
            key: keyof IPropertyFilter,
            value: any,
            shouldAddToIds: boolean = true
        ) => {
            setState((prevState) => {
                const newState = { ...prevState };

                // Update filter value
                newState.filters = {
                    ...newState.filters,
                    [key]: value,
                };

                // Update IDs array if needed
                if (shouldAddToIds && !newState.ids.includes(key)) {
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
                const currentArray = Array.isArray(prevState.filters[key])
                    ? [...prevState.filters[key]]
                    : [];

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

    const setters = useSetters(updateFilter, toggleFilterArray, setState);

    // Computed values
    const sumOfChangedProperties = useMemo(() => {
        const propertiesToInclude = [
            "locationSearch",
            "code",
            "minPrice",
            "maxPrice",
            "minArea",
            "maxArea",
            "minBedrooms",
            "maxBedrooms",
            "minFloor",
            "maxFloor",
            "minConstructionYear",
            "maxConstructionYear",
            "managerId",
            "active",
            "extras",
            "regions",
            "cities",
            "states",
            "parentCategories",
            "categories",
            "labels",
            "heatingType",
            "frameType",
            "furnished",
            "points",
        ] as const;

        return propertiesToInclude.reduce((acc, curr) => {
            const key = curr;
            const currentFilterValue = state.filters[key];
            const initialFilterValue = initialState.filters[key];

            if (curr === "active") {
                if (currentFilterValue !== initialFilterValue) {
                    return acc + 1;
                }
                return acc;
            }

            if (currentFilterValue !== initialFilterValue) {
                return Array.isArray(currentFilterValue)
                    ? currentFilterValue.length > 0
                        ? acc + 1
                        : acc
                    : currentFilterValue
                    ? acc + 1
                    : acc;
            }

            return acc;
        }, 0);
    }, [state.filters]);

    const changedFields = useMemo(() => {
        return Object.entries(state.filters).reduce(
            (acc: Partial<IPropertyFilter>, [_key, value]) => {
                const key = _key as keyof IPropertyFilter;

                if (value !== initialState.filters[key]) {
                    acc[key] = value;
                }

                return acc;
            },
            {}
        );
    }, [state.filters]);

    const contextValue = useMemo(
        () => ({
            ...state,
            ...setters,
            sumOfChangedProperties,
            changedFields,
        }),
        [state, sumOfChangedProperties, changedFields]
    );

    return (
        <FiltersContext.Provider value={contextValue}>
            {children}
        </FiltersContext.Provider>
    );
};

export * from "./getters";
export { default as useFiltersContext } from "./useFiltersContext";
export { FiltersContext, FiltersProvider };
