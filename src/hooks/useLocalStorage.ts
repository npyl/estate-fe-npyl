import debugLog from "@/_private/debugLog";
import { useCallback, useSyncExternalStore } from "react";
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

const getLocalStorageItem = (key: string) => {
    return window.localStorage.getItem(key);
};

const removeLocalStorageItem = (key: string, passive?: boolean) => {
    window.localStorage.removeItem(key);
    if (passive) return;
    dispatchStorageEvent(key, null);
};

const useLocalStorageSubscribe = (callback: VoidFunction) => {
    window.addEventListener("storage", callback);
    return () => window.removeEventListener("storage", callback);
};

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
    const getSnapshot = () => (key ? getLocalStorageItem(key) : null);

    const store = useSyncExternalStore(useLocalStorageSubscribe, getSnapshot);

    const _set = useCallback(
        (v: V, passive?: boolean) => {
            if (!key) throw "Null key";
            setLocalStorageItem(key, v, passive);
        },
        [key]
    );
    const set = useCallbackSetter(getValue(key, fallbackValue), _set);

    const remove = useCallback(
        (passive?: boolean) => {
            if (!key) return;
            removeLocalStorageItem(key, passive);
        },
        [key]
    );

    useUpdateLayoutEffect(() => {
        if (!key) return;
        setLocalStorageItem(key, fallbackValue);
    }, [key, fallbackValue]);

    return [
        store ? JSON.parseSafe<V>(store) || fallbackValue : fallbackValue,
        set,
        remove,
    ] as const;
}

export default useLocalStorage;
