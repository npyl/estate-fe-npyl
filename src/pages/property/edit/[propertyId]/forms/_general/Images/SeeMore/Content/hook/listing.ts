import { useCallback, useMemo } from "react";
import usePropertyImages from "../../../hook";
import { DropResult } from "react-beautiful-dnd";
import TUseContentOperations from "./type";
import {
    useGetIntegrationOrderedImagesQuery,
    useSetIntegrationOrderedImagesMutation,
} from "@/services/integrations";
import { IntegrationSite } from "@/types/listings";
import { DroppableTypeItem } from "@/components/TwoDimentionsDnd/types";
import { parseItemId, parseRowId } from "@/components/TwoDimentionsDnd/util";

const isLoading = false;
const COLUMNS = 5;

const useListingContentOperations: TUseContentOperations = (
    tab,
    createItemCb
) => {
    const { images, propertyId } = usePropertyImages();

    const { data } = useGetIntegrationOrderedImagesQuery(
        {
            integrationSite: tab as IntegrationSite,
            propertyId,
        },
        { skip: tab === "CRM" }
    );

    const [reorder] = useSetIntegrationOrderedImagesMutation();

    const { publicImages, privateImages, publicIds, privateIds } =
        useMemo(() => {
            const tmp =
                data
                    ?.map(({ image: { id: _id } }) =>
                        images.find(({ id }) => id === _id)
                    )
                    .filter((img) => !!img) || [];

            const tmp2 = images
                ?.filter(
                    ({ id }) =>
                        data?.findIndex(
                            ({ image: { id: _id } }) => id === _id
                        ) === -1
                )
                .filter((img) => !!img);

            // all images that come from the endpoint are in the first section
            const publicImages = tmp.map(createItemCb) || [];

            // all images that do not are supposed to be hidden from the integration
            const privateImages = tmp2.map(createItemCb) || [];

            return {
                publicImages,
                privateImages,

                publicIds: tmp.map(({ id }) => id),
                privateIds: tmp2.map(({ id }) => id),
            };
        }, [images, data, createItemCb]);

    // Combinations:
    //  1. public -> public    (REORDER)
    //  2. public -> private   (make private)
    //  3. private -> private  (NOT PERMITTED)
    //  4. private -> public   (REORDER + make public)
    const handleDragEnd = useCallback(
        ({ type, draggableId, source, destination }: DropResult) => {
            if (type !== DroppableTypeItem) return;

            const { dndId: srcDndId } = parseItemId(draggableId);
            const { rowId: srcRow } = parseRowId(source.droppableId);
            const { rowId: dstRow, dndId: dstDndId } = parseRowId(
                destination?.droppableId
            );

            // checks
            if (dstRow < 0) return;
            if (srcDndId === undefined || dstDndId === undefined) return;
            if (srcDndId < 0 || dstDndId < 0) return;
            if (destination?.index === undefined) return;

            // Prevent reorders on private photos (we do not care and it is not possible anyway)
            if (srcDndId === dstDndId && dstDndId === 2) return;

            const secondDndStartIndex = publicImages.length;

            let updatedItems = [...publicIds];

            // Calculate srcIdx
            const srcCol =
                (source?.index - (srcDndId === 1 ? 0 : secondDndStartIndex)) /
                srcDndId;
            const srcIdx = srcRow * COLUMNS + srcCol;

            // Calculate dstIdx
            const dstCol =
                (destination?.index -
                    (dstDndId === 1 ? 0 : secondDndStartIndex)) /
                dstDndId;
            let dstIdx = dstRow * COLUMNS + dstCol;

            /* NOTE: compensate for when user moves a section at the end of the board */
            if (dstIdx === updatedItems.length) dstIdx -= 1;

            // 1.
            if (srcDndId === dstDndId && dstDndId === 1) {
                const [removedItem] = updatedItems.splice(srcIdx, 1);
                updatedItems.splice(dstIdx, 0, removedItem);
            }
            // 2.
            if (srcDndId === 1 && dstDndId === 2) {
                const removedId = updatedItems[srcIdx];
                updatedItems = updatedItems.filter((id) => id !== removedId);
            }
            // 4.
            if (srcDndId === 2 && dstDndId === 1) {
                const draggedItemId = privateIds[srcIdx];
                updatedItems.splice(dstIdx, 0, draggedItemId);
            }

            reorder({
                integrationSite: tab as IntegrationSite,
                propertyId,
                propertyImages: updatedItems,
            });
        },
        [tab, publicIds, privateIds]
    );

    return { publicImages, privateImages, isLoading, handleDragEnd };
};

export default useListingContentOperations;
