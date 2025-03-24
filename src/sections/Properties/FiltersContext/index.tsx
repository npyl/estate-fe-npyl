import { createContext, FC, PropsWithChildren, useMemo } from "react";
import { IPropertyFilter } from "src/types/properties";
import { IFilterProps, IFilterState } from "./types";
import { initialState } from "./constant";
import useSetters from "./setters";
import useStateWithEffect from "./useStateWithSideEffect";
import useStateMethods from "./useStateMethods";
import useTabUpdate from "./useTabUpdate";

const FiltersContext = createContext<IFilterState | undefined>(undefined);

const FiltersProvider: FC<PropsWithChildren> = ({ children }) => {
    const onUpdate = useTabUpdate();

    const [state, setState] = useStateWithEffect<IFilterProps>(
        initialState,
        onUpdate
    );

    const methods = useStateMethods(setState);

    const setters = useSetters(methods, setState);

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
