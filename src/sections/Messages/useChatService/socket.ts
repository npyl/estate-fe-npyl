import { io } from "socket.io-client";

const SocketIOSingleton = () => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("chatToken");
    if (!token) return;

    const socket = io(process.env.NEXT_PUBLIC_MESSAGES_URL, {
        path: "/socket",
        auth: { token },
        autoConnect: false,
        withCredentials: true,
    });

    return socket;
};

declare global {
    // eslint-disable-next-line no-var
    var socketIOGlobal: undefined | ReturnType<typeof SocketIOSingleton>;
}

const socket = globalThis.socketIOGlobal ?? SocketIOSingleton();

if (process.env.NODE_ENV !== "production") globalThis.socketIOGlobal = socket;

export default socket;
