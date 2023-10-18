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
    setFiles: (files: IPropertyImage[]) => void;
    onImageClick: (i: IPropertyImage) => void;
    onReorder: (keys: string[]) => void;
    onReorderWithVisibility?: (
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
    setFiles,
    onImageClick,
    onReorder,
    onReorderWithVisibility,
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
                const { itemId: draggedItemId, dndId: srcDndId } =
                    parseItemId(draggableId);

                /* src */
                const { rowId: srcRow } = parseRowId(source?.droppableId);
                const srcCol = source?.index;
                /* dst */
                const { rowId: dstRow, dndId: dstDndId } = parseRowId(
                    destination?.droppableId
                );
                const dstCol = destination?.index;

                if (draggedItemId === -1) return;
                if (srcRow === -1 || srcCol === null || srcCol === undefined)
                    return;
                if (dstRow === -1 || dstCol === null || dstCol === undefined)
                    return;
                if (!srcDndId || !dstDndId) return;

                if (srcDndId === dstDndId) {
                    console.log("reorder on same");
                }

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

                // TODO: for diffent dndIds update visibility on setFiles aswell!

                setFiles(updatedItems);

                if (srcDndId === dstDndId) {
                    onReorder && onReorder(updatedItems.map((i) => i.key));
                } else {
                    onReorderWithVisibility &&
                        onReorderWithVisibility(
                            updatedItems.map((i) => i.key),
                            removed.key,
                            dstDndId === 1 ? false : true
                        );
                }
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
