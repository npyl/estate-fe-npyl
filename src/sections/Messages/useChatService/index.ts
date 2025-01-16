import { useCallback, useLayoutEffect } from "react";
import useDialog from "@/hooks/useDialog";
import { IMessageReq } from "@/types/messages";
import socket from "./socket";
import sleep from "@/utils/sleep";

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

// INFO: this implements something like the equivalent of a refcount; used to prevent socket disconnect before executing unmount code

declare global {
    // eslint-disable-next-line no-var
    var chatUsers: number;
}

const incrementUsers = () => {
    globalThis.chatUsers = (globalThis.chatUsers ?? 0) + 1;
};

const decrementUsers = () => {
    globalThis.chatUsers = (globalThis.chatUsers ?? 1) - 1;
    return globalThis.chatUsers;
};

// ------------------------------------------------------------------------------

/**
 * Wait 2 sec before disconnecting the socket
 */
const safeDisconnect = async () => {
    if (!socket) return;
    await sleep(2000);
    socket.disconnect();
};

// ------------------------------------------------------------------------------

type TChatServiceInitCb = (
    cb0: TApplyListenerCb,
    cb1: TRemoveListenerCb
) => VoidFunction | undefined;

const useChatService = (cb?: TChatServiceInitCb) => {
    const [isConnected, setConnected, unsetConnected] = useDialog();

    useLayoutEffect(() => {
        if (!socket) throw new Error("Socket is not available!");

        incrementUsers();

        socket.on("connect", setConnected);
        socket.on("disconnect", unsetConnected);

        // INFO: make sure we only connect to the socket ONCE! (a.k.a. on first user of useChatService)
        if (!socket.connected) {
            socket.connect();
        }

        const onUnmount = cb?.(applyListener, removeListener);

        return () => {
            if (!socket) return;

            onUnmount?.();

            socket.off("connect");
            socket.off("disconnect");

            const remaining = decrementUsers();

            // INFO: Make sure we disconnect from the socket when ALL listeners have been removed (a.k.a. every ui element has stopped listening to the socket!)
            if (remaining === 0) {
                safeDisconnect();
            }
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
