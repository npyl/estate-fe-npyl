import useNotificationsSocket from "@/hooks/useNotificationsSocket";
import CircleUnReadNotifications from "@/pages/notification/components/CircleUnReadNotifications";
import { useActiveAssignedTasksCountQuery } from "@/services/notification";
import { ConfirmationNumber } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { useCallback, useEffect, useState } from "react";
import CounterSkeleton from "./CounterSkeleton";

const TasksIconWithCounter = () => {
    useEffect(() => {}, []);

    const { data: initial, isLoading } = useActiveAssignedTasksCountQuery();

    const [realTime, setRealTime] = useState<number>();

    const handleMessage = useCallback((e: WebSocketEventMap["message"]) => {
        if (e.type === "active-task-count") {
            setRealTime(e.data.activeTasks);
        }
    }, []);

    useNotificationsSocket(handleMessage);

    const count = realTime ?? initial ?? 0;

    return (
        <Box display="flex" justifyContent="space-between">
            <ConfirmationNumber fontSize="small" />
            {isLoading ? <CounterSkeleton /> : null}
            {count ? (
                <CircleUnReadNotifications>{count}</CircleUnReadNotifications>
            ) : null}
        </Box>
    );
};

export default TasksIconWithCounter;
