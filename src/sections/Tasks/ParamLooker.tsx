import TaskDialog from "@/sections/Tasks/card/CardDialog";
import { useLazyGetCardQuery } from "@/services/tasks";
import { IKanbanCard } from "@/types/tasks";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const isValidTaskId = (taskId?: string | null) => {
    if (!taskId) return false;
    try {
        const parsed = parseInt(taskId, 10);
        return (
            !isNaN(parsed) && parsed > 0 && taskId.trim() === parsed.toString()
        );
    } catch (ex) {
        console.error(ex);
        return false;
    }
};

const ParamLooker = () => {
    const router = useRouter();

    const searchParams = useSearchParams();
    const taskId = searchParams.get("taskId");

    const [getTask] = useLazyGetCardQuery();

    const [task, setTask] = useState<IKanbanCard>();
    const handleClose = useCallback(() => {
        setTask(undefined);
        router.replace("/tasks");
    }, []);

    useEffect(() => {
        if (!isValidTaskId(taskId)) return;
        getTask(+taskId!).unwrap().then(setTask);
    }, [taskId]);

    return (
        <>{task ? <TaskDialog task={task} onClose={handleClose} /> : null}</>
    );
};

export default ParamLooker;
