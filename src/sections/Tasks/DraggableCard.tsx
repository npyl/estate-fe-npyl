import { Draggable } from "@hello-pangea/dnd";
import Card, { TaskCardProps } from "./card";
import { useCallback } from "react";
import { useRouter } from "next/router";

// ----------------------------------------------------------------------

interface DraggableCardProps extends TaskCardProps {
    index: number;
}

const DraggableCard = ({ card, index }: DraggableCardProps) => {
    const router = useRouter();

    const openDetails = useCallback(
        () => router.push(`/tasks/${card?.id}`),
        [card?.id]
    );

    return (
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
    );
};

export default DraggableCard;
