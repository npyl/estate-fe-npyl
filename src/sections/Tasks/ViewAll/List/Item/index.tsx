import { IKanbanCardShort } from "@/types/tasks";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { SpaceBetween } from "@/components/styled";
import TaskLabel from "@/sections/Tasks/card/CardDialog/TaskLabel";
import TooltipAvatar from "@/components/Avatar/Group/TooltipAvatar";
import { SxProps, Theme, Tooltip } from "@mui/material";
import { getTaskColor } from "@/sections/Tasks/styled";
import PriorityLabel from "@/sections/Tasks/card/PriorityLabel";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import UpdatedAtIcon from "./icons/UpdatedAtIcon";
import CommentIcon from "./icons/CommentIcon";
const CompletedLabel = dynamic(() => import("./CompletedLabel"));

const NoAssignee = () => null;

const getItemSx = (priority: number): SxProps<Theme> => ({
    position: "relative",
    cursor: "pointer",
    borderLeft: "3px solid",
    borderLeftColor: getTaskColor(priority),
    borderRadius: "2px",
    ":not(last-of-type)": {
        borderBottom: 0,
    },
    "&:hover": {
        backgroundColor: ({ palette: { mode, neutral } }) =>
            mode === "light" ? neutral?.[200] : neutral?.[800],
    },
});

const getSx = (isCompleted: boolean): SxProps<Theme> => ({
    textDecoration: isCompleted ? "line-through" : "none",
});

interface ItemProps {
    c: IKanbanCardShort;
    onClick: VoidFunction;
}

const Item: FC<ItemProps> = ({ c, onClick }) => {
    const { t, i18n } = useTranslation();
    const assignee = c.assignees?.[0];
    const isCompleted = c.completed;
    const formatDate = (timestamp: string) => {
        return new Intl.DateTimeFormat(i18n.language, {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }).format(new Date(timestamp));
    };

    return (
        <SpaceBetween
            p={1}
            bgcolor="background.paper"
            border="1px solid"
            borderColor="divider"
            alignItems="center"
            sx={getItemSx(c.priority)}
            onClick={onClick}
        >
            <Stack direction="row" spacing={1} alignItems="center">
                <TaskLabel taskCode={c?.uniqueCode} sx={getSx(isCompleted)} />
                <Typography variant="body2" textOverflow={"ellipsis"}>
                    {c.name}
                </Typography>
            </Stack>

            <PriorityLabel
                position="absolute"
                left="48%"
                priority={c?.priority}
                display={{
                    xs: "none",
                    lg: "block",
                }}
            />
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                left={"60%"}
                position="absolute"
            >
                <UpdatedAtIcon />
                <Tooltip title={t("Last Updated Date")} placement="top">
                    <Typography variant="body2">
                        {formatDate(c?.updatedAt ?? "N/A")}
                    </Typography>
                </Tooltip>
            </Stack>

            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                left={"79%"}
                position="absolute"
            >
                <CommentIcon />

                <Typography variant="body2">
                    {c.commentsCount} {t("Comments")}
                </Typography>
            </Stack>
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="flex-end"
                width="25%"
            >
                {isCompleted ? <CompletedLabel /> : null}
                {assignee ? <TooltipAvatar u={assignee} /> : <NoAssignee />}
            </Stack>
        </SpaceBetween>
    );
};

export default Item;
