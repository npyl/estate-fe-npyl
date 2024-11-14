import TaskDialog from "@/sections/Tasks/card/CardDialog";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useCallback } from "react";

const getValidTaskId = (taskId?: string | null) => {
    try {
        if (!taskId) return -1;

        const parsed = parseInt(taskId, 10);

        const isValid =
            !isNaN(parsed) && parsed > 0 && taskId.trim() === parsed.toString();

        if (!isValid) return -1;

        return parsed;
    } catch (ex) {
        console.error(ex);
        return -1;
    }
};

const ParamLooker = () => {
    const router = useRouter();

    const searchParams = useSearchParams();
    const taskId = searchParams.get("taskId");
    const iTaskId = getValidTaskId(taskId);

    const handleClose = useCallback(() => router.replace("/tasks"), []);

    return (
        <>
            {iTaskId !== -1 ? (
                <TaskDialog taskId={iTaskId} onClose={handleClose} />
            ) : null}
        </>
    );
};

export default ParamLooker;
