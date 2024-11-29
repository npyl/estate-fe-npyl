import useNotificationsSocket from "@/hooks/useNotificationsSocket";
import { useCallback } from "react";

const NotificationsListener = () => {
    const handleMessage = useCallback((e: WebSocketEventMap["message"]) => {
        // ...
    }, []);

    useNotificationsSocket(handleMessage);

    return null;
};

export default NotificationsListener;
