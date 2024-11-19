import { Droppable } from "react-beautiful-dnd";
import { IKanbanColumn } from "@/types/tasks";
import Header from "./Header";
import Cards from "./Cards";
import { StyledPaper } from "./styled";

// ----------------------------------------------------------------------

type Props = {
    id: number; // INFO: Necessary for TwoDimentionsDnd!
    column: IKanbanColumn;
};

export const DroppableTypeTask = "TASK";

export default function Column({ column }: Props) {
    return (
        <Droppable
            droppableId={`section-${column.id}`}
            type={DroppableTypeTask}
        >
            {(provided) => (
                <StyledPaper
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    variant="outlined"
                >
                    <Header
                        name={column.name}
                        count={column.numberOfTasks}
                        done={column.done}
                        columnId={column.id}
                    />

                    <Cards
                        mt={2}
                        spacing={2}
                        ids={column.cardIds}
                        columnId={column.id}
                    />

                    {provided.placeholder}
                </StyledPaper>
            )}
        </Droppable>
    );
}
