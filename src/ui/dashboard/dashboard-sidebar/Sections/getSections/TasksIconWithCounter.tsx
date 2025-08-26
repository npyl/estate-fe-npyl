import useNotificationsSocket from "@/ui/useTasksNotifications";
import CircleUnReadNotifications from "@/sections/Notification/_shared/CircleUnReadNotifications";
import { useActiveAssignedTasksCountQuery } from "@/services/notification";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
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
            <ConfirmationNumberIcon fontSize="small" />
            {isLoading ? <CounterSkeleton /> : null}
            {count ? (
                <CircleUnReadNotifications>{count}</CircleUnReadNotifications>
            ) : null}
        </Box>
    );
};

export default TasksIconWithCounter;
