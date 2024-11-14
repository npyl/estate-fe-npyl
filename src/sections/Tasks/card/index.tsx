import { Draggable } from "react-beautiful-dnd";
import { IKanbanCardShort } from "@/types/tasks";
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
    card: IKanbanCardShort;
};

export default function TaskCard({ card, index, columnId }: Props) {
    const { name, completed, priority, assignees } = card || {};

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
                        elevation={8}
                        onClick={openDetails}
                    >
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
                )}
            </Draggable>

            {isDetailsOpen ? (
                <CardDetails
                    taskId={card.id}
                    columnId={columnId}
                    onClose={closeDetails}
                />
            ) : null}
        </>
    );
}
