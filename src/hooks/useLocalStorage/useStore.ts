import debugLog from "@/_private/debugLog";
import JSONParseSafe from "@/utils/JSONParseSafe";
import { useCallback, useLayoutEffect, useState } from "react";

type AnyType = string | number | object;

const getValue = <V extends AnyType = string>(
    key: string | null,
    fallbackValue: V
) => {
    if (typeof globalThis.window === "undefined") return fallbackValue;
    if (!key) return fallbackValue;

    const v = localStorage.getItem(key);
    if (!v) return fallbackValue;

    const parsed = JSONParseSafe<V>(v);
    if (!parsed) return fallbackValue;

    return parsed;
};

function dispatchStorageEvent(key: string, newValue: string | null) {
    globalThis.window.dispatchEvent(
        new StorageEvent("storage", { key, newValue })
    );
}

// ----------------------------------------------------------------------------------

const setLocalStorageItem = <V extends string | number | object = string>(
    key: string,
    value: V,
    passive?: boolean
) => {
    try {
        const stringifiedValue = JSON.stringify(value);
        globalThis.window.localStorage.setItem(key, stringifiedValue);

        if (passive) return;
        dispatchStorageEvent(key, stringifiedValue);
    } catch (ex) {
        debugLog(ex);
    }
};

const removeLocalStorageItem = (key: string, passive?: boolean) => {
    globalThis.window.localStorage.removeItem(key);

    if (passive) return;
    dispatchStorageEvent(key, null);
};

// ----------------------------------------------------------------------------------

const useLocalStorageSubscribe = <V extends AnyType = object>(
    key: string | null,
    fallbackValue: V,
    onChange: (v: V) => void
) => {
    const cb = useCallback(
        (e: StorageEventInit) => {
            if (!key) return;
            if (e.key !== key) return;

            const v = e?.newValue
                ? (JSONParseSafe<V>(e.newValue) ?? fallbackValue)
                : fallbackValue;

            onChange(v);
        },
        [key, fallbackValue, onChange]
    );

    useLayoutEffect(() => {
        globalThis.window.addEventListener("storage", cb);
        return () => {
            globalThis.window.removeEventListener("storage", cb);
        };
    }, [cb]);
};

// ----------------------------------------------------------------------------------

const useStore = <V extends string | number | object = string>(
    key: string | null,
    fallbackValue: V
) => {
    const [value, setValue] = useState<V>(getValue(key, fallbackValue));
    useLocalStorageSubscribe(key, fallbackValue, setValue);

    /**
     * @param passive Do a set/remove on the localStorage item without updating the state
     */
    const set = useCallback(
        (v: V, passive?: boolean) => {
            if (!key) throw new Error("Null key");
            setLocalStorageItem(key, v, passive);
        },
        [key]
    );

    /**
     * @param passive Do a set/remove on the localStorage item without updating the state
     */
    const remove = useCallback(
        (passive?: boolean) => {
            if (!key) return;
            removeLocalStorageItem(key, passive);
        },
        [key]
    );

    return [value, set, remove] as const;
};

export default useStore;
