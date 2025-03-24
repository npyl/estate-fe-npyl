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

    const setters = useSetters(updateFilter, setState);

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
