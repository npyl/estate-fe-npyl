import { IKanbanCardShort } from "@/types/tasks";
import { getPaperSx } from "./styled";
import Header from "./Header";
import Box from "@mui/material/Box";
import Footer from "./Footer";
import Content from "./Content";
import { Paper, PaperProps } from "@mui/material";
import { forwardRef } from "react";
import Link from "@/components/Link";

// ----------------------------------------------------------------------

export type TaskCardProps = PaperProps & {
    card: IKanbanCardShort;
};

const TaskCard = forwardRef<HTMLDivElement, TaskCardProps>(
    ({ card, sx, ...props }, ref) => {
        const { name, completed, priority, assignees, uniqueCode } = card || {};
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

                <Content name={name} priority={priority} />

                <Box flexGrow={2} />

                <Footer
                    commentsCount={card.commentsCount}
                    createdAt={card.createdAt}
                />
            </Paper>
        );
    }
);

TaskCard.displayName = "TaskCard";

export default TaskCard;
