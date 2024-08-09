// INFO: if no rows or columns are given to the dnd show this placeholder to prevent drag to inexistend Droppable
//          This is useful when we have multiple TwoDimentionsDnd

import React from "react";
import DroppableRow from "./DroppableRow";
import DraggableItem from "./DraggableItem";
import Box from "@mui/material/Box";

interface PlaceholderRowProps {
    dndId?: number;
    gap: number;
    startIndex?: number;
    columns: number;
}

const PlaceholderRow: React.FC<PlaceholderRowProps> = ({
    startIndex,
    columns,
    ...props
}) => (
    <DroppableRow index={0} {...props}>
        <DraggableItem
            preventDrag
            index={0}
            columns={columns}
            dndStartIndex={startIndex}
            item={
                <Box id="placeholder-draggable-item" width={1} height="200px" />
            }
        />
    </DroppableRow>
);

export default PlaceholderRow;
