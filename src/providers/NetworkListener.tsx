import { infoToast } from "@/components/Toaster";
import { useCallback, useLayoutEffect } from "react";

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

const NetworkListener = () => {
    const onChange = useCallback(async () => {
        const online = await checkConnectivity();
        infoToast(online ? "Online" : "Offline");
    }, []);

    useLayoutEffect(() => {
        // INFO: check if available
        if (!("connection" in navigator)) return;

        // INFO: types are not available yet; experimental API
        const n = navigator.connection as any;

        n.addEventListener("change", onChange);

        return () => {
            n.removeEventListener("change", onChange);
        };
    }, []);

    return null;
};

export default NetworkListener;
