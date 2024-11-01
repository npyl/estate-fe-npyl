import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

interface TaskLabelProps {
    taskId: number;
}

const TaskLabel: FC<TaskLabelProps> = ({ taskId }) => (
    <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        bgcolor="neutral.200"
        borderRadius="16px"
        px={1}
        py={0.5}
    >
        <BookmarkBorderIcon color="action" />
        <Typography variant="body2">Task-{taskId}</Typography>
    </Stack>
);

export default TaskLabel;
