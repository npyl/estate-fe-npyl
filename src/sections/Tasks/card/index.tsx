import { IKanbanCardShort } from "@/types/tasks";
import { StyledPaper } from "./styled";
import Header from "./Header";
import Box from "@mui/material/Box";
import Footer from "./Footer";
import Content from "./Content";
import { PaperProps } from "@mui/material";
import { forwardRef } from "react";

// ----------------------------------------------------------------------

export type TaskCardProps = PaperProps & {
    card: IKanbanCardShort;
};

const TaskCard = forwardRef<HTMLDivElement, TaskCardProps>(
    ({ card, ...props }, ref) => {
        const { name, completed, priority, assignees } = card || {};

        return (
            <StyledPaper ref={ref} priority={priority} elevation={8} {...props}>
                <Header
                    taskId={card.id}
                    assignee={assignees[0]}
                    completed={completed}
                />

                <Content name={name} priority={priority} />

                <Box flexGrow={2} />

                <Footer
                    commentsCount={card.commentsCount}
                    createdAt={card.createdAt}
                />
            </StyledPaper>
        );
    }
);

TaskCard.displayName = "TaskCard";

export default TaskCard;
