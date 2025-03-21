import debugLog from "@/_private/debugLog";
import { useCallback, useLayoutEffect, useState } from "react";

/**
 * @param key the entry key
 * @param fallbackValue fallback value for when the item isn't available
 */
const useLocalStorage = <V extends string | number | object = string>(
    key: string | null,
    fallbackValue: V
) => {
    const [value, setValue] = useState<V>(fallbackValue);

    useLayoutEffect(() => {
        if (!key) {
            setValue(fallbackValue);
            return;
        }

        const v = localStorage.getItem(key);
        if (!v) {
            setValue(fallbackValue);
            return;
        }

        const parsed = JSON.parseSafe<V>(v);
        if (!parsed) {
            setValue(fallbackValue);
            return;
        }

        setValue(parsed);
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
