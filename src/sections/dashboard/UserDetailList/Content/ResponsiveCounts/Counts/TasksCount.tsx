import Typography from "@mui/material/Typography";
import { FC } from "react";
import Link from "@/components/Link";

interface TasksCountProps {
    count: number;
    assignee: number;
}

const TasksCount: FC<TasksCountProps> = ({ count, assignee }) => (
    <Typography
        component={Link}
        href={`/tasks?assignee=${assignee}`}
        borderRadius="16px"
        sx={{
            width: "fit-content",
            cursor: "pointer",
            textWrap: "nowrap",
            textAlign: "center",
            "&:hover": { opacity: 0.8 },
        }}
    >
        {count}
    </Typography>
);

export default TasksCount;
