import { createContext, FC, PropsWithChildren, useMemo } from "react";
import { IFilterProps, IFilterState } from "./types";
import { initialState } from "./constant";
import useSetters from "./setters";
import useStateWithEffect from "./useStateWithSideEffect";
import useStateMethods from "./useStateMethods";
import useTabUpdate from "./useTabUpdate";
import useChangedFields from "./useChangedFields";

const FiltersContext = createContext<IFilterState | undefined>(undefined);

const FiltersProvider: FC<PropsWithChildren> = ({ children }) => {
    const onUpdate = useTabUpdate();

    const [state, setState] = useStateWithEffect<IFilterProps>(
        initialState,
        onUpdate
    );

    const methods = useStateMethods(setState);

    const setters = useSetters(methods, setState);

    const changedFields = useChangedFields(state.filters);

    const sumOfChangedProperties = useMemo(
        () => Object.keys(changedFields).length,
        [changedFields]
    );

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
