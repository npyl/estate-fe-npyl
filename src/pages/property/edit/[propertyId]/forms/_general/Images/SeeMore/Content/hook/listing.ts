import { useCallback, useMemo } from "react";
import usePropertyImages from "../../../hook";
import { DropResult } from "react-beautiful-dnd";
import { IPropertyImage } from "@/types/file";
import { DndItem } from "../PreviewReorder/types";
import TUseContentOperations from "./type";
import { TListingTab } from "../../types";

const isLoading = false;

const useListingContentOperations: TUseContentOperations = (
    tab: TListingTab,
    createItemCb: (f: IPropertyImage, index: number) => DndItem
) => {
    const { images } = usePropertyImages();

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

    const handleDragEnd = useCallback(
        ({ type, draggableId, source, destination }: DropResult) => {},
        []
    );

    return { publicImages, privateImages, isLoading, handleDragEnd };
};

export default useListingContentOperations;
