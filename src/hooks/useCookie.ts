import { useCallback, useMemo } from "react";
import { useCookies } from "react-cookie";

const LIBRARY_OPTIONS = {
    doNotParse: false /* Always use JSON parser */,
    doNotUpdate: false /* Always update state after set/remove */,
};

const OPTIONS = {
    sameSite: "strict",
    secure: true,
    path: "/",
} as const;

/**
 * Single cookie (to be used inside the respective context)
 * @param cookieName the cookie key
 * @param fallbackValue fallback value for when the cookie's value isn't yet set
 * @returns res: useCookies()'s value or fallback, actualSet, actualRemove are wrappers for only changing specific cookie
 */
const useCookie = <V extends string | number | object = string>(
    cookieName: string | null,
    fallbackValue: V
) => {
    const names = cookieName ? [cookieName] : [];

    const [value, set, remove] = useCookies<string, { [K in string]: V }>(
        names,
        LIBRARY_OPTIONS
    );

    const actualSet = useCallback(
        (v: V) => {
            if (!cookieName) return;
            set(cookieName, v, OPTIONS);
        },
        [cookieName, set]
    );
    const actualRemove = useCallback(() => {
        if (!cookieName) return;
        remove(cookieName, OPTIONS);
    }, [cookieName, remove]);

    const res = useMemo(() => {
        try {
            if (!cookieName) throw "Null cookieName";

            const v = value?.[cookieName];
            if (!v) throw "Undefined";

            return v;
        } catch (ex) {
            return fallbackValue;
        }
    }, [cookieName, value]);

    return [res, actualSet, actualRemove] as const;
};

export default useCookie;
