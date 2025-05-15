import { IKanbanCardShort } from "@/types/tasks";
import { getPaperSx } from "./styled";
import Header from "./Header";
import Box from "@mui/material/Box";
import Footer from "./Footer";
import Content from "./Content";
import { Paper, PaperProps } from "@mui/material";
import { forwardRef } from "react";
import Link from "@/components/Link";
import TaskLabel from "./TaskLabel";

// ----------------------------------------------------------------------

export type TaskCardProps = PaperProps & {
    card: IKanbanCardShort;
};

const TaskCard = forwardRef<HTMLDivElement, TaskCardProps>(
    ({ card, sx, ...props }, ref) => {
        const { name, completed, priority, assignees, uniqueCode, labels } =
            card || {};
        return (
            <Paper
                ref={ref}
                elevation={8}
                component={Link}
                href={`/tasks/${card.id}`}
                sx={{ ...(getPaperSx(priority) as any), ...sx }}
                {...props}
            >
                <Header
                    taskId={card.id}
                    assignee={assignees[0]}
                    completed={completed}
                    uniqueCode={uniqueCode}
                />

                <Content name={name} />
                {/* The box ensures the same size of all cards */}
                <Box minHeight={22}>
                    <TaskLabel labels={labels} />
                </Box>

                <Box flexGrow={2} />

                <Footer
                    commentsCount={card.commentsCount}
                    createdAt={card.createdAt}
                    attachmentsCount={card.attachmentsCount}
                    labelsCount={card.labels.length}
                    priority={priority}
                    event={card.event || ""}
                />
            </Paper>
        );
    }
);

TaskCard.displayName = "TaskCard";

export default TaskCard;
