import { Droppable } from "react-beautiful-dnd";
import { IKanbanColumn } from "@/types/tasks";
import Header from "./Header";
import Cards from "./Cards";
import { StyledGrid } from "./styled";

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
                <StyledGrid
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    // ...
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    xl={12 / 5}
                    flexShrink={0}
                    border="1px solid"
                    borderColor="divider"
                >
                    <Header
                        name={column.name}
                        done={column.done}
                        columnId={column.id}
                    />

                    <Cards
                        mt={1}
                        spacing={2}
                        ids={column.cardIds}
                        columnId={column.id}
                        overflow="auto"
                    />

                    {provided.placeholder}
                </StyledGrid>
            )}
        </Droppable>
    );
}
