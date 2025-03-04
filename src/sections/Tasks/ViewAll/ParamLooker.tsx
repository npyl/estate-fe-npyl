import dynamic from "next/dynamic";
import { parseAsInteger, useQueryState } from "nuqs";
import { useCallback } from "react";
const TaskDialog = dynamic(() => import("@/sections/Tasks/card/CardDialog"));

const ParamLooker = () => {
    const [taskId, setTaskId] = useQueryState("taskId", parseAsInteger);
    const handleClose = useCallback(() => setTaskId(null), []);

    if (taskId === null) return null;

    return <TaskDialog taskId={taskId} onClose={handleClose} />;
};

export default ParamLooker;
