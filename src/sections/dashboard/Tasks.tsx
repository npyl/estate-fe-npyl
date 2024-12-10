import Avatar from "@/components/Avatar";
import { useGetDashboardQuery } from "@/services/dashboard";
import { IDashboardTask } from "@/types/dashboard";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import PriorityLabel from "../Tasks/card/PriorityLabel";

// ------------------------------------------------------------------------

interface TaskRowProps {
    t: IDashboardTask;
}

const TaskRow: FC<TaskRowProps> = ({ t }) => {
    const { name, reporter, priority } = t || {};

    return (
        <Stack
            width={1}
            direction="row"
            spacing={1}
            justifyContent="space-around"
        >
            <Typography>{name}</Typography>
            <PriorityLabel priority={priority} />
            <Avatar
                src={reporter?.avatar}
                firstName={reporter?.firstName}
                lastName={reporter?.lastName}
            />
        </Stack>
    );
};

// ------------------------------------------------------------------------

const getTaskRow = (t: IDashboardTask) => <TaskRow key={t.id} t={t} />;

// ------------------------------------------------------------------------

const Tasks = () => {
    const { t } = useTranslation();

    const { data, isLoading } = useGetDashboardQuery();
    const { tasks } = data || {};

    if (isLoading) return <Skeleton width="100%" height="58px" />;

    return (
        <Paper variant="outlined">
            <Typography p={1} variant="h6">
                {t("My Tasks")}
            </Typography>
            <Divider />
            {tasks?.map(getTaskRow)}
        </Paper>
    );
};

export default Tasks;
