import { Divider } from "@mui/material";
import { useCallback, useMemo } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import {
    parseItemId,
    parseRowId,
} from "@/components/TwoDimentionsDnd/TwoDimentionsDnd";
import { TwoDimentionsDndNoContext } from "@/components/TwoDimentionsDnd/TwoDimentionsDndNoContext";
import { DroppableTypeItem } from "@/components/TwoDimentionsDnd/types";
import { DndItem } from "./types";
import usePropertyImages from "../../../hook";

const COLUMNS = 5;

interface ImagePreviewReorderProps {
    publicImages: DndItem[];
    privateImages: DndItem[];
    onReorder: (keys: string[]) => void;
    onReorderWithVisibility: (
        imageKeys: string[],
        imageKey: string,
        hidden: boolean
    ) => void;
}

const Over25ImagesPreview = ({
    publicImages,
    privateImages,
    onReorder,
    onReorderWithVisibility,
}: ImagePreviewReorderProps) => {
    const { images } = usePropertyImages();

    const { publicKeys, privateKeys } = useMemo(
        () => ({
            publicKeys: images
                .filter(({ hidden }) => !hidden)
                .map(({ key }) => key),

            privateKeys: images
                .filter(({ hidden }) => hidden)
                .map(({ key }) => key),
        }),
        [images]
    );

    const secondDndStartIndex = publicImages.length;

    const handleDragEnd = useCallback(
        ({ type, draggableId, source, destination }: DropResult) => {
            if (type !== DroppableTypeItem) return;

            const { itemId: draggedItemId, dndId: srcDndId } =
                parseItemId(draggableId);
            if (draggedItemId === -1) return;

            const { rowId: srcRow } = parseRowId(source.droppableId);
            const { rowId: dstRow, dndId: dstDndId } = parseRowId(
                destination?.droppableId
            );

            // checks
            if (dstRow < 0) return;
            if (srcDndId === undefined || dstDndId === undefined) return;
            if (srcDndId < 0 || dstDndId < 0) return;
            if (destination?.index === undefined) return;

            let updatedItems = [...publicKeys, ...privateKeys];

            // Calculate srcIdx
            const srcCol =
                (source?.index - (srcDndId === 1 ? 0 : secondDndStartIndex)) /
                srcDndId;
            const srcIdx =
                srcRow * COLUMNS +
                srcCol +
                (srcDndId === 1 ? 0 : secondDndStartIndex);

            // Calculate dstIdx
            const dstCol =
                (destination?.index -
                    (dstDndId === 1 ? 0 : secondDndStartIndex)) /
                dstDndId;
            let dstIdx =
                dstRow * COLUMNS +
                dstCol +
                (dstDndId === 1 ? 0 : secondDndStartIndex);

            /* NOTE: compensate for when user moves a section at the end of the board */
            if (dstIdx === updatedItems.length) dstIdx -= 1;

            const [removedKey] = updatedItems.splice(srcIdx, 1);
            updatedItems.splice(dstIdx, 0, removedKey);

            if (srcDndId === dstDndId) {
                onReorder(updatedItems);
            } else {
                onReorderWithVisibility(
                    updatedItems,
                    removedKey,
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
        },
        [
            publicKeys,
            privateKeys,
            secondDndStartIndex,
            onReorder,
            onReorderWithVisibility,
        ]
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

export default Over25ImagesPreview;
