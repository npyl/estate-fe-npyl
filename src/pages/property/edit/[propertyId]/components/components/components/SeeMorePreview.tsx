import { Box, Divider } from "@mui/material";
import { useCallback, useMemo } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import {
    itemId,
    rowId,
} from "src/components/TwoDimentionsDnd/TwoDimentionsDnd";
import { TwoDimentionsDndNoContext } from "src/components/TwoDimentionsDnd/TwoDimentionsDndNoContext";
import { DroppableTypeItem } from "src/components/TwoDimentionsDnd/types";
import { SelectableItem } from "src/components/upload/preview/MultiFilePreviewReorder";
import { IPropertyImage } from "src/types/file";

interface SeeMorePreviewProps {
    files: IPropertyImage[];
    selectMultiple: boolean;
    selectedImages: string[];
    setFiles: (files: IPropertyImage[]) => void;
    onImageClick: (i: IPropertyImage) => void;
    onReorder: (keys: string[]) => void;
}

const COLUMNS = 5;

export const Over25ImagesPreview = ({
    files,
    selectMultiple,
    selectedImages,
    setFiles,
    onImageClick,
    onReorder,
}: SeeMorePreviewProps) => {
    const createItem = useCallback(
        (image: IPropertyImage, index: number) => ({
            id: index,
            value: (
                <SelectableItem
                    selectMultiple={selectMultiple}
                    selected={selectedImages.includes(image.key)}
                    image={image}
                    index={index}
                    onClick={() => onImageClick && onImageClick(image)}
                />
            ),
        }),
        [selectMultiple, selectedImages]
    );

    const publicImages = useMemo(
        () => files.filter((f) => !f.hidden).map(createItem),
        [files, selectMultiple, selectedImages]
    );
    const privateImages = useMemo(
        () => files.filter((f) => f.hidden).map(createItem),
        [files, selectMultiple, selectedImages]
    );

    const secondDndStartIndex = useMemo(
        () => publicImages.length,
        [publicImages]
    );

    const handleDragEnd = useCallback(
        ({ type, draggableId, source, destination }: DropResult) => {
            console.log(
                "problem: ",
                type,
                " draggableId: ",
                draggableId,
                " source: ",
                source,
                " destination: ",
                destination
            );

            if (type === DroppableTypeItem) {
                const draggedItemId = itemId(draggableId);
                /* src */
                const srcRow = rowId(source?.droppableId);
                const srcCol = source?.index;
                /* dst */
                const dstRow = rowId(destination?.droppableId);
                const dstCol = destination?.index;

                if (draggedItemId === null) return;
                if (srcRow === null || srcCol === null || srcCol === undefined)
                    return;
                if (dstRow === null || dstCol === null || dstCol === undefined)
                    return;

                let oneDimentionArraySrcIndex = srcRow * COLUMNS + srcCol;
                let oneDimentionArrayDstIndex = dstRow * COLUMNS + dstCol;

                /* NOTE: compensate for when user moves a section at the end of the board */
                if (oneDimentionArrayDstIndex === files.length)
                    oneDimentionArrayDstIndex -= 1;

                const updatedItems = [...files];
                const [removed] = updatedItems.splice(
                    oneDimentionArraySrcIndex,
                    1
                );
                updatedItems.splice(oneDimentionArrayDstIndex, 0, removed);

                setFiles(updatedItems);

                onReorder && onReorder(updatedItems.map((i) => i.key));
            }
        },
        [files]
    );

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <TwoDimentionsDndNoContext
                dndId={1}
                startIndex={0}
                items={publicImages}
                columns={COLUMNS}
                gap={0.5}
            />
            <Divider sx={{ mt: 2, mb: 2 }} />
            <TwoDimentionsDndNoContext
                dndId={2}
                startIndex={secondDndStartIndex}
                items={privateImages}
                columns={COLUMNS}
                gap={0.5}
            />
        </DragDropContext>
    );
};
