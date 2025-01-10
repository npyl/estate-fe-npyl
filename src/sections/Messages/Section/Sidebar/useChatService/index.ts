import { useCallback, useLayoutEffect } from "react";
import useDialog from "@/hooks/useDialog";
import socket from "./socket";
import { IMessageReq, IMessageRes } from "@/types/messages";

// ------------------------------------------------------------------------------

interface Options {
    onMessage: (m: IMessageRes) => void;
}

const useChatService = ({ onMessage }: Partial<Options> | undefined = {}) => {
    const [isConnected, setConnected, unsetConnected] = useDialog();

    useLayoutEffect(() => {
        if (!socket) return;

        socket.on("connect", setConnected);
        socket.on("disconnect", unsetConnected);

        socket.connect();

        return () => {
            if (!socket) return;

            socket.off("connect");
            socket.off("disconnect");

            socket.disconnect();
        };
    }, []);

    const sendMessage = useCallback((m: IMessageReq) => {
        if (!socket) return;
        socket.send("message:send", m);
    }, []);

    useLayoutEffect(() => {
        if (!socket) return;
        if (!onMessage) return;

        socket.on("message:received", onMessage);

        return () => {
            if (!socket) return;

            socket.off("message:received", onMessage);
        };
    }, [onMessage]);

    return { isConnected, sendMessage };
};

export default useChatService;
