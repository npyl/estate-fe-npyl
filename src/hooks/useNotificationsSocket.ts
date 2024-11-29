import useWebSocket from "react-use-websocket";

const useNotificationsSocket = (
    onMessage?: (event: WebSocketEventMap["message"]) => void
) => {
    const { readyState } = useWebSocket(
        process.env.NEXT_PUBLIC_TASKS_SOCKET ?? "",
        {
            share: true /* INFO: socket object can/will be shared */,
            reconnectAttempts: 3,
            onMessage,
        }
    );

    console.log("readyState: ", readyState);
};

export default useNotificationsSocket;
