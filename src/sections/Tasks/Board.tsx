import Column, { DroppableTypeTask } from "./column";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { FC, useCallback } from "react";
import {
    useMoveCardMutation,
    useReorderCardMutation,
    useReorderColumnMutation,
} from "@/services/tasks";
import { IKanbanColumn } from "@/types/tasks";
import React from "react";
import { DroppableTypeItem } from "@/components/TwoDimentionsDnd/types";
import { parseItemId, parseRowId } from "@/components/TwoDimentionsDnd/util";
import { useFiltersContext } from "./filters";
import DroppableRow from "@/components/TwoDimentionsDnd/DroppableRow";

// --------------------------------------------------------------------

const getColumn = (c: IKanbanColumn) => (
    <Column key={c.id} id={c.id} column={c} />
);

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
    const { search, priority, assigneeId } = useFiltersContext();
    const filters = { search, priority, assigneeId };

    const [moveCard] = useMoveCardMutation();
    const [reorderCard] = useReorderCardMutation();

    const [reorderColumn] = useReorderColumnMutation();

    const columnsCount = columns.length;

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

                let oneDimentionArrayDstIndex = dstRow * columnsCount + dstCol;

                // Code for colum reordering
                reorderColumn({
                    columnId: draggedItemId,
                    position: oneDimentionArrayDstIndex,
                    filters,
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

                const position = destination?.index ?? 0;

                if (srcColumnId === dstColumnId) {
                    // reorder inside same column
                    reorderCard({
                        cardId: sourceCardId,
                        columnId: dstColumnId,
                        position,
                        filters,
                    });
                } else {
                    // move to different column
                    moveCard({
                        cardId: sourceCardId,
                        srcColumnId,
                        dstColumnId,
                        position,
                        filters,
                    });
                }
            }
        },
        [filters, columnsCount]
    );

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <DroppableRow
                mt={1}
                index={0}
                gap={1}
                wrap="nowrap"
                overflow="auto hidden"
            >
                {columns?.map(getColumn)}
            </DroppableRow>
        </DragDropContext>
    );
};

export default React.memo(Board);
