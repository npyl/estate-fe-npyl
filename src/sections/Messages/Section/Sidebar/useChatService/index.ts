import { useLayoutEffect } from "react";
import useDialog from "@/hooks/useDialog";
import socket from "./socket";

// ------------------------------------------------------------------------------

const useChatService = () => {
    const [isConnected, setConnected, unsetConnected] = useDialog();

    useLayoutEffect(() => {
        socket?.on("connect", setConnected);
        socket?.on("disconnect", unsetConnected);

        socket?.connect();

        return () => {
            socket?.off("connect");
            socket?.off("disconnect");

            socket?.disconnect();
        };
    }, []);

    return { isConnected };
};

export default useChatService;
