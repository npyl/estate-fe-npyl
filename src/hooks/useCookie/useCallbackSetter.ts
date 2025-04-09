import { useCallback, useRef } from "react";

/**
 * Creates a setter function that supports both direct value assignment and callback-based updates
 * similar to React's useState setter.
 *
 * TODO: update for multiple updates? e.g.:
 * () => {
 *      set(value);
 *      set((old) => `${old} something`);
 * }
 *
 * @param getValue Function that returns the current value
 * @param setValue Function that sets the new value
 * @returns A setter function that accepts either a new value or an updater function
 */
const useCallbackSetter = <T>(
    initialValue: T,
    _setValue: (value: T) => void
) => {
    const valueRef = useRef<T>(initialValue);
    const getCurrentValue = useCallback(() => valueRef.current, []);
    const setValue = useCallback(
        (v: T) => {
            valueRef.current = v;
            _setValue(v);
        },
        [_setValue]
    );

    return useCallback(
        (valueOrCb: T | ((prev: T) => T)) => {
            if (typeof valueOrCb === "function") {
                const currentValue = getCurrentValue();
                const newValue = (valueOrCb as (prev: T) => T)(currentValue);
                setValue(newValue);
            } else {
                setValue(valueOrCb);
            }
        },
        [setValue]
    );
};

export default useCallbackSetter;
