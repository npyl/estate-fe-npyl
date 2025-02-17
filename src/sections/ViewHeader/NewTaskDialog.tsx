import { useState, useCallback } from "react";
import { Button } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import { IKanbanCard } from "@/types/tasks";
import useTaskFromProperty from "../Properties/ViewById/(tabs)/Tasks/useTaskFromProperty";

const TaskDialog = dynamic(() =>
    import("@/sections/Tasks/card/CardDialog").then(({ Details }) => Details)
);

interface NewTaskDialogProps {
    buttonFullWidth?: boolean; // Allows flexibility for button width
}

const NewTaskDialog: React.FC<NewTaskDialogProps> = ({ buttonFullWidth }) => {
    const { t } = useTranslation();
    const [task, setTask] = useState<IKanbanCard | undefined>();
    const { getTask } = useTaskFromProperty();

    const handleOpenTaskDialog = useCallback(() => {
        setTask(getTask());
    }, [getTask]);

    const handleCloseTaskDialog = useCallback(() => {
        setTask(undefined);
    }, []);

    return (
        <>
            <Button
                fullWidth={buttonFullWidth}
                variant="outlined"
                color="primary"
                startIcon={<AssignmentIcon />}
                onClick={handleOpenTaskDialog}
                sx={{ justifyContent: "flex-start" }}
            >
                {t("New Task")}
            </Button>

            {task && <TaskDialog task={task} onClose={handleCloseTaskDialog} />}
        </>
    );
};

export default NewTaskDialog;
