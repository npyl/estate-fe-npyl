import debugLog from "@/_private/debugLog";
import { useCallback, useLayoutEffect, useState } from "react";
import useUpdateLayoutEffect from "@/hooks/useUpdateLayoutEffect";
import useCallbackSetter from "./useCallbackSetter";

const getValue = <V extends string | number | object = string>(
    key: string | null,
    fallbackValue: V
) => {
    if (typeof window === "undefined") return fallbackValue;
    if (!key) return fallbackValue;

    const v = localStorage.getItem(key);
    if (!v) return fallbackValue;

    const parsed = JSON.parseSafe<V>(v);
    if (!parsed) return fallbackValue;

    return parsed;
};

function dispatchStorageEvent(key: string, newValue: string | null) {
    window.dispatchEvent(new StorageEvent("storage", { key, newValue }));
}

// ----------------------------------------------------------------------------------

const setLocalStorageItem = <V extends string | number | object = string>(
    key: string,
    value: V,
    passive?: boolean
) => {
    try {
        const stringifiedValue = JSON.stringify(value);
        window.localStorage.setItem(key, stringifiedValue);

        if (passive) return;
        dispatchStorageEvent(key, stringifiedValue);
    } catch (ex) {
        debugLog(ex);
    }
};

const removeLocalStorageItem = (key: string, passive?: boolean) => {
    window.localStorage.removeItem(key);

    if (passive) return;
    dispatchStorageEvent(key, null);
};

// ----------------------------------------------------------------------------------

const useLocalStorageSubscribe = <V>(
    key: string | null,
    fallbackValue: V,
    onChange: (v: V) => void
) => {
    const cb = useCallback(
        (e: StorageEventInit) => {
            if (!key) return;
            if (e.key !== key) return;

            const v = e?.newValue
                ? JSON.parseSafe<V>(e.newValue) || fallbackValue
                : fallbackValue;

            onChange(v);
        },
        [key, fallbackValue, onChange]
    );

    useLayoutEffect(() => {
        window.addEventListener("storage", cb);
        return () => {
            window.removeEventListener("storage", cb);
        };
    }, [cb]);
};

// ----------------------------------------------------------------------------------

/**
 * Access to localStorage
 *
 * @param passive Do a set/remove on the localStorage item without updating the state
 * @param key the entry key
 * @param fallbackValue fallback value for when the item isn't available
 */

function useLocalStorage<V extends string | number | object = string>(
    key: string | null,
    fallbackValue: V
) {
    const [value, setValue] = useState<V>(getValue(key, fallbackValue));
    useLocalStorageSubscribe(key, fallbackValue, setValue);

    const _set = useCallback(
        (v: V, passive?: boolean) => {
            if (!key) throw "Null key";
            setLocalStorageItem(key, v, passive);
        },
        [key]
    );
    const set = useCallbackSetter(value, _set);

    const remove = useCallback(
        (passive?: boolean) => {
            if (!key) return;
            removeLocalStorageItem(key, passive);
        },
        [key]
    );

    useUpdateLayoutEffect(() => {
        throw "Update of key is not supported";
    }, [key]);

    return [value, set, remove] as const;
}

export default useLocalStorage;
