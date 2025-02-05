import { useCallback } from "react";
import { useCookies } from "react-cookie";

const LIBRARY_OPTIONS = {
    doNotParse: false /* Make sure we always use JSON parser */,
};

// TODO: when we get to HTTPS this should be generalised to secure & strict
const isSecure = process.env.NEXT_PUBLIC_SAFE_COOKIES === "1";

const OPTIONS = {
    sameSite: isSecure ? "strict" : "lax",
    secure: isSecure,
} as const;

/**
 * Single cookie (to be used inside the respective context)
 * @param cookieName the cookie key
 * @param fallbackValue fallback value for when the cookie's value isn't yet set
 * @returns res: useCookies()'s value or fallback, actualSet, actualRemove are wrappers for only changing specific cookie
 */
const useCookie = <V extends string | number | object = string>(
    cookieName: string,
    fallbackValue: V
) => {
    const [value, set, remove] = useCookies<string, { [K in string]: V }>(
        [cookieName],
        LIBRARY_OPTIONS
    );

    const actualSet = useCallback((v: V) => set(cookieName, v, OPTIONS), []);
    const actualRemove = useCallback(() => remove(cookieName, OPTIONS), []);

    const res = value?.[cookieName] || fallbackValue;

    return [res, actualSet, actualRemove] as const;
};

export default useCookie;
