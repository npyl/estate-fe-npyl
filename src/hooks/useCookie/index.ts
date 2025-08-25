import useCallbackSetter from "@/hooks/useCallbackSetter";
import useStore from "./useStore";
import useVersioned from "@/hooks/useVersioned";

/**
 * Single cookie (to be used inside the respective context)
 * @param cookieName the cookie key
 * @param fallbackValue fallback value for when the cookie's value isn't yet set
 * @returns res: useCookies()'s value or fallback, actualSet, actualRemove are wrappers for only changing specific cookie
 */
const useCookie = <V extends string | number | object = string>(
    cookieName: string | null,
    fallbackValue: V,
    version: number = 1
) => {
    const [value, _set, remove] = useVersioned<V>(
        cookieName,
        fallbackValue,
        version,
        useStore
    );
    const set = useCallbackSetter<V>(value, _set);
    return [value, set, remove] as const;
};

export default useCookie;
