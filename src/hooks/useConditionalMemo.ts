import { useMemo, useRef } from "react";

export const useConditionalMemo = (
    callback: () => number,
    condition: (value: number) => boolean, // condition to accept new value
    dependencies: any[]
) => {
    const value = useRef(0);
    const newValue = useMemo(callback, dependencies);

    // Update ONLY if condition is true
    if (condition(newValue)) value.current = newValue;

    return value.current;
};
