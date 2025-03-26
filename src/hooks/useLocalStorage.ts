import debugLog from "@/_private/debugLog";
import { useCallback, useState } from "react";
import useUpdateLayoutEffect from "@/hooks/useUpdateLayoutEffect";

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

/**
 * Access to localStorage
 *
 * @param passive Do a set/remove on the localStorage item without updating the state
 *
 * TODO:
 *  - Add events
 *  - Maybe a provider?
 *
 * @param key the entry key
 * @param fallbackValue fallback value for when the item isn't available
 */
const useLocalStorage = <V extends string | number | object = string>(
    key: string | null,
    fallbackValue: V
) => {
    const [value, setValue] = useState<V>(getValue(key, fallbackValue));

    useUpdateLayoutEffect(() => {
        if (!key || !fallbackValue) return;
        setValue(getValue(key, fallbackValue));
    }, [key, fallbackValue]);

    const set = useCallback(
        (v: V, passive?: boolean) => {
            try {
                if (!key) throw "Null key";
                localStorage.setItem(key, JSON.stringify(v));

                if (passive) return;
                setValue(v);
            } catch (ex) {
                debugLog(ex);
            }
        },
        [key]
    );

    const remove = useCallback(
        (passive?: boolean) => {
            if (!key) return;
            localStorage.removeItem(key);

            if (passive) return;
            setValue(fallbackValue);
        },
        [key, fallbackValue]
    );

    return [value, set, remove] as const;
};

export default useLocalStorage;
