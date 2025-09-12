import { useGetDashboardQuery } from "@/services/dashboard";
import { IDashboardTask } from "@/types/dashboard";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import Item from "../Tasks/ViewAll/List/Item";
import { IKanbanCardShort } from "@/types/tasks";

// ------------------------------------------------------------------------

const IDashboardTaskToCardShort = (t: IDashboardTask): IKanbanCardShort => ({
    ...t,
    assignees: [],
    attachmentsCount: t.attachmentCount,
    commentsCount: t.commentsCount,
    completed: false,
    labels: t.labels,
    column: -1,
});

const getTaskRow = (t: IDashboardTask) => (
    <Item key={t.id} c={IDashboardTaskToCardShort(t)} />
);

// ------------------------------------------------------------------------

const Tasks = () => {
    const { t } = useTranslation();

    const { data, isLoading } = useGetDashboardQuery();
    const { tasks } = data || {};

    if (isLoading) return <Skeleton width="100%" height="58px" />;

    return (
        <Paper variant="outlined">
            <Typography p={1} py={2} variant="h6">
                {t("My Tasks")}
            </Typography>
            {tasks?.map(getTaskRow)}
        </Paper>
    );
};

export default Tasks;
