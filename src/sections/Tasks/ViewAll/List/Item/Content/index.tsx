import { IKanbanCardShort } from "@/types/tasks";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TooltipAvatar from "@/components/Avatar/Group/TooltipAvatar";
import { Avatar, SxProps, Theme, Tooltip } from "@mui/material";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import UpdatedAtIcon from "./icons/UpdatedAtIcon";
import CommentIcon from "./icons/CommentIcon";
import { IDashboardTask } from "@/types/dashboard";
import ColumnLabel from "./ColumnNameLabel";
import LabelImportantOutlinedIcon from "@mui/icons-material/LabelImportantOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import GoogleCalendarIcon from "@/assets/GoogleCalendar";
import { usePathname } from "next/navigation";
import InfoTooltipBox from "./InfoTooltipBox";
import TaskLabel from "./TaskLabel";
import Labels from "./Labels";
import { FC } from "react";
import UpdatedAt from "./UpdatedAt";
const CompletedLabel = dynamic(() => import("./CompletedLabel"));

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

interface AssigneeProps {
    c: IKanbanCardShort | IDashboardTask;
}
const Assignee: FC<AssigneeProps> = ({ c }) => {
    const assignee = "assignees" in c ? c.assignees?.at(0) : undefined;
    if (!assignee) return null;
    return <TooltipAvatar u={assignee} />;
};

interface ReporterProps {
    c: IKanbanCardShort | IDashboardTask;
}
const Reporter: FC<ReporterProps> = ({ c }) => {
    const reporter = "reporter" in c ? c.reporter : undefined;
    if (!reporter) return null;
    return <TooltipAvatar u={reporter} />;
};

interface ContentProps {
    c: IKanbanCardShort | IDashboardTask;
    assignee: boolean;
    reporter: boolean;
}

const Content: FC<ContentProps> = ({ c, assignee, reporter }) => {
    const { t } = useTranslation();
    const pathname = usePathname();
    const isTasksPage = pathname.includes("tasks");

    const isCompleted = "completed" in c && c.completed;
    const columnName = "columnName" in c ? c.columnName : "";

    return (
        <>
            <Stack direction="row" justifyContent="space-between" spacing={1}>
                <Stack
                    maxWidth={0.5}
                    gap={1}
                    direction={{ xs: "column", md: "row" }}
                    alignItems={{ xs: "flex-start", md: "center" }}
                >
                    <TaskLabel
                        isCompleted={isCompleted}
                        uniqueCode={c.uniqueCode}
                    />

                    <Typography
                        variant="body2"
                        textOverflow="ellipsis"
                        maxWidth={1}
                        sx={taskNameSx}
                    >
                        {c.name}
                    </Typography>

                    <Labels
                        display={{ xs: "none", md: "flex" }}
                        priority={c.priority}
                        labels={c.labels}
                    />
                </Stack>

                <Stack
                    direction={{ xs: "column", md: "row" }}
                    alignItems={{ xs: "flex-end", md: "center" }}
                    gap={1}
                >
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <UpdatedAtIcon />
                        <UpdatedAt updatedAt={c.updatedAt} />
                    </Stack>

                    <Stack direction="row" alignItems="center">
                        <InfoTooltipBox
                            title={t("Total Comments for this task")}
                            icon={<CommentIcon />}
                            value={c.commentsCount}
                        />

                        <InfoTooltipBox
                            title={t("Total Attachments for this task")}
                            icon={<AttachFileOutlinedIcon sx={iconsSx} />}
                            value={
                                isTasksPage
                                    ? (c as IKanbanCardShort).attachmentsCount
                                    : (c as IDashboardTask).attachmentCount
                            }
                        />

                        <InfoTooltipBox
                            title={t("Total Labels for this task")}
                            icon={<LabelImportantOutlinedIcon sx={iconsSx} />}
                            value={c.labels.length}
                        />

                        {c.event !== "" ? (
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
                        ) : null}
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={1}>
                        {isCompleted ? <CompletedLabel /> : null}
                        {columnName ? <ColumnLabel name={columnName} /> : null}
                        {assignee ? <Assignee c={c} /> : null}
                        {reporter ? <Reporter c={c} /> : null}
                    </Stack>
                </Stack>
            </Stack>

            <Labels
                display={{ xs: "flex", md: "none" }}
                priority={c.priority}
                labels={c.labels}
            />
        </>
    );
};

export type { ContentProps };
export default Content;
