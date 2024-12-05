import React, { useCallback, useRef, RefObject, useLayoutEffect } from "react";
import Column, { DroppableTypeTask } from "./column";
import { DropResult } from "react-beautiful-dnd";
import {
    useMoveCardMutation,
    useReorderCardMutation,
    useReorderColumnMutation,
} from "@/services/tasks";
import { IKanbanColumn } from "@/types/tasks";
import {
    DroppableTypeItem,
    TRowProps,
} from "@/components/TwoDimentionsDnd/types";
import { parseItemId, parseRowId } from "@/components/TwoDimentionsDnd/util";
import { useFiltersContext } from "./filters";
import { TwoDimentionsDnd } from "@/components/TwoDimentionsDnd/TwoDimentionsDnd";
import { GridProps } from "@mui/material/Grid";

// --------------------------------------------------------------------

const getColumn = (c: IKanbanColumn) => (
    <Column key={c.id} id={c.id} column={c} />
);

const DraggableProps: Omit<GridProps, "columns" | "sx" | "item"> = {
    xs: 12,
    sm: 6,
    md: 4,
    lg: 3,
    xl: 12 / 5,
    flexShrink: 0,
    height: "100vh",
};

const RowProps: TRowProps = {
    wrap: "nowrap",
    overflow: "auto",
};

const useAvailableHeight = (targetRef: RefObject<HTMLDivElement>) => {
    useLayoutEffect(() => {
        const boardElement = targetRef.current;
        if (!boardElement) return;

        const boardTop = boardElement.getBoundingClientRect().top;
        const buffer = 16;
        const availableHeight = window.innerHeight - boardTop - buffer;
        const newHeight = `${availableHeight}px`;

        targetRef.current.style.height = newHeight;
    }, []);
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

const Board: React.FC<Props> = ({ columns }) => {
    const { search, priority, assigneeId } = useFiltersContext();
    const filters = { search, priority, assigneeId };

    const rowRef = useRef<HTMLDivElement>(null);
    useAvailableHeight(rowRef);

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
                    reorderCard({
                        cardId: sourceCardId,
                        columnId: dstColumnId,
                        position,
                        filters,
                    });
                } else {
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
        <TwoDimentionsDnd
            columns={columns.length}
            gap={1}
            draggableProps={DraggableProps}
            // ...
            rowProps={RowProps}
            rowRef={rowRef}
            // ...
            onDragEnd={handleDragEnd}
        >
            {columns?.map(getColumn)}
        </TwoDimentionsDnd>
    );
};

export default React.memo(Board);
