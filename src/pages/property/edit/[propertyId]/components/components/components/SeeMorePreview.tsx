import { Box, Divider } from "@mui/material";
import { useCallback, useMemo } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import {
    parseItemId,
    parseRowId,
} from "src/components/TwoDimentionsDnd/TwoDimentionsDnd";
import { TwoDimentionsDndNoContext } from "src/components/TwoDimentionsDnd/TwoDimentionsDndNoContext";
import { DroppableTypeItem } from "src/components/TwoDimentionsDnd/types";
import { SelectableItem } from "src/components/upload/preview/MultiFilePreviewReorder";
import { IPropertyImage } from "src/types/file";

interface SeeMorePreviewProps {
    files: IPropertyImage[];
    selectMultiple: boolean;
    selectedImages: string[];
    compare: boolean;
    compareImages: string[];
    onImageClick: (i: IPropertyImage) => void;
    onReorder: (keys: string[]) => void;
    onReorderWithVisibility: (
        imageKeys: string[],
        imageKey: string,
        hidden: boolean
    ) => void;
}

const COLUMNS = 5;

export const Over25ImagesPreview = ({
    files,
    selectMultiple,
    selectedImages,
    compare,
    compareImages,
    onImageClick,
    onReorder,
    onReorderWithVisibility,
}: SeeMorePreviewProps) => {
    const createItem = useCallback(
        (image: IPropertyImage, index: number) => ({
            id: image.id,
            value: (
                <SelectableItem
                    selectMultiple={selectMultiple}
                    compare={compare}
                    selected={
                        selectedImages.findIndex((key) => key === image.key) >
                            -1 ||
                        compareImages.findIndex((key) => key === image.key) > -1
                    }
                    image={image}
                    index={index}
                    onClick={() => onImageClick && onImageClick(image)}
                />
            ),
        }),
        [selectMultiple, selectedImages, compare, compareImages]
    );

    const publicImages = useMemo(
        () => files.filter((f) => !f.hidden).map(createItem),
        [files, selectMultiple, selectedImages, compare, compareImages]
    );
    const privateImages = useMemo(
        () => files.filter((f) => f.hidden).map(createItem),
        [files, selectMultiple, selectedImages, compare, compareImages]
    );

    const secondDndStartIndex = useMemo(
        () => publicImages.length,
        [publicImages]
    );

    const handleDragEnd = useCallback(
        ({ type, draggableId, source, destination }: DropResult) => {
            if (type === DroppableTypeItem) {
                const { itemId: draggedItemId, dndId: srcDndId } =
                    parseItemId(draggableId);
                if (draggedItemId === -1) return;

                const { rowId: dstRow, dndId: dstDndId } = parseRowId(
                    destination?.droppableId
                );

                // checks
                if (dstRow < 0) return;
                if (srcDndId === undefined || dstDndId === undefined) return;
                if (srcDndId < 0 || dstDndId < 0) return;
                if (destination?.index === undefined) return;

                const dstCol =
                    (destination?.index -
                        (dstDndId === 1 ? 0 : secondDndStartIndex)) /
                    dstDndId;

                let oneDimentionArrayDstIndex =
                    dstRow * COLUMNS +
                    dstCol +
                    (dstDndId === 1 ? 0 : secondDndStartIndex);

                /* NOTE: compensate for when user moves a section at the end of the board */
                if (oneDimentionArrayDstIndex === files.length)
                    oneDimentionArrayDstIndex -= 1;

                const removedIndex = files.findIndex(
                    (f) => f.id === +draggedItemId
                );
                if (removedIndex < 0) return;

                const updatedItems = [...files];
                const [removed] = updatedItems.splice(removedIndex, 1);
                updatedItems.splice(oneDimentionArrayDstIndex, 0, removed);

                if (srcDndId === dstDndId) {
                    onReorder(updatedItems.map((i) => i.key));
                } else {
                    onReorderWithVisibility(
                        updatedItems.map((i) => i.key),
                        removed.key,
                        dstDndId === 1 ? false : true
                    );
                }

                /* 
                    DEBUGGING:

                    const srcCol = (source?.index - (srcDndId === 1 ? 0 : secondDndStartIndex)) / srcDndId;
                    let oneDimentionArraySrcIndex = srcRow * COLUMNS + srcCol + (srcDndId === 1 ? 0 : secondDndStartIndex);
                    console.log(
                        "1dSrcIndex: ",
                        oneDimentionArraySrcIndex,
                        " 1dDstIndex: ",
                        oneDimentionArrayDstIndex
                    );

                */
            }
        },
        [files, secondDndStartIndex]
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
