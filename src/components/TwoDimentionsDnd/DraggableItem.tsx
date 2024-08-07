import { isValidElement, ReactNode } from "react";
import { TwoDimentionsDndNode } from "./types";
import { Draggable } from "react-beautiful-dnd";
import Grid from "@mui/material/Grid";

const getNodeId = (node: ReactNode): any => {
    // Check if the node is a valid React element
    if (!isValidElement(node)) return null;

    const props = node.props as { id?: number | string };

    // Check if the id exists and is of the correct type
    if (
        props.id !== undefined &&
        (typeof props.id === "number" || typeof props.id === "string")
    ) {
        return props.id;
    }

    // Return null if the id wasn't found or wasn't of the correct type
    return null;
};

// Get draggable's Id
const getId = (dndId: number | undefined, item: ReactNode) =>
    dndId !== undefined
        ? `${dndId}-item-${getNodeId(item)}`
        : `item-${getNodeId(item)}`;

interface DraggableItemProps {
    item: TwoDimentionsDndNode;
    dndId?: number;
    dndStartIndex?: number;
    index: number;
    preventDrag: boolean;
    columns: number;
}

const DraggableItem: React.FC<DraggableItemProps> = ({
    dndId,
    dndStartIndex,
    item,
    index,
    preventDrag,
    columns,
}) => (
    <Grid item xs={12 / columns}>
        <Draggable
            draggableId={getId(dndId, item)}
            key={getId(dndId, item)}
            index={
                dndStartIndex !== undefined && dndId !== undefined
                    ? dndStartIndex + dndId * index
                    : index
            }
            isDragDisabled={preventDrag}
        >
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {item}
                </div>
            )}
        </Draggable>
    </Grid>
);

export default DraggableItem;
