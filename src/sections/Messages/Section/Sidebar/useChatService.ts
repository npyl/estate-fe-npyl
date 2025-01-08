import { io } from "socket.io-client";
import { useLayoutEffect } from "react";
import useDialog from "@/hooks/useDialog";

const token = process.env.NEXT_PUBLIC_MESSAGES_TKN;

const socket = io(process.env.NEXT_PUBLIC_MESSAGES_URL, {
    path: "/socket",
    auth: { token },
    autoConnect: false,
});

const useChatService = () => {
    const [isConnected, setConnected, unsetConnected] = useDialog();

    useLayoutEffect(() => {
        socket.on("connect", setConnected);
        socket.on("disconnect", unsetConnected);

        socket.connect();

        return () => {
            socket.off("connect");
            socket.off("disconnect");

            socket.disconnect();
        };
    }, []);

    return { isConnected };
};

export default useChatService;
