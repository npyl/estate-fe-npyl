import { useCallback, useMemo, useRef } from "react";
import { useCookies } from "react-cookie";
import useCallbackSetter from "./useCallbackSetter";

const getOneYearFromNow = () =>
    new Date(new Date().setFullYear(new Date().getFullYear() + 1));

const LIBRARY_OPTIONS = {
    doNotParse: false /* Always use JSON parser */,
    doNotUpdate: false /* Always update state after set/remove */,
};

const OPTIONS = {
    sameSite: "strict",
    secure: true,
    path: "/",
    expires: getOneYearFromNow(),
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

    const [_value, _set, remove] = useCookies<string, { [K in string]: V }>(
        names,
        LIBRARY_OPTIONS
    );

    const value = useMemo(() => {
        try {
            if (!cookieName) throw "Null cookieName";

            const v = _value?.[cookieName];
            if (!v) throw "Undefined";

            return v;
        } catch (ex) {
            return fallbackValue;
        }
    }, [cookieName, _value, fallbackValue]);

    //
    //  Set
    //
    const set = useCallback(
        (v: V) => {
            if (!cookieName) return;
            _set(cookieName, v, OPTIONS);
        },
        [cookieName, _set]
    );
    const actualSet = useCallbackSetter<V>(value, set);

    //
    //  Remove
    //
    const actualRemove = useCallback(() => {
        if (!cookieName) return;
        remove(cookieName, OPTIONS);
    }, [cookieName, remove]);

    return [value, actualSet, actualRemove] as const;
};

export default useCookie;
