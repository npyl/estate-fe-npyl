import { useCallback, useMemo } from "react";
import usePropertyImages from "../../../hook";
import { DropResult } from "react-beautiful-dnd";
import { IPropertyImage } from "@/types/file";
import { DndItem } from "../PreviewReorder/types";
import TUseContentOperations from "./type";
import { TListingTab } from "../../types";
import { useGetIntegrationOrderedImagesQuery } from "@/services/integrations";
import { IntegrationSite } from "@/types/listings";

const isLoading = false;

const useListingContentOperations: TUseContentOperations = (
    tab: TListingTab,
    createItemCb: (f: IPropertyImage, index: number) => DndItem
) => {
    const { images, propertyId } = usePropertyImages();

    const { data } = useGetIntegrationOrderedImagesQuery({
        integrationSite: tab as IntegrationSite,
        propertyId,
    });

    const { publicImages, privateImages } = useMemo(
        () => ({
            publicImages:
                data
                    ?.map(({ image: { id: _id } }) =>
                        images.find(({ id }) => id === _id)
                    )
                    .filter((img) => !!img)
                    .map(createItemCb) || [],

            privateImages:
                data
                    ?.map(({ image: { id: _id } }) =>
                        images.find(({ id }) => id !== _id)
                    )
                    .filter((img) => !!img)
                    .map(createItemCb) || [],
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
