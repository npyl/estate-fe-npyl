import Column, { DroppableTypeTask } from "./column";
import { DropResult } from "react-beautiful-dnd";
import { FC, useCallback } from "react";
import { TwoDimentionsDnd } from "src/components/TwoDimentionsDnd/TwoDimentionsDnd";
import {
    useMoveCardMutation,
    useReorderCardMutation,
    useReorderColumnMutation,
} from "@/services/tasks";
import { IKanbanColumn } from "@/types/tasks";
import useResponsiveColumns from "@/components/TwoDimentionsDnd/useResponsiveColumns";
import React from "react";
import { DroppableTypeItem } from "@/components/TwoDimentionsDnd/types";
import { parseItemId, parseRowId } from "@/components/TwoDimentionsDnd/util";

// --------------------------------------------------------------------

const getColumn = (c: IKanbanColumn) => (
    <Column key={c.id} id={c.id} column={c} />
);

// --------------------------------------------------------------------

const COLUMNS = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 3,
};

// ----------------------------------------------------------------------
// Λεξιλόγιο που χρησιμοποιείται (Αντιστοιχίες)
// task = card
// section = IKanbanColumn = item
// ----------------------------------------------------------------------

const cardId = (str?: string) => {
    if (!str) return null;
    const match = str.match(/task-(\d+)/);
    return match ? parseInt(match[1], 10) : null;
};
const columnId = (str?: string) => {
    if (!str) return null;
    const match = str.match(/section-(\d+)/);
    return match ? parseInt(match[1], 10) : null;
};

interface Props {
    columns: IKanbanColumn[];
}

const Board: FC<Props> = ({ columns }) => {
    const responsiveColumns = useResponsiveColumns(COLUMNS);

    const [moveCard] = useMoveCardMutation();
    const [reorderCard] = useReorderCardMutation();

    const [reorderColumn] = useReorderColumnMutation();

    const handleDragEnd = useCallback(
        ({ source, destination, type, draggableId }: DropResult) => {
            if (type === DroppableTypeItem) {
                const { itemId: draggedItemId } = parseItemId(draggableId);
                const { rowId: dstRow } = parseRowId(destination?.droppableId);
                const dstCol = destination?.index;

                if (
                    draggedItemId === -1 ||
                    dstRow === -1 ||
                    dstCol === null ||
                    dstCol === undefined
                )
                    return;

                let oneDimentionArrayDstIndex =
                    dstRow * responsiveColumns + dstCol;

                /* NOTE: compensate for when user moves a section at the end of the board */
                // if (oneDimentionArrayDstIndex === itemsLength)
                //     oneDimentionArrayDstIndex -= 1;

                console.log("GOT: ", oneDimentionArrayDstIndex);

                // Code for colum reordering
                reorderColumn({
                    columnId: draggedItemId,
                    position: oneDimentionArrayDstIndex,
                });
            }

            if (type === DroppableTypeTask) {
                const sourceCardId = cardId(draggableId);
                const srcColumnId = columnId(source?.droppableId);
                const dstColumnId = columnId(destination?.droppableId);

                if (
                    sourceCardId === null ||
                    dstColumnId === null ||
                    srcColumnId === null
                )
                    return;

                if (srcColumnId === dstColumnId) {
                    const newIndex = destination?.index;
                    if (newIndex === null || newIndex === undefined) return;

                    // reorder inside same column
                    reorderCard({
                        cardId: sourceCardId,
                        position: newIndex,
                        columnId: dstColumnId,
                    });
                } else {
                    // move to different column
                    moveCard({
                        cardId: sourceCardId,
                        srcColumnId,
                        dstColumnId,
                    });
                }
            }
        },
        [responsiveColumns]
    );

    return (
        <TwoDimentionsDnd
            columns={responsiveColumns}
            onDragEnd={handleDragEnd}
            draggableSx={{ justifyContent: "flex-start" }}
        >
            {columns?.map(getColumn)}
        </TwoDimentionsDnd>
    );
};

export default React.memo(Board);
