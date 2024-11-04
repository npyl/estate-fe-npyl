import { Draggable } from "react-beautiful-dnd";
import { IKanbanCard } from "@/types/tasks";
import { StyledPaper } from "./styled";
import dynamic from "next/dynamic";
import Header from "./Header";
import useDialog from "@/hooks/useDialog";
import Box from "@mui/material/Box";
import Footer from "./Footer";
import Content from "./Content";
const CardDetails = dynamic(() => import("./CardDialog"));

// ----------------------------------------------------------------------

type Props = {
    index: number;
    columnId: number;
    card: IKanbanCard;
};

export default function TaskCard({ card, index, columnId }: Props) {
    const { name, attachments, completed, priority, assignee } = card || {};

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
                        <Header
                            taskId={card.id}
                            assignee={assignee}
                            completed={completed}
                        />

                        <Content
                            name={name}
                            priority={priority}
                            attachments={attachments}
                        />

                        <Box flexGrow={2} />

                        <Footer
                            commentsCount={card.comments.length}
                            createdAt={card.createdAt}
                        />
                    </StyledPaper>
                )}
            </Draggable>

            {isDetailsOpen ? (
                <CardDetails
                    task={card}
                    columnId={columnId}
                    onClose={closeDetails}
                />
            ) : null}
        </>
    );
}
