import useLocalStorage from "@/hooks/useLocalStorage";
import { useAuth } from "@/sections/use-auth";
import { useCallback, useMemo } from "react";
import useCallbackSetter from "@/hooks/useCallbackSetter";

type TFiltersState<Filters extends object = object> = Record<number, Filters>;

const getFiltersSafe = <Filters extends object = object>(
    ts: TFiltersState<Filters>,
    userId: number,
    initialState: Filters
): Filters => {
    try {
        const filters = ts?.[userId];
        if (!filters) throw "Null filters";
        return filters;
    } catch (ex) {
        return initialState;
    }
};

/**
 * Hook that saves filters into localStorage and accounts for the user's id
 */
const useFilterStorage = <Filters extends object = object>(
    storageKey: string,
    initialState: Filters
) => {
    const { user } = useAuth();
    const [_state, __setState] = useLocalStorage<TFiltersState<Filters>>(
        storageKey,
        {}
    );

    const state = useMemo(
        () => getFiltersSafe(_state, user?.id ?? -1, initialState),
        [_state, user?.id, initialState]
    );

    const _setState = useCallback(
        (f: Filters) =>
            __setState((old) => ({
                ...old,
                [user?.id!]: f,
            })),
        [user?.id]
    );

    const setState = useCallbackSetter(state, _setState);

    return [state, setState] as const;
};

export default useFilterStorage;
