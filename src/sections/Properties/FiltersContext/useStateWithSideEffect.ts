import { useState, useCallback, Dispatch, SetStateAction, useRef } from "react";

/**
 * Calculates the next state value based on the input and current state.
 * Handles both direct value updates and function-based updater patterns.
 *
 * @param input - Either a new state value or a function that produces a new state from the old state
 * @param old - The current state value
 * @returns The calculated next state value
 *
 * @example
 * // Direct value update
 * const nextState = calculateNext(5, 10); // Returns 5
 *
 * // Function update
 * const nextState = calculateNext(n => n + 1, 10); // Returns 11
 */
const calculateNext = <T>(input: SetStateAction<T>, old: T) =>
    typeof input === "function" ? (input as (old: T) => T)(old) : input;

/**
 * A custom hook based on useState that runs a callback after state update
 *
 * @param initial The initial state value
 * @param onUpdate Callback
 * @returns A tuple containing the state and an enhanced setState function
 */
function useStateWithEffect<T>(
    initial: T | (() => T),
    onUpdate: (next: T) => void
): [T, Dispatch<SetStateAction<T>>] {
    const [state, _setState] = useState<T>(initial);
    const next = useRef<T>();

    const setStateEnhanced: Dispatch<SetStateAction<T>> = useCallback(
        (input) => {
            _setState((old) => {
                next.current = calculateNext(input, old);
                return next.current;
            });

            onUpdate(next.current!);
        },
        [onUpdate]
    );

    return [state, setStateEnhanced] as const;
}

export default useStateWithEffect;
