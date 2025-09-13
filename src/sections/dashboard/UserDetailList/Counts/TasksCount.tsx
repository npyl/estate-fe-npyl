import Typography from "@mui/material/Typography";
import { FC } from "react";
import Link from "@/components/Link";

interface TasksCountProps {
    count: number;
    assignee: number;
}

const TasksCount: FC<TasksCountProps> = ({ count, assignee }) => (
    <Link href={`/tasks?assignee=${assignee}`} passHref>
        <Typography
            borderRadius="16px"
            sx={{
                cursor: "pointer",
                width: "90px",
                textWrap: "nowrap",
                textAlign: "center",
                "&:hover": { opacity: 0.8 },
            }}
        >
            {count}
        </Typography>
    </Link>
);

export default TasksCount;
