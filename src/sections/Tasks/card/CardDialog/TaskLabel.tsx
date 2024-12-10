import Stack, { StackProps } from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useTranslation } from "react-i18next";

interface TaskLabelProps extends StackProps {
    taskCode?: string;
}

const TaskLabel: FC<TaskLabelProps> = ({ taskCode, ...props }) => {
    const { t } = useTranslation();
    return (
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
            {...props}
        >
            <BookmarkBorderIcon color="action" />
            <Typography variant="body2" pr={0.5}>
                {taskCode || t("New Task")}
            </Typography>
        </Stack>
    );
};

export default TaskLabel;
