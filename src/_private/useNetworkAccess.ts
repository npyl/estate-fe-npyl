import { useCallback, useLayoutEffect, useRef } from "react";

const checkConnectivity = async () => {
    try {
        await fetch("https://www.google.com", {
            method: "HEAD",
            mode: "no-cors",
            cache: "no-cache",
            signal: AbortSignal.timeout(5000),
        });

        return true;
    } catch {
        return false;
    }
};

const useNetworkAccess = (_onChange: (b: boolean) => void) => {
    const status = useRef(true);

    const onOffline = useCallback(() => _onChange(false), [_onChange]);

    const onChange = useCallback(async () => {
        const c = await checkConnectivity();
        _onChange(c);
    }, [_onChange]);

    useLayoutEffect(() => {
        window.addEventListener("online", onChange);
        window.addEventListener("offline", onOffline);

        // INFO: check if available
        if ("connection" in navigator) {
            // INFO: types are not available yet; experimental API
            const n = navigator.connection as any;
            n.addEventListener("change", onChange);
        }

        return () => {
            // INFO: check if available
            if ("connection" in navigator) {
                // INFO: types are not available yet; experimental API
                const n = navigator.connection as any;
                n.removeEventListener("change", onChange);
            }

            window.removeEventListener("online", onChange);
            window.removeEventListener("offline", onOffline);
        };
    }, [onChange, onOffline]);

    return status;
};

export default useNetworkAccess;
