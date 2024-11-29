import useNotificationsSocket from "@/hooks/useTasksNotifications";
import CircleUnReadNotifications from "@/pages/notification/components/CircleUnReadNotifications";
import { useActiveAssignedTasksCountQuery } from "@/services/notification";
import { ConfirmationNumber } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { useState } from "react";
import CounterSkeleton from "./CounterSkeleton";

const TasksIconWithCounter = () => {
    const { data: initial, isLoading } = useActiveAssignedTasksCountQuery();

    const [realTime, onCountChange] = useState<number>();

    useNotificationsSocket({ onCountChange });

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
