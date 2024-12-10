import { useCallback } from "react";
import useWebSocket from "react-use-websocket";
import { useAuth } from "./use-auth";
import { IUserMini } from "@/types/user";

interface IActiveTaskCountPayload {
    userId: number;
    activeTasks: number;
}

export interface ITaskUpdateNotificationPayload {
    taskId: number;
    name: string;
    uniqueCode: string;
    priority: number;
    reporter: IUserMini;
}

type IMessageData =
    | { type: "active-task-count"; payload: IActiveTaskCountPayload }
    | {
          type: "task-update-notification";
          payload: ITaskUpdateNotificationPayload;
      };

const useTasksNotifications = ({
    onCountChange,
    onTaskNotification,
}: {
    onCountChange?: (n: number) => void;
    onTaskNotification?: (p: ITaskUpdateNotificationPayload) => void;
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
                const { type, payload } =
                    (JSON.parse(event?.data) as IMessageData) || {};

                const cb =
                    type === "active-task-count"
                        ? onCountChange
                        : type === "task-update-notification"
                        ? onTaskNotification
                        : () => {};

                const data =
                    type === "active-task-count"
                        ? payload?.activeTasks
                        : type === "task-update-notification"
                        ? payload
                        : (0 as any);

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
