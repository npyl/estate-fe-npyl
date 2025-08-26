import useLocalStorage from "@/hooks/useLocalStorage";
import { initialState } from "./constants";
import { TFilters } from "./types";
import { useAuth } from "@/sections/use-auth";
import { useCallback, useMemo } from "react";
import useCallbackSetter from "@/hooks/useCallbackSetter";

type TFiltersState = Record<number, TFilters>;

const storageKey = "task-filters";

const getFiltersSafe = (ts: TFiltersState, userId: number): TFilters => {
    try {
        const filters = ts?.[userId];

        if (!filters) return initialState;

        return { ...filters, labels: filters?.labels || [] };
    } catch (ex) {
        return initialState;
    }
};

const useFilterState = () => {
    const { user } = useAuth();
    const [_state, __setState] = useLocalStorage<TFiltersState>(storageKey, {});

    const state = useMemo(
        () => getFiltersSafe(_state, user?.id ?? -1),
        [_state, user?.id]
    );

    const _setState = useCallback(
        (f: TFilters) =>
            __setState((old) => ({
                ...old,
                [user?.id!]: f,
            })),
        [user?.id]
    );

    const setState = useCallbackSetter<TFilters>(state, _setState);

    return [state, setState] as const;
};

export default useFilterState;
