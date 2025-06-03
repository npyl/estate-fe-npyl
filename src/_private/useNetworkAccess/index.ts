import { useCallback, useRef } from "react";
import useIntervalControl from "./useIntervalControl";

const POLLING = {
    DISABLED: 0,
    RAPID: 1000,
    DEFAULT: 30 * 1000, // 30 sec
};

// ---------------------------------------------------------------------

const ping = async () => {
    try {
        const res = await fetch("https://www.google.com", {
            method: "HEAD",
            mode: "no-cors",
            cache: "no-cache",
            signal: AbortSignal.timeout(POLLING.RAPID),
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

// ---------------------------------------------------------------------

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

    const onChange = useCallback(async () => {
        const c = await checkConnectivity();

        // INFO: do not refire event if not necessary
        if (status.current === c) return;

        status.current = c;
        _onChange?.(c);
    }, [_onChange]);

    const { stop, reset } = useIntervalControl(
        options?.checkInterval ?? POLLING.DEFAULT,
        onChange
    );

    return [status, { stop, reset }] as const;
};

export { POLLING };
export default useNetworkAccess;
