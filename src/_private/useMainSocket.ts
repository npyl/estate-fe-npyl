import { useAuth } from "@/hooks/use-auth";
import { useLayoutEffect, useState } from "react";

const socketUrl = process.env.NEXT_PUBLIC_MAIN_SOCKET;

declare global {
    var socketPromise: undefined | Promise<WebSocket>;
}

const connectSocket = (userId: number): Promise<WebSocket> => {
    const socket = new WebSocket(socketUrl!);

    /**
     * INFO: why keep the promise result? to manage race-conditions between multiple components trying to access a slow onOpen handler
     */
    return new Promise((resolve) => {
        /**
         * INFO: without this message no communication can be established!*
         */
        socket.addEventListener("open", () => {
            console.log("WS_OPEN");
            const req = JSON.stringify({ type: "register", userId });
            socket.send(req);
            resolve(socket);
        });

        socket.addEventListener("close", () => {
            console.log("WS_CLOSE");
            globalThis.socketPromise = undefined;
        });
    });
};

const getSocket = (userId: number): Promise<WebSocket> => {
    return (globalThis.socketPromise ??= connectSocket(userId));
};

/**
 * This hook uses a singleton for same-page components (so that we don't send "register" message more than once!)
 */
const useMainSocket = () => {
    const { user } = useAuth();
    const [socket, setSocket] = useState<WebSocket>();

    useLayoutEffect(() => {
        if (!user?.id) return;
        getSocket(user.id).then(setSocket);
    }, [user?.id]);

    return { socket };
};

export default useMainSocket;
