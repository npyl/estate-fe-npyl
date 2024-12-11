import Avatar from "@/components/Avatar";
import { useGetDashboardQuery } from "@/services/dashboard";
import { IDashboardTask } from "@/types/dashboard";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import Item from "../Tasks/ViewAll/List/Item";
import { Box } from "@mui/material";
import { useCallback } from "react";
import { useRouter } from "next/router";

// ------------------------------------------------------------------------

const getTaskRow = (onClick: (id: number) => void) => (t: IDashboardTask) =>
    (
        <Box key={t.id} position="relative" width={1}>
            <Item
                onClick={() => onClick(t.id)}
                c={{
                    ...t,
                    assignees: [],
                    attachmentsCount: 0,
                    commentsCount: 0,
                    completed: false,
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    right: 5,
                    top: "50%",
                    transform: "translateY(-50%)",
                }}
            >
                <Avatar
                    src={t?.reporter?.avatar}
                    firstName={t?.reporter?.firstName}
                    lastName={t?.reporter?.lastName}
                />
            </Box>
        </Box>
    );

// ------------------------------------------------------------------------

const Tasks = () => {
    const { t } = useTranslation();
    const router = useRouter();

    const { data, isLoading } = useGetDashboardQuery();
    const { tasks } = data || {};

    const handleClick = useCallback(
        (id: number) => router.push(`/tasks?taskId=${id}`),
        []
    );

    if (isLoading) return <Skeleton width="100%" height="58px" />;

    return (
        <Paper variant="outlined">
            <Typography p={1} py={2} variant="h6">
                {t("My Tasks")}
            </Typography>
            {tasks?.map(getTaskRow(handleClick))}
        </Paper>
    );
};

export default Tasks;
