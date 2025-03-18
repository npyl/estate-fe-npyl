import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import AssignmentIcon from "@mui/icons-material/Assignment";
import dynamic from "next/dynamic";
import { FC, useCallback, useState } from "react";
import { IKanbanCard } from "@/types/tasks";

const TaskDialog = dynamic(() =>
    import("@/sections/Tasks/card/CardDialog").then(({ Details }) => Details)
);

interface CreateFromResourceButtonProps {
    taskGetter: () => Promise<IKanbanCard | undefined>;
}

const CreateFromResourceButton: FC<CreateFromResourceButtonProps> = ({
    taskGetter,
}) => {
    const { t } = useTranslation();

    const [task, setTask] = useState<IKanbanCard>();

    const handleOpenDialog = useCallback(async () => {
        const res = await taskGetter();
        if (!res) return;
        setTask(res);
    }, [taskGetter]);

    const closeDialog = useCallback(() => setTask(undefined), []);

    return (
        <>
            <Button
                onClick={handleOpenDialog}
                variant="contained"
                startIcon={<AssignmentIcon />}
                sx={{
                    width: "max-content",
                    textWrap: "nowrap",
                }}
            >
                {t("New Task")}
            </Button>

            {task ? (
                <TaskDialog quickCreate task={task} onClose={closeDialog} />
            ) : null}
        </>
    );
};

export default CreateFromResourceButton;
