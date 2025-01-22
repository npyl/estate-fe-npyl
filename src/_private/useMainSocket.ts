import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";

// -------------------------------------------------------------

const socketUrl = process.env.NEXT_PUBLIC_MAIN_SOCKET;

const getMainSocketSingleton = (userId: number) => {
    if (!socketUrl) return null;

    const socket = new WebSocket(socketUrl);

    /**
     * INFO: without this message no communication can be established!
     */
    socket.addEventListener("open", () => {
        console.log("WS_OPEN");

        const req = JSON.stringify({
            type: "register",
            userId,
        });

        socket.send(req);
    });

    socket.addEventListener("close", () => {
        console.log("WS_CLOSE");
    });

    return socket;
};

declare global {
    // eslint-disable-next-line no-var
    var mainSocketGlobal: undefined | ReturnType<typeof getMainSocketSingleton>;
}

const getMainSocket = (currentUserId: number) => {
    const singleton = globalThis.mainSocketGlobal;
    if (!singleton) {
        globalThis.mainSocketGlobal = getMainSocketSingleton(currentUserId);
        return globalThis.mainSocketGlobal;
    }
};

// -------------------------------------------------------------

const useMainSocket = () => {
    const { user } = useAuth();
    const [socket] = useState(getMainSocket(user?.id!));

    console.log("readyState: ", socket?.readyState);

    return { socket };
};

export default useMainSocket;
