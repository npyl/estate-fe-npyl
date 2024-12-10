import { Draggable } from "@hello-pangea/dnd";
import useDialog from "@/hooks/useDialog";
import Card, { TaskCardProps } from "./card";
import dynamic from "next/dynamic";
const CardDetails = dynamic(() => import("@/sections/Tasks/card/CardDialog"));

// ----------------------------------------------------------------------

interface DraggableCardProps extends TaskCardProps {
    columnId: number;
    index: number;
}

export default function DraggableCard({
    card,
    index,
    columnId,
}: DraggableCardProps) {
    const [isDetailsOpen, openDetails, closeDetails] = useDialog();

    return (
        <>
            <Draggable
                draggableId={`task-${card.id}`}
                key={`task-${card.id}`}
                index={index}
            >
                {(provided) => (
                    <Card
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        card={card}
                        onClick={openDetails}
                    />
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
