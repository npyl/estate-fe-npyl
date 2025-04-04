import { useCallback, useRef, useState } from "react";

const useExclusivePopper = <T0, T1>(
    initial0: T0 | undefined,
    initial1: T1 | undefined
) => {
    const anchorRef = useRef<HTMLDivElement>();
    const anchorEl = anchorRef.current;

    const [state0, setState0] = useState<T0 | undefined>(initial0);
    const [state1, setState1] = useState<T1 | undefined>(initial1);

    const close = useCallback(() => {
        setState0(initial0);
        setState1(initial1);
    }, []);

    const set0 = useCallback((el: HTMLDivElement, v: T0) => {
        anchorRef.current = el;
        close();
        setState0(v);
    }, []);

    const set1 = useCallback((el: HTMLDivElement, v: T1) => {
        anchorRef.current = el;
        close();
        setState1(v);
    }, []);

    return [
        anchorEl,
        // ...
        state0,
        state1,
        // ...
        set0,
        set1,
        // ...
        close,
    ] as const;
};

export default useExclusivePopper;
