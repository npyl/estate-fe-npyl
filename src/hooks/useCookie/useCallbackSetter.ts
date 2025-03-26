import { useCallback } from "react";

/**
 * Creates a setter function that supports both direct value assignment and callback-based updates
 * similar to React's useState setter.
 *
 * @param getValue Function that returns the current value
 * @param setValue Function that sets the new value
 * @returns A setter function that accepts either a new value or an updater function
 */
const useCallbackSetter = <T>(
    getValue: () => T,
    setValue: (value: T) => void
) =>
    useCallback(
        (valueOrCb: T | ((prev: T) => T)) => {
            if (typeof valueOrCb === "function") {
                const currentValue = getValue();
                const newValue = (valueOrCb as (prev: T) => T)(currentValue);
                setValue(newValue);
            } else {
                setValue(valueOrCb);
            }
        },
        [getValue, setValue]
    );

export default useCallbackSetter;
