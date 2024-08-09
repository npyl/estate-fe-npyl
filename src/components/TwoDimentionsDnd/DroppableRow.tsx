import { Droppable } from "react-beautiful-dnd";
import { DroppableTypeItem, TwoDimentionsDndNode } from "./types";
import Grid from "@mui/material/Grid";

const getDroppableId = (dndId: number | undefined, i: number) =>
    dndId !== undefined ? `${dndId}-row-${i}` : `row-${i}`;

interface DroppableRowProps {
    dndId?: number;
    index: number;
    gap: number;
    children: TwoDimentionsDndNode | TwoDimentionsDndNode[];
}

const DroppableRow: React.FC<DroppableRowProps> = ({
    dndId,
    index,
    gap,
    children,
}) => (
    <Droppable
        droppableId={getDroppableId(dndId, index)}
        type={DroppableTypeItem}
        key={getDroppableId(dndId, index)}
        direction="horizontal"
    >
        {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
                <Grid container direction="row" spacing={gap}>
                    {children}
                </Grid>
                {provided.placeholder}
            </div>
        )}
    </Droppable>
);

export default DroppableRow;
