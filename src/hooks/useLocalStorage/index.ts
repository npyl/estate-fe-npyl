import useCallbackSetter from "@/hooks/useCallbackSetter";
import useUpdateLayoutEffect from "@/hooks/useUpdateLayoutEffect";
import useStore from "./useStore";
import useVersioned from "@/hooks/useVersioned";

/**
 * Access to localStorage
 *
 * @param key the entry key
 * @param fallbackValue fallback value for when the item isn't available
 */
function useLocalStorage<V extends string | number | object = string>(
    key: string | null,
    fallbackValue: V,
    version: number = 1
) {
    const [value, _set, remove] = useVersioned<V>(
        key,
        fallbackValue,
        version,
        useStore
    );

    const set = useCallbackSetter(value, _set);

    useUpdateLayoutEffect(() => {
        throw "Update of key is not supported";
    }, [key]);

    return [value, set, remove] as const;
}

export default useLocalStorage;
