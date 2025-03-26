import { DependencyList, EffectCallback, useLayoutEffect, useRef } from "react";

/**
 * Layout Effect that skips initial render and as a result runs *ONLY* on props *UPDATE*
 * See: https://ahooks.js.org/hooks/use-update-effect/
 */
const useUpdateLayoutEffect = (
    effect: EffectCallback,
    deps?: DependencyList
) => {
    const isFirstRun = useRef(true);

    useLayoutEffect(() => {
        if (isFirstRun) {
            isFirstRun.current = false;
            return;
        }

        return effect();
    }, [deps]);
};

export default useUpdateLayoutEffect;
