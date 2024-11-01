import { Draggable } from "react-beautiful-dnd";
// @types
import { IKanbanCard } from "src/types/kanban";
//
import CardDetails from "./details";
import { StyledPaper } from "./styled";
import Header from "./Header";
import useDialog from "@/hooks/useDialog";
import Box from "@mui/material/Box";
import Footer from "./Footer";
import Content from "./Content";

// ----------------------------------------------------------------------

type Props = {
    index: number;
    card: IKanbanCard;
    onDeleteTask: (id: number) => void;
};

export default function TaskCard({ card, onDeleteTask, index }: Props) {
    const { name, attachments, completed, priority, user } = card || {};

    const [isDetailsOpen, openDetails, closeDetails] = useDialog();

    return (
        <>
            <Draggable
                draggableId={`task-${card.id}`}
                key={`task-${card.id}`}
                index={index}
            >
                {(provided) => (
                    <StyledPaper
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        priority={priority}
                        onClick={openDetails}
                    >
                        <Header assignees={user} />

                        <Content
                            name={name}
                            priority={priority}
                            attachments={attachments}
                        />

                        <Box flexGrow={2} />

                        <Footer
                            commentsCount={card.comments.length}
                            createdAt={card.createdAt}
                            px={1}
                        />
                    </StyledPaper>
                )}
            </Draggable>

            {isDetailsOpen ? (
                <CardDetails
                    task={card}
                    onClose={closeDetails}
                    onDeleteTask={() => onDeleteTask(card.id)}
                />
            ) : null}
        </>
    );
}
