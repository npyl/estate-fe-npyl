import { useCallback, useLayoutEffect, useMemo } from "react";

// --------------------------------------------------------------------------------

type TCb<T> = (e: CustomEventInit<T>) => void;

// --------------------------------------------------------------------------------

const getEvent = <T>(name: string, detail: T) =>
    new CustomEvent<T>(name, { detail });

// --------------------------------------------------------------------------------

const getUseListener =
    <T>(name: string, element: HTMLElement, cb: TCb<T>) =>
    () => {
        useLayoutEffect(() => {
            element.addEventListener(name, cb);
            return () => {
                element.removeEventListener(name, cb);
            };
        }, []);
    };

// --------------------------------------------------------------------------------

const useCustomEvent = <T>(
    name: string,
    cb: TCb<T>,
    element: HTMLElement = window.document.body
) => {
    const dispatch = useCallback((v: T) => {
        element.dispatchEvent(getEvent(name, v));
    }, []);

    const useListener = useMemo(
        () => getUseListener<T>(name, element, cb),
        [name, element, cb]
    );

    return [dispatch, useListener] as const;
};

// --------------------------------------------------------------------------------

export type { TCb };
export default useCustomEvent;
