import { useCallback, useLayoutEffect } from "react";
import useDialog from "@/hooks/useDialog";
import { IMessageReq } from "@/types/messages";
import socket from "./socket";

// ------------------------------------------------------------------------------

const EVENTS = {
    MESSAGE_RECEIVED: "message:received",
    USER_TYPING_STARTED: "user:typing",
    USER_TYPING_STOPPED: "user:typing:stop",
};

// ------------------------------------------------------------------------------

const applyListener = (
    ev: (typeof EVENTS)[keyof typeof EVENTS],
    cb?: (...args: any) => any
) => {
    if (!socket) return;
    if (!cb) return;

    socket.on(ev, cb);
};

const removeListener = (
    ev: (typeof EVENTS)[keyof typeof EVENTS],
    cb?: (...args: any) => any
) => {
    if (!socket) return;
    if (!cb) return;

    socket.off(ev, cb);
};

type TApplyListenerCb = typeof applyListener;
type TRemoveListenerCb = typeof removeListener;

// ------------------------------------------------------------------------------

type TChatServiceInitCb = (
    cb0: TApplyListenerCb,
    cb1: TRemoveListenerCb
) => VoidFunction | undefined;

const useChatService = (cb?: TChatServiceInitCb) => {
    const [isConnected, setConnected, unsetConnected] = useDialog();

    useLayoutEffect(() => {
        if (!socket) throw new Error("Socket is not available!");

        socket.on("connect", setConnected);
        socket.on("disconnect", unsetConnected);

        socket.connect();

        const onUnmount = cb?.(applyListener, removeListener);

        return () => {
            if (!socket) return;

            onUnmount?.();

            socket.off("connect");
            socket.off("disconnect");

            socket.disconnect();
        };
    }, [cb]);

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
        isConnected,
        // ...
        sendMessage,
        // ...
        sendStartedTyping,
        sendStoppedTyping,
    };
};

export { EVENTS };
export type { TChatServiceInitCb };
export default useChatService;
