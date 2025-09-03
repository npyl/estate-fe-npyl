import { useLayoutEffect, useRef } from "react";

// https://github.com/alibaba/hooks

type EffectHookType = typeof useLayoutEffect;

const createUpdateEffect: (hook: EffectHookType) => EffectHookType =
    (hook) => (effect, deps) => {
        const isMounted = useRef(false);

        // for react-refresh
        hook(() => {
            return () => {
                isMounted.current = false;
            };
        }, []);

        hook(() => {
            if (!isMounted.current) {
                isMounted.current = true;
            } else {
                return effect();
            }
        }, deps);
    };

export default createUpdateEffect(useLayoutEffect);
