import { useGetBoardQuery } from "@/services/tasks";
import { Typography } from "@mui/material";
import { FC } from "react";
import { useFiltersContext } from "@/sections/Tasks/filters";
import { useTranslation } from "react-i18next";

interface TasksCountProps {
    columnId: number;
}

const TasksCount: FC<TasksCountProps> = ({ columnId }) => {
    const { t } = useTranslation();

    const { data: board } = useGetBoardQuery({});
    const column = board?.columns?.find(({ id }) => id === columnId);
    const allCount = column?.cardIds?.length;

    const { search, assigneeId, priority } = useFiltersContext();
    const { data: boardAfterFilters } = useGetBoardQuery({
        search,
        assigneeId,
        priority,
    });

    const noFiltersApplied =
        !search && assigneeId === undefined && priority === undefined;

    if (noFiltersApplied) {
        return (
            <Typography variant="h6" noWrap>
                ({allCount})
            </Typography>
        );
    }

    const columnAfterFilters = boardAfterFilters?.columns?.find(
        ({ id }) => id === columnId
    );
    const afterFiltersCount = columnAfterFilters?.cardIds?.length;

    return (
        <Typography variant="h6" noWrap>
            ({afterFiltersCount ?? 0} {t("out of")} {allCount ?? 0})
        </Typography>
    );
};

export default TasksCount;
