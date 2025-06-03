import { useCallback, useLayoutEffect, useRef } from "react";

const INTERVAL = 30 * 1000; // 30sec (in ms)
const INSTANT = 1000;

const ping = async () => {
    try {
        const res = await fetch("https://www.google.com", {
            method: "HEAD",
            mode: "no-cors",
            cache: "no-cache",
            signal: AbortSignal.timeout(INSTANT),
        });

        return res.type === "opaque"; // INFO: this is an opaque response; check if we got any
    } catch (ex) {
        return false;
    }
};

const checkConnectivity = async () => {
    const res = await ping();

    // INFO: if a ping fails, run 3 pings to be sure
    if (!res) {
        const all = await Promise.all([ping(), ping(), ping()]);
        return all.some(Boolean);
    }

    return true;
};

interface UseNetworkAccessOptions {
    /**
     * Interval in milliseconds for periodic connectivity checks.
     * Set to 0 or null to disable periodic checks.
     * @default 30000 (30 seconds)
     */
    checkInterval?: number;
}

const useNetworkAccess = (
    _onChange?: (b: boolean) => void,
    options?: UseNetworkAccessOptions
) => {
    const status = useRef(true);

    const interval = useRef<number>(options?.checkInterval ?? INTERVAL);
    const intervalRef = useRef<NodeJS.Timeout>();

    const onChange = useCallback(async () => {
        const c = await checkConnectivity();

        // INFO: do not refire event if not necessary
        if (status.current === c) return;

        status.current = c;
        _onChange?.(c);
    }, [_onChange]);

    const start = useCallback(() => {
        if (!interval.current) return;
        intervalRef.current = setInterval(onChange, interval.current);
    }, [onChange]);

    const stop = useCallback(() => {
        if (!intervalRef.current) return;
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
    }, []);

    const reset = useCallback((n?: number) => {
        stop();
        interval.current = n ?? INTERVAL;
        start();
    }, []);

    useLayoutEffect(() => {
        start();
        return () => {
            stop();
        };
    }, []);

    return [status, stop, reset] as const;
};

export default useNetworkAccess;
