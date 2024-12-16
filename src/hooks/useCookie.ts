import { useCallback } from "react";
import { useCookies } from "react-cookie";

/**
 * Single cookie (to be used inside the respective context)
 * @param cookieName the cookie key
 * @param fallbackValue fallback value for when the cookie's value isn't yet set
 * @returns res: useCookies()'s value or fallback, actualSet, actualRemove are wrappers for only changing specific cookie
 */
const useCookie = <V extends string | number = string>(
    cookieName: string,
    fallbackValue: V
) => {
    const [value, set, remove] = useCookies<string, { [K in string]: V }>([
        cookieName,
    ]);

    const actualSet = useCallback((v: V) => set(cookieName, v), []);
    const actualRemove = useCallback(() => remove(cookieName), []);

    const res = value?.[cookieName] || fallbackValue;

    return [res, actualSet, actualRemove] as const;
};

export default useCookie;
