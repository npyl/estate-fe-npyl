import { useCallback } from "react";
import { DropResult } from "react-beautiful-dnd";
import {
    TwoDimentionsDnd,
    parseItemId,
    parseRowId,
} from "@/components/TwoDimentionsDnd/TwoDimentionsDnd";
import { DroppableTypeItem } from "@/components/TwoDimentionsDnd/types";
import usePropertyImages from "../../../hook";
import { DndItem } from "./types";

interface MultiFilePreviewReorder {
    columns?: number;
    items: DndItem[];
    onReorder: (keys: string[]) => void;
}

export default function MultiFilePreviewReorder({
    columns = 3,
    items,
    onReorder,
}: MultiFilePreviewReorder) {
    const { images } = usePropertyImages();

    const handleDragEnd = useCallback(
        ({ type, draggableId, source, destination }: DropResult) => {
            if (type === DroppableTypeItem) {
                const { itemId: draggedItemId } = parseItemId(draggableId);
                /* src */
                const { rowId: srcRow } = parseRowId(source?.droppableId);
                const srcCol = source?.index;
                /* dst */
                const { rowId: dstRow } = parseRowId(destination?.droppableId);
                const dstCol = destination?.index;

                if (draggedItemId === -1) return;
                if (srcRow === -1 || srcCol === null || srcCol === undefined)
                    return;
                if (dstRow === -1 || dstCol === null || dstCol === undefined)
                    return;

                let oneDimentionArraySrcIndex = srcRow * columns + srcCol;
                let oneDimentionArrayDstIndex = dstRow * columns + dstCol;

                /* NOTE: compensate for when user moves a section at the end of the board */
                if (oneDimentionArrayDstIndex === items.length)
                    oneDimentionArrayDstIndex -= 1;

                const updatedItems = [...images];
                const [removed] = updatedItems.splice(
                    oneDimentionArraySrcIndex,
                    1
                );
                updatedItems.splice(oneDimentionArrayDstIndex, 0, removed);

                onReorder && onReorder(updatedItems.map((i) => i.key));
            }
        },
        [images, columns, items]
    );

    return (
        <TwoDimentionsDnd
            gap={0.2}
            columns={columns}
            items={items}
            onDragEnd={handleDragEnd}
        />
    );
}
