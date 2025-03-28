import { IKanbanCardShort } from "@/types/tasks";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import TaskLabel from "@/sections/Tasks/card/CardDialog/TaskLabel";
import TooltipAvatar from "@/components/Avatar/Group/TooltipAvatar";
import {
    Avatar,
    Box,
    Chip,
    SxProps,
    Theme,
    Tooltip,
    useMediaQuery,
} from "@mui/material";
import { getTaskColor } from "@/sections/Tasks/styled";
import PriorityLabel from "@/sections/Tasks/card/PriorityLabel";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import UpdatedAtIcon from "./icons/UpdatedAtIcon";
import CommentIcon from "./icons/CommentIcon";
import { IDashboardTask } from "@/types/dashboard";
import ColumnLabel from "./ColumnNameLabel";
import Link from "@/components/Link";
const CompletedLabel = dynamic(() => import("./CompletedLabel"));

const chipStyles: SxProps<Theme> = {
    backgroundColor: "rgba(0, 0, 0, 0.05) !important",
    color: "black",
    fontWeight: 400,
    fontSize: "14px",
    height: "26px",
    borderRadius: "16px",
};

const colorCircleStyles: SxProps<Theme> = {
    width: 10,
    height: 10,
    borderRadius: "50%",
    display: "inline-block",
};

const taskNameSx: SxProps<Theme> = {
    whiteSpace: "nowrap !important",
    overflow: "hidden !important",
    textOverflow: "ellipsis !important",
    maxWidth: "100%",
};

const getItemSx = (priority: number): SxProps<Theme> => ({
    display: "flex",
    flexDirection: "row",

    p: 1,
    bgcolor: "background.paper",
    border: "1px solid",
    borderColor: "divider",
    alignItems: "center",

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
    c: IKanbanCardShort | IDashboardTask;
}

const Item: FC<ItemProps> = ({ c }) => {
    const { t, i18n } = useTranslation();

    const isLargeScreen = useMediaQuery("(min-width:1900px)");

    const assignee = "assignees" in c && c.assignees?.[0];
    const isCompleted = "completed" in c && c.completed;
    const columnName = "columnName" in c ? c.columnName : "";

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);

        const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        };

        const locale = i18n.language === "el" ? "el-GR" : "en-GB";
        const formattedDate = date.toLocaleDateString(locale, options);

        return formattedDate.replace(",", " -");
    };

    return (
        <Link sx={getItemSx(c.priority)} href={`/task/${c.id}`}>
            <Stack direction="row" spacing={1} alignItems="center">
                <TaskLabel taskCode={c?.uniqueCode} sx={getSx(isCompleted)} />
                <Typography
                    variant="body2"
                    textOverflow={"ellipsis"}
                    sx={taskNameSx}
                >
                    {c.name}
                </Typography>
            </Stack>
            {c.labels && c.labels.length > 0 && (
                <Box position="absolute" left={isLargeScreen ? "43%" : "41%"}>
                    {c.labels.slice(0, 1).map((label) => (
                        <Chip
                            key={label.id}
                            label={
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Box
                                        sx={{
                                            ...colorCircleStyles,
                                            backgroundColor: label.color,
                                        }}
                                    />
                                    {label.name}
                                </Box>
                            }
                            sx={chipStyles}
                        />
                    ))}
                </Box>
            )}
            <PriorityLabel
                position="absolute"
                left={isLargeScreen ? "59%" : "58%"}
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
                left={isLargeScreen ? "68%" : "66%"}
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
                left={isLargeScreen ? "84%" : "82%"}
                position="absolute"
            >
                <Tooltip
                    placement="top"
                    title={t("Total Comments for this task")}
                >
                    <Box display="flex" alignItems="center" gap={1}>
                        <CommentIcon />

                        <Typography variant="body2">
                            {c.commentsCount}
                        </Typography>
                    </Box>
                </Tooltip>
            </Stack>
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="flex-end"
                width="25%"
            >
                {isCompleted ? <CompletedLabel /> : null}
                {columnName ? <ColumnLabel name={columnName} /> : null}
                {assignee ? <TooltipAvatar u={assignee} /> : <Avatar />}
            </Stack>
        </Link>
    );
};

export default Item;
