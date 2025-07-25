import { useCallback, useMemo } from "react";

type TVersioned<V> = {
    version: number;
    content: V;
};

type UseStore<V extends string | number | object = string> = (
    key: string | null,
    fallbackValue: V
) => readonly [V, (v: V, ...rest: any) => void, (...rest: any) => void];

const useVersioned = <V extends string | number | object = string>(
    key: string | null,
    fallbackValue: V,
    version: number,
    useStore: UseStore<TVersioned<V>>
) => {
    const [_value, _set, remove] = useStore(key, {
        version,
        content: fallbackValue,
    });

    const value = useMemo(() => {
        if (_value.version !== version) return fallbackValue;
        return _value.content;
    }, [_value.version, _value.content, version]);

    const set = useCallback(
        (content: V, ...args: any[]) => _set({ version, content }, ...args),
        [_set, version]
    );

    return [value, set, remove] as const;
};

export default useVersioned;
