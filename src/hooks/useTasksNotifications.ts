import { useCallback, useLayoutEffect } from "react";
import { IUserMini } from "@/types/user";
import useMainSocket from "@/_private/useMainSocket";

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

interface Callbacks {
    onCountChange?: (n: number) => void;
    onTaskNotification?: (p: ITaskUpdateNotificationPayload) => void;
}

const useTasksNotifications = ({
    onCountChange,
    onTaskNotification,
}: Callbacks) => {
    const { socket } = useMainSocket();

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

    useLayoutEffect(() => {
        if (!socket) return;
        if (socket.readyState !== socket.OPEN) return;

        socket.addEventListener("message", onMessage);

        return () => {
            if (!socket) return;
            socket.removeEventListener("message", onMessage);
        };
    }, [socket, onMessage]);
};

export default useTasksNotifications;
