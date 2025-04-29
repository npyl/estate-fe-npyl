import Avatar from "@/components/Avatar";
import { useGetDashboardQuery } from "@/services/dashboard";
import { IDashboardTask } from "@/types/dashboard";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import Item from "../Tasks/ViewAll/List/Item";
import { Box, Tooltip } from "@mui/material";
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

const getTaskRow = (t: IDashboardTask) => {
    const fullName = `${t?.reporter?.firstName} ${t?.reporter?.lastName}`;
    return (
        <Box key={t.id} position="relative" width={1}>
            <Item c={IDashboardTaskToCardShort(t)} />

            <Box
                sx={{
                    position: "absolute",
                    right: 9,
                    top: "50%",
                    transform: "translateY(-50%)",
                }}
            >
                <Tooltip placement={"top"} title={fullName}>
                    <Avatar
                        src={t?.reporter?.avatar}
                        firstName={t?.reporter?.firstName}
                        lastName={t?.reporter?.lastName}
                        sx={{
                            width: 34,
                            height: 34,
                        }}
                    />
                </Tooltip>
            </Box>
        </Box>
    );
};

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
