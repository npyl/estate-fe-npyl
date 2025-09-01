import toNumberSafe from "@/utils/toNumberSafe";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCallback } from "react";
const TaskDialog = dynamic(() => import("@/sections/Tasks/card/CardDialog"));

const ParamLooker = () => {
    const router = useRouter();
    const { taskId } = router.query;
    const iTaskId = toNumberSafe(taskId);

    const handleClose = useCallback(() => router.push("/tasks"), []);

    if (iTaskId === -1) return null;

    return <TaskDialog taskId={iTaskId} onClose={handleClose} />;
};

export default ParamLooker;
