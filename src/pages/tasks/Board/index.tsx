import Column, { DroppableTypeTask } from "./column";
import { DropResult } from "react-beautiful-dnd";

import { FC, useMemo } from "react";
import { TwoDimentionsDnd } from "src/components/TwoDimentionsDnd/TwoDimentionsDnd";
import { useMoveCardMutation, useReorderCardMutation } from "@/services/tasks";
import { IKanbanBoard } from "@/types/tasks";
import useResponsiveColumns from "@/components/TwoDimentionsDnd/useResponsiveColumns";

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
    board: IKanbanBoard;
}

const Board: FC<Props> = ({ board }) => {
    const responsiveColumns = useResponsiveColumns(COLUMNS);

    const [moveCard] = useMoveCardMutation();
    const [reorderCard] = useReorderCardMutation();

    const items = useMemo(
        () =>
            board?.columnOrder.map((columnId) => {
                // get column for id
                const column = board.columns?.find((c) => c.id === columnId);
                if (!column) return null;

                return <Column id={columnId} key={columnId} column={column} />;
            }),
        [board?.columnOrder, board?.columns]
    );

    const handleDragEnd = ({
        source,
        destination,
        type,
        draggableId,
    }: DropResult) => {
        // if (type === DroppableTypeItem) {
        //     const { itemId: draggedItemId } = parseItemId(draggableId);
        //     const { rowId: dstRow } = parseRowId(destination?.droppableId);
        //     const dstCol = destination?.index;

        //     if (
        //         draggedItemId === -1 ||
        //         dstRow === -1 ||
        //         dstCol === null ||
        //         dstCol === undefined
        //     )
        //         return;

        //     let oneDimentionArrayDstIndex = dstRow * responsiveColumns + dstCol;

        //     /* NOTE: compensate for when user moves a section at the end of the board */
        //     if (oneDimentionArrayDstIndex === itemsLength)
        //         oneDimentionArrayDstIndex -= 1;

        //Code for colum reordering
        // reorderColumn({
        //     columnId: draggedItemId,
        //     position: oneDimentionArrayDstIndex,
        // });
        // }

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
                moveCard({ cardId: sourceCardId, srcColumnId, dstColumnId });
            }
        }
    };

    return (
        <TwoDimentionsDnd
            columns={responsiveColumns}
            onDragEnd={handleDragEnd}
            draggableSx={{ justifyContent: "flex-start" }}
        >
            {items}
        </TwoDimentionsDnd>
    );
};

export default Board;
