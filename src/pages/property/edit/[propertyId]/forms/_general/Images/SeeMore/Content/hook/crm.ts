import { useCallback, useMemo } from "react";
import usePropertyImages from "../../../hook";
import { useImageOperations } from "../../../context/ImageOperations";
import { DropResult } from "react-beautiful-dnd";
import { DroppableTypeItem } from "@/components/TwoDimentionsDnd/types";
import { parseItemId, parseRowId } from "@/components/TwoDimentionsDnd/util";
import { IPropertyImage } from "@/types/file";
import { DndItem } from "../PreviewReorder/types";
import TUseContentOperations from "./type";
import { TListingTab } from "../../types";

const COLUMNS = 5;

const useCRMContentOperations: TUseContentOperations = (
    _: TListingTab,
    createItemCb: (f: IPropertyImage, index: number) => DndItem
) => {
    const { images, propertyId } = usePropertyImages();

    const { publicImages, privateImages } = useMemo(
        () => ({
            publicImages:
                images.length > 25
                    ? images.filter((f) => !f.hidden).map(createItemCb)
                    : [],
            privateImages:
                images.length > 25
                    ? images.filter((f) => f.hidden).map(createItemCb)
                    : [],
        }),
        [images, createItemCb]
    );

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

    const secondDndStartIndex = publicKeys.length;

    const { reorderImages, reorderImagesWithVisibility, isLoading } =
        useImageOperations();

    const handleReorder = (items: string[]) =>
        reorderImages({ id: propertyId, body: items });

    const handleReorderWithVisibility = (
        imageKeys: string[],
        imageKey: string,
        hidden: boolean
    ) =>
        reorderImagesWithVisibility({
            propertyId,
            imageKeys,
            imageKey,
            hidden,
        });

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
                handleReorder(updatedItems);
            } else {
                handleReorderWithVisibility(
                    updatedItems,
                    removedKey,
                    dstDndId === 1 ? false : true
                );
            }
        },
        [publicKeys, privateKeys, secondDndStartIndex]
    );

    return { publicImages, privateImages, isLoading, handleDragEnd };
};

export default useCRMContentOperations;
