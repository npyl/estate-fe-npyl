import { createContext, FC, PropsWithChildren, useMemo } from "react";
import { IFilterProps, IFilterState } from "./types";
import { initialState } from "./constant";
import useSetters from "./setters";
import useStateWithEffect from "./useStateWithSideEffect";
import useStateMethods from "./useStateMethods";
import useTabState from "./useTabState";
import useChangedFields from "./useChangedFields";
import { IPropertyFilter } from "@/types/properties";

const FiltersContext = createContext<IFilterState | undefined>(undefined);

const getIdsForTabData = (tabData: object) => Object.keys(tabData);

const getInitialState = (tabData: object) => ({
    ...initialState,
    filters: (tabData as IPropertyFilter) || initialState.filters,
    ids: tabData ? getIdsForTabData(tabData) : [],
});

const FiltersProvider: FC<PropsWithChildren> = ({ children }) => {
    const [tabData, onUpdate] = useTabState();

    const [state, setState] = useStateWithEffect<IFilterProps>(
        getInitialState(tabData),
        onUpdate
    );

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
