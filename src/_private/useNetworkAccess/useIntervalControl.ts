import { useCallback, useLayoutEffect, useRef } from "react";

const useIntervalControl = (
    initialInterval: number,
    cb: (...args: any) => any
) => {
    const interval = useRef<number>(initialInterval);
    const intervalRef = useRef<number>();

    const start = useCallback(() => {
        if (!interval.current) return;
        intervalRef.current = setInterval(cb, interval.current);
    }, [cb]);

    const stop = useCallback(() => {
        if (!intervalRef.current) return;
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
    }, []);

    const reset = useCallback(
        (n?: number) => {
            stop();
            interval.current = n ?? initialInterval;
            start();
        },
        [initialInterval]
    );

    useLayoutEffect(() => {
        start();
        return () => {
            stop();
        };
    }, []);

    return { start, stop, reset };
};

export default useIntervalControl;
