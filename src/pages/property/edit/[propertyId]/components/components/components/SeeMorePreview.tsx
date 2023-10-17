import { Divider } from "@mui/material";
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
    const items = useMemo(
        () =>
            files.map((f, index) => ({
                id: index,
                value: (
                    <SelectableItem
                        selectMultiple={selectMultiple}
                        selected={
                            selectedImages.findIndex((key) => key === f.key) >
                            -1
                        }
                        image={f}
                        index={index}
                        onClick={() => onImageClick && onImageClick(f)}
                    />
                ),
            })),
        [files, selectMultiple, selectedImages]
    );

    const publicImages = useMemo(
        () =>
            files
                .filter((f) => !f.hidden)
                .map((f, index) => ({
                    id: index,
                    value: (
                        <SelectableItem
                            selectMultiple={selectMultiple}
                            selected={
                                selectedImages.findIndex(
                                    (key) => key === f.key
                                ) > -1
                            }
                            image={f}
                            index={index}
                            onClick={() => onImageClick && onImageClick(f)}
                        />
                    ),
                })),
        [files, selectMultiple, selectedImages]
    );
    const privateImages = useMemo(
        () =>
            files
                .filter((f) => f.hidden)
                .map((f, index) => ({
                    id: index,
                    value: (
                        <SelectableItem
                            selectMultiple={selectMultiple}
                            selected={
                                selectedImages.findIndex(
                                    (key) => key === f.key
                                ) > -1
                            }
                            image={f}
                            index={index}
                            onClick={() => onImageClick && onImageClick(f)}
                        />
                    ),
                })),
        [files, selectMultiple, selectedImages]
    );

    const handleDragEnd = useCallback(
        ({ type, draggableId, source, destination }: DropResult) => {
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
                if (oneDimentionArrayDstIndex === items.length)
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
            <TwoDimentionsDndNoContext items={publicImages} columns={COLUMNS} />
            <Divider />
            <TwoDimentionsDndNoContext
                items={privateImages}
                columns={COLUMNS}
            />
        </DragDropContext>
    );
};
