import { IKanbanCardShort } from "@/types/tasks";
import { StyledPaper } from "./styled";
import Header from "./Header";
import Box from "@mui/material/Box";
import Footer from "./Footer";
import Content from "./Content";
import { PaperProps } from "@mui/material";

// ----------------------------------------------------------------------

export type TaskCardProps = PaperProps & {
    card: IKanbanCardShort;
};

export default function TaskCard({ card, ...props }: TaskCardProps) {
    const { name, completed, priority, assignees } = card || {};

    return (
        <StyledPaper priority={priority} elevation={8} {...props}>
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
