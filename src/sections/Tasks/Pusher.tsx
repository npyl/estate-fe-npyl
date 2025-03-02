import { FC } from "react";
import Pusher from "@/sections/Pusher";

interface Props {
    taskId?: number;
}

const TaskPusher: FC<Props> = ({ taskId = -1 }) => {
    if (taskId === -1) return null;

    return (
        <Pusher
            tab={{
                path: `/tasks?taskId=${taskId}`,
                renderer: "TASK",
                resourceId: taskId,
            }}
        />
    );
};

export default TaskPusher;
