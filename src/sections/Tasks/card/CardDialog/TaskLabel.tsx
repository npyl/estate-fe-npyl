import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useTranslation } from "react-i18next";

interface TaskLabelProps {
    taskId?: number;
    name?: string;
}

const TaskLabel: FC<TaskLabelProps> = ({ name, taskId }) => {
    const { t } = useTranslation();
    return (
        <Stack spacing={1}>
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                bgcolor={({ palette: { mode, neutral } }) =>
                    mode === "light" ? neutral?.[200] : neutral?.[600]
                }
                borderRadius="16px"
                px={1}
                py={0.5}
                width="fit-content"
            >
                <BookmarkBorderIcon color="action" />
                <Typography variant="body2" pr={0.5}>
                    {taskId ? `${t("Task")}-${taskId}` : t("New Task")}
                </Typography>
            </Stack>

            <Typography variant="h5">{name}</Typography>
        </Stack>
    );
};

export default TaskLabel;
