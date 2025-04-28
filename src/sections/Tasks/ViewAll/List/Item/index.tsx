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
import LabelImportantOutlinedIcon from "@mui/icons-material/LabelImportantOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import GoogleCalendarIcon from "@/assets/GoogleCalendar";
import { usePathname } from "next/navigation";
import LabelTooltip from "./LabelTooltip";
import InfoTooltipBox from "./InfoTooltipBox";

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

const iconsSx: SxProps<Theme> = {
    width: 16,
    height: 16,
    color: "text.secondary",
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
    const pathname = usePathname();
    const isTasksPage = pathname.includes("tasks");

    const isLargeScreen = useMediaQuery("(min-width:1900px)");

    const assignee = "assignees" in c && c.assignees?.[0];
    const isCompleted = "completed" in c && c.completed;
    const columnName = "columnName" in c ? c.columnName : "";

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);

        const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "2-digit",
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
        <Link sx={getItemSx(c.priority)} href={`/tasks/${c.id}`}>
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
                    <LabelTooltip labels={c.labels} chipStyles={chipStyles} />
                </Box>
            )}
            <PriorityLabel
                position="absolute"
                left={isLargeScreen ? "59%" : "57%"}
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
                left={isLargeScreen ? "68%" : "64.5%"}
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
                left={isLargeScreen ? "82%" : "80.5%"}
                position="absolute"
            >
                {/* Comments */}
                <InfoTooltipBox
                    title={t("Total Comments for this task")}
                    icon={<CommentIcon />}
                    value={c.commentsCount}
                />

                {/* Attachments */}
                <InfoTooltipBox
                    title={t("Total Attachments for this task")}
                    icon={<AttachFileOutlinedIcon sx={iconsSx} />}
                    value={
                        isTasksPage
                            ? (c as IKanbanCardShort).attachmentsCount
                            : (c as IDashboardTask).attachmentCount
                    }
                />
                {/* Tasks */}
                <InfoTooltipBox
                    title={t("Total Labels for this task")}
                    icon={<LabelImportantOutlinedIcon sx={iconsSx} />}
                    value={c.labels.length}
                />
                {/* Calendar Icon */}
                {c.event !== "" ? (
                    <>
                        <Tooltip
                            title={t("Calendar connected task")}
                            placement="top"
                        >
                            <GoogleCalendarIcon
                                sx={{
                                    fontSize: 27,
                                }}
                            />
                        </Tooltip>
                    </>
                ) : null}
            </Stack>
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="flex-end"
                width="100%"
            >
                {isCompleted ? <CompletedLabel /> : null}
                {columnName ? <ColumnLabel name={columnName} /> : null}
                {assignee ? <TooltipAvatar u={assignee} /> : <Avatar />}
            </Stack>
        </Link>
    );
};

export default Item;
