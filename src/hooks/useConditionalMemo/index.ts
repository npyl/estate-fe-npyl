import { useMemo, useRef } from "react";

const useConditionalMemo = (
    callback: () => number,
    condition: (value: number) => boolean, // condition to accept new value
    dependencies: any[]
) => {
    const newValue = useMemo(callback, dependencies);
    const value = useRef(newValue);

    // Update ONLY if condition is true
    if (condition(newValue)) value.current = newValue;

    return value.current;
};

export default useConditionalMemo;
