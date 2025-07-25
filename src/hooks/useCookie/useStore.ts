import { useCallback, useMemo } from "react";
import { useCookies } from "react-cookie";

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

const useStore = <V extends string | number | object = string>(
    cookieName: string | null,
    fallbackValue: V
) => {
    const names = cookieName ? [cookieName] : [];

    const [_value, _set, _remove] = useCookies<string, { [K in string]: V }>(
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

    const set = useCallback(
        (v: V) => {
            if (!cookieName) return;
            _set(cookieName, v, OPTIONS);
        },
        [cookieName, _set]
    );

    const remove = useCallback(() => {
        if (!cookieName) return;
        _remove(cookieName, OPTIONS);
    }, [cookieName, _remove]);

    return [value, set, remove] as const;
};

export default useStore;
