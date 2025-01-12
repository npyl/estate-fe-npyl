import { useCallback, useLayoutEffect } from "react";
import useDialog from "@/hooks/useDialog";
import { IMessageReq } from "@/types/messages";
import socket from "./socket";
import { Socket } from "socket.io-client";

// ------------------------------------------------------------------------------

const EVENTS = {
    MESSAGE_RECEIVED: "message:received",
    USER_TYPING_STARTED: "user:typing",
    USER_TYPING_STOPPED: "user:typing:stop",
};

// ------------------------------------------------------------------------------

export interface DefaultEventsMap {
    [event: string]: (...args: any[]) => void;
}

export const useApplyListener = (
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
    ev: (typeof EVENTS)[keyof typeof EVENTS],
    cb?: (...args: any) => any
) => {
    useLayoutEffect(() => {
        if (!socket) return;
        if (!cb) return;

        socket.on(ev, cb);

        return () => {
            if (!socket) return;

            socket.off(ev, cb);
        };
    }, [cb]);
};

// ------------------------------------------------------------------------------

const useChatService = () => {
    const [isConnected, setConnected, unsetConnected] = useDialog();

    useLayoutEffect(() => {
        if (!socket) throw new Error("Socket is not available!");

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

    //
    // ---------------------------------------------------------------
    //

    const sendMessage = useCallback((m: IMessageReq) => {
        if (!socket) return;
        socket.emit("message:send", m);
    }, []);

    const sendStartedTyping = useCallback((conversationId: string) => {
        if (!socket) return;
        socket.emit("typing:start", conversationId);
    }, []);
    const sendStoppedTyping = useCallback((conversationId: string) => {
        if (!socket) return;
        socket.emit("typing:stop", conversationId);
    }, []);

    return {
        socket: socket!,
        // ...
        isConnected,
        // ...
        sendMessage,
        // ...
        sendStartedTyping,
        sendStoppedTyping,
    };
};

export { EVENTS };
export default useChatService;
