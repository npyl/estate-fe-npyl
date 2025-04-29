import { useCallback, useRef } from "react";
import useUpdateLayoutEffect from "@/hooks/useUpdateLayoutEffect";

/**
 * Creates a setter function that supports both direct value assignment and callback-based updates
 * similar to React's useState setter, with optional additional arguments.
 *
 * @param initialValue Initial value for the setter
 * @param _setValue Function that sets the new value, with support for additional arguments
 * @returns A setter function that accepts either a new value or an updater function, plus optional additional arguments
 */
const useCallbackSetter = <T, Args extends any[] = any[]>(
    initialValue: T,
    _setValue: (value: T, ...args: Args) => void
) => {
    const lock = useRef(false);

    const valueRef = useRef<T>(initialValue);
    const getCurrentValue = useCallback(() => valueRef.current, []);
    const setValue = useCallback(
        (v: T, ...args: Args) => {
            lock.current = true;
            valueRef.current = v;
            _setValue(v, ...args);
        },
        [_setValue]
    );

    useUpdateLayoutEffect(() => {
        if (lock.current) {
            lock.current = false;
            return;
        }

        valueRef.current = initialValue;
    }, [initialValue]);

    return useCallback(
        (valueOrCb: T | ((prev: T) => T), ...args: Args) => {
            if (typeof valueOrCb === "function") {
                const currentValue = getCurrentValue();
                const newValue = (valueOrCb as (prev: T) => T)(currentValue);
                setValue(newValue, ...args);
            } else {
                setValue(valueOrCb, ...args);
            }
        },
        [setValue]
    );
};

export default useCallbackSetter;
