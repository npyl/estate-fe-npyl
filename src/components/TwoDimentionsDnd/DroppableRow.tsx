import { Droppable } from "@hello-pangea/dnd";
import { DroppableTypeItem, TwoDimentionsDndNode } from "./types";
import Grid, { GridProps } from "@mui/material/Grid";
import { forwardRef } from "react";

const getDroppableId = (dndId: number | undefined, i: number) =>
    dndId !== undefined ? `${dndId}-row-${i}` : `row-${i}`;

interface DroppableRowProps extends Omit<GridProps, "children"> {
    dndId?: number;
    index: number;
    gap: number;
    children: TwoDimentionsDndNode | TwoDimentionsDndNode[];
}

const DroppableRow = forwardRef<HTMLDivElement, DroppableRowProps>(
    ({ dndId, index, gap, children, ...props }, ref) => (
        <Droppable
            droppableId={getDroppableId(dndId, index)}
            type={DroppableTypeItem}
            key={getDroppableId(dndId, index)}
            direction="horizontal"
        >
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    <Grid
                        ref={ref}
                        container
                        direction="row"
                        gap={gap}
                        {...props}
                    >
                        {children}
                    </Grid>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
);

DroppableRow.displayName = "DroppableRow";

export default DroppableRow;
