import useNetworkAccess from "@/_private/useNetworkAccess";
import { infoToast } from "@/components/Toaster";
import { useCallback } from "react";

const NetworkListener = () => {
    const onChange = useCallback((online: boolean) => {
        const text0 = online ? "Online0" : "Offline0";
        const text1 = online ? "Online1" : "Offline1";

        infoToast(text0, text1);
    }, []);

    useNetworkAccess(onChange);

    return null;
};

export default NetworkListener;
