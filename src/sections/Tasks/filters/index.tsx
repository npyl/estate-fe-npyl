import { createContext, useCallback, useContext, useLayoutEffect } from "react";
import { parseAsInteger, useQueryState } from "nuqs";
import { TSorting } from "@/sections/Filters/SortBy/types";
import { TFilters } from "./types";
import { initialState } from "./constants";
import useFilterState from "./useFilterState";

type TSetters = {
    setSearch: (s: string) => void;
    setAssigneeId: (id?: number) => void;
    setLabels: (ids: number[]) => void;
    setPriority: (p?: number) => void;
    setSorting: (s?: TSorting) => void;
};

type FiltersState = TFilters & TSetters;

const FiltersContext = createContext<FiltersState>({
    ...initialState,

    setSearch: () => {},
    setAssigneeId: () => {},
    setLabels: () => {},
    setPriority: () => {},
    setSorting: () => {},
});

export const useFiltersContext = () => {
    const context = useContext(FiltersContext);
    if (context === undefined) {
        throw new Error(
            "FiltersContext value is undefined. Make sure you use the FiltersContext before using the context."
        );
    }
    return context;
};

export const FiltersProvider: React.FC<React.PropsWithChildren<unknown>> = (
    props
) => {
    const [state, setState] = useFilterState();

    const setSearch = useCallback(
        (search: string) => setState((old) => ({ ...old, search })),
        []
    );
    const setAssigneeId = useCallback(
        (assigneeId?: number) => setState((old) => ({ ...old, assigneeId })),
        []
    );
    const setPriority = useCallback(
        (priority?: number) => setState((old) => ({ ...old, priority })),
        []
    );
    const setLabels = useCallback(
        (labels: number[]) => setState((old) => ({ ...old, labels })),
        []
    );
    const setSorting = useCallback(
        (sorting?: TSorting) => setState((old) => ({ ...old, sorting })),
        []
    );

    const [assignee] = useQueryState(
        "assignee",
        parseAsInteger.withDefault(-1)
    );
    useLayoutEffect(() => {
        if (assignee === -1) return;
        setAssigneeId(assignee);
    }, [assignee]);

    return (
        <FiltersContext.Provider
            value={{
                ...state,
                // ...
                setSearch,
                setAssigneeId,
                setPriority,
                setLabels,
                setSorting,
            }}
            {...props}
        />
    );
};
