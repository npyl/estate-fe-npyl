import { RefObject, useCallback, useLayoutEffect, useMemo } from "react";

// --------------------------------------------------------------------------------

type TCb<T> = (e: CustomEventInit<T>) => void;

// --------------------------------------------------------------------------------

const getEvent = <T>(name: string, detail: T) =>
    new CustomEvent<T>(name, { detail });

// --------------------------------------------------------------------------------

const getUseDispatcher =
    <T>(name: string, targetRef: RefObject<HTMLDivElement | null>) =>
    () => {
        const dispatch = useCallback((v: T) => {
            const el = targetRef.current || window.document.body;
            el.dispatchEvent(getEvent(name, v));
        }, []);

        return { dispatch };
    };

const getUseListener =
    <T>(
        name: string,
        targetRef: RefObject<HTMLDivElement | null>,
        cb: TCb<T>
    ) =>
    () => {
        useLayoutEffect(() => {
            console.log("LISTENING TO: ", targetRef.current);

            const el = targetRef.current || window.document.body;

            el.addEventListener(name, cb);
            return () => {
                el.removeEventListener(name, cb);
            };
        }, []);
    };

// --------------------------------------------------------------------------------

const useCustomEvent = <T>(
    name: string,
    cb: TCb<T>,
    targetRef: RefObject<HTMLDivElement | null>
) => {
    const useDispatcher = useMemo(
        () => getUseDispatcher<T>(name, targetRef),
        [name]
    );

    const useListener = useMemo(
        () => getUseListener<T>(name, targetRef, cb),
        [name, cb]
    );

    return [useDispatcher, useListener] as const;
};

// --------------------------------------------------------------------------------

export type { TCb };
export default useCustomEvent;
