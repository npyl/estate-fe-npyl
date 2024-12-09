import Avatar from "@/components/Avatar";
import Link from "@/components/Link";
import { ITaskUpdateNotificationPayload } from "@/hooks/useTasksNotifications";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import orgToast from "react-hot-toast";
import { useTranslation } from "react-i18next";

interface TaskToastProps {
    p: ITaskUpdateNotificationPayload;
}

const TaskToast: FC<TaskToastProps> = ({ p, ...other }) => {
    const { reporter } = p || {};

    const { t } = useTranslation();

    // INFO: onDismiss is automatically passed to every message that is react component (from @/components/Toast)
    const onDismiss =
        "onDismiss" in other ? (other.onDismiss as VoidFunction) : undefined;

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
                    onClick={onDismiss}
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
    orgToast(<TaskToast p={p} />, {
        duration: Infinity,
        position: "bottom-right",
    });

export default toast;
