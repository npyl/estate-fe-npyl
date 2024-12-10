import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import TaskLabel from "./TaskLabel";

interface TaskTitleProps {
    taskCode?: string;
    name?: string;
}

const TaskTitle: FC<TaskTitleProps> = ({ name, taskCode }) => (
    <Stack spacing={1}>
        <TaskLabel taskCode={taskCode} />
        <Typography variant="h5">{name}</Typography>
    </Stack>
);

export default TaskTitle;
