import Avatar from "@/components/Avatar";
import Link from "@/components/Link";
import { ITaskUpdateNotificationPayload } from "@/hooks/useTasksNotifications";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC, useCallback } from "react";
import orgToast from "react-hot-toast";
import { useTranslation } from "react-i18next";

interface TaskToastProps {
    toastId: string;
    p: ITaskUpdateNotificationPayload;
}

const TaskToast: FC<TaskToastProps> = ({ p, toastId }) => {
    const { reporter } = p || {};

    const { t } = useTranslation();

    const handleDismiss = useCallback(
        () => orgToast.dismiss(toastId),
        [toastId]
    );

    const label = `${t("View Task")} (${p.uniqueCode})`;

    return (
        <Stack spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                    src={reporter?.avatar}
                    firstName={reporter?.firstName}
                    lastName={reporter?.lastName}
                />
                <Stack>
                    <Typography fontWeight="bold">{t("New Task")}</Typography>
                    <Typography>{t("You were assigned to a task")}</Typography>
                </Stack>
            </Stack>

            <Stack pl="40px" direction="row" spacing={1} alignItems="center">
                <Button
                    variant="text"
                    sx={{
                        color: "text.secondary",
                    }}
                    onClick={handleDismiss}
                >
                    {t("Dismiss")}
                </Button>
                <Button
                    LinkComponent={Link}
                    variant="text"
                    href={`/tasks?taskId=${p.taskId}`}
                >
                    {label}
                </Button>
            </Stack>
        </Stack>
    );
};

const toast = (p: ITaskUpdateNotificationPayload) =>
    orgToast((t) => <TaskToast toastId={t.id} p={p} />, {
        duration: Infinity,
        position: "bottom-right",
    });

export default toast;
