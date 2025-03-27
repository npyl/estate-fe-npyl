import { Draggable } from "@hello-pangea/dnd";
import Card, { TaskCardProps } from "./card";

// ----------------------------------------------------------------------

interface DraggableCardProps extends TaskCardProps {
    index: number;
}

const DraggableCard = ({ card, index }: DraggableCardProps) => (
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
            />
        )}
    </Draggable>
);

export default DraggableCard;
