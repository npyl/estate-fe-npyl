import DefaultTaskLabel from "@/sections/Tasks/card/CardDialog/TaskLabel";
import { SxProps, Theme } from "@mui/material/styles";
import { FC } from "react";

const getSx = (isCompleted: boolean): SxProps<Theme> => ({
    textDecoration: isCompleted ? "line-through" : "none",
});

interface TaskLabelProps {
    uniqueCode: string;
    isCompleted: boolean;
}

const TaskLabel: FC<TaskLabelProps> = ({ uniqueCode, isCompleted }) => (
    <DefaultTaskLabel taskCode={uniqueCode} sx={getSx(isCompleted)} />
);

export default TaskLabel;
