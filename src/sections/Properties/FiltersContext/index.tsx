import { createContext, FC, PropsWithChildren, useMemo } from "react";
import { IFilterState } from "./types";
import useSetters from "./setters";
import useStateMethods from "./useStateMethods";
import useTabState from "./useTabState";
import useChangedFields from "./useChangedFields";

const FiltersContext = createContext<IFilterState | undefined>(undefined);

const FiltersProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, setState] = useTabState();

    const methods = useStateMethods(setState);

    const setters = useSetters(methods, setState);

    const changedFields = useChangedFields(state.filters);

    const sumOfChangedProperties = useMemo(
        () => Object.keys(changedFields).length,
        [changedFields]
    );

    const { filters, ids, sorting } = state;
    const contextValue = useMemo(
        () => ({
            filters,
            ids,
            sorting,
            ...setters,
            sumOfChangedProperties,
            changedFields,
        }),
        [filters, ids, sorting, sumOfChangedProperties, changedFields]
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
