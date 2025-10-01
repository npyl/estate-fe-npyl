import { useCallback, useRef } from "react";

/**
 * A wrapper around window.(timeout-related) methods
 * @param CHANGE_DELAY
 */
const useTimeout = (CHANGE_DELAY: number) => {
    const t = useRef<number>();
    const clear = useCallback(() => {
        if (!t.current) return;
        window.clearTimeout(t.current);
        t.current = undefined;
    }, []);
    const set = useCallback((onTimeout: VoidFunction) => {
        t.current = window.setTimeout(onTimeout, CHANGE_DELAY);
    }, []);
    return { set, clear };
};

/**
 * Wrap a callback in a timeout clear-set "block" so that when the callback stops getting called (e.g. during typing) an onStop callback is called
 * @param cb
 * @param onStop
 * @param CHANGE_DELAY
 */
const useWaitForStop = <T extends (...args: any[]) => any>(
    cb: T,
    onStop: (res: ReturnType<T>) => VoidFunction,
    CHANGE_DELAY: number
) => {
    const { clear, set } = useTimeout(CHANGE_DELAY);
    return useCallback((...args: Parameters<T>) => {
        clear();
        const res = cb(...args);
        set(onStop(res));
    }, []);
};

export default useWaitForStop;
