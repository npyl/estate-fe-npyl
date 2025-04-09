import { useCallback, useRef } from "react";

/**
 * Creates a setter function that supports both direct value assignment and callback-based updates
 * similar to React's useState setter, but ensures that multiple sequential updates in the same
 * call stack operate on the same initial value.
 *
 * @param initialValue The initial value to store
 * @param _setValue Function that sets the new value externally (e.g. state setter)
 * @returns A setter function that accepts either a new value or an updater function
 */
const useCallbackSetter = <T>(
    initialValue: T,
    _setValue: (value: T) => void
) => {
    const valueRef = useRef<T>(initialValue);

    const isBatchingRef = useRef<boolean>(false);
    const originalValueRef = useRef<T | null>(null);
    const finalValueRef = useRef<T | null>(null);

    const flushBatch = useCallback(() => {
        if (isBatchingRef.current && finalValueRef.current !== null) {
            valueRef.current = finalValueRef.current;
            _setValue(finalValueRef.current);

            // Reset batching state
            isBatchingRef.current = false;
            originalValueRef.current = null;
            finalValueRef.current = null;
        }
    }, [_setValue]);

    const setter = useCallback(
        (valueOrCb: T | ((prev: T) => T)) => {
            // Start a new batch if not already batching
            if (!isBatchingRef.current) {
                isBatchingRef.current = true;
                originalValueRef.current = valueRef.current;
                finalValueRef.current = valueRef.current;
            }

            // Calculate the new value based on the original value at batch start
            if (typeof valueOrCb === "function") {
                const updater = valueOrCb as (prev: T) => T;
                // Always use the original value at the start of the batch for callbacks
                const newValue = updater(originalValueRef.current as T);
                finalValueRef.current = newValue;
            } else {
                // Direct value assignment
                finalValueRef.current = valueOrCb;
            }

            // Schedule a microtask to flush the batch
            Promise.resolve().then(flushBatch);

            return finalValueRef.current;
        },
        [flushBatch]
    );

    return setter;
};

export default useCallbackSetter;
