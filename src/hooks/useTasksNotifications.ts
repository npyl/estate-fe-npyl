import { useCallback } from "react";
import useWebSocket from "react-use-websocket";
import { useAuth } from "./use-auth";

const useTasksNotifications = ({
    onCountChange,
    onTaskNotification,
}: {
    onCountChange?: (n: number) => void;
    onTaskNotification?: () => void;
}) => {
    const { user } = useAuth();

    const onOpen = useCallback(() => {
        if (user?.id === undefined) return;

        const req = {
            type: "register",
            userId: user?.id,
        };

        sendJsonMessage(req);
    }, [user?.id]);

    const onMessage = useCallback(
        (event: WebSocketEventMap["message"]) => {
            try {
                const { type, payload } = JSON.parse(event?.data) || {};

                const cb =
                    type === "active-task-count"
                        ? onCountChange
                        : onTaskNotification;

                const data =
                    type === "active-task-count"
                        ? payload?.activeTasks
                        : payload;

                cb?.(data);
            } catch (ex) {}
        },
        [onCountChange, onTaskNotification]
    );

    const { sendJsonMessage } = useWebSocket(
        process.env.NEXT_PUBLIC_TASKS_SOCKET ?? "",
        {
            onOpen,
            onMessage,
        }
    );
};

export default useTasksNotifications;
