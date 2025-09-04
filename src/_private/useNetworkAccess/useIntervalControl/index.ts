import { useCallback, useLayoutEffect, useRef } from "react";

const useIntervalControl = (
    initialInterval: number,
    cb: (...args: any) => any
) => {
    const interval = useRef<number>(initialInterval);
    const intervalRef = useRef<number>();

    const start = useCallback(() => {
        if (intervalRef.current) return;
        intervalRef.current = setInterval(cb, interval.current);
    }, [cb]);

    const stop = useCallback(() => {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
    }, []);

    const reset = useCallback(
        (n?: number) => {
            const i = n ?? initialInterval;

            stop();
            interval.current = i;
            start();

            // INFO: return actual interval chosen through our internal logic (for debugging)
            return i;
        },
        [initialInterval, start]
    );

    useLayoutEffect(() => {
        stop();
        start();
        return () => {
            stop();
        };
    }, [start]);

    return { start, stop, reset };
};

export default useIntervalControl;
