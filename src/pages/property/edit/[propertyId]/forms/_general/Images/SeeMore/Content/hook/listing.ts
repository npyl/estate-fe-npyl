import { useCallback, useMemo } from "react";
import usePropertyImages from "../../../hook";
import { DropResult } from "react-beautiful-dnd";
import TUseContentOperations from "./type";
import { useGetIntegrationOrderedImagesQuery } from "@/services/integrations";
import { IntegrationSite } from "@/types/listings";

const isLoading = false;

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

    const { publicImages, privateImages } = useMemo(() => {
        const tmp =
            data
                ?.map(({ image: { id: _id } }) =>
                    images.find(({ id }) => id === _id)
                )
                .filter((img) => !!img) || [];

        // all images that come from the endpoint are in the first section
        const publicImages = tmp.map(createItemCb) || [];

        // all images that do not are supposed to be hidden from the integration
        const privateImages =
            images
                ?.filter(
                    ({ id }) =>
                        data?.findIndex(
                            ({ image: { id: _id } }) => id === _id
                        ) === -1
                )
                .filter((img) => !!img)
                .map(createItemCb) || [];

        return {
            publicImages,
            privateImages,
        };
    }, [images, data, createItemCb]);

    const handleDragEnd = useCallback(
        ({ type, draggableId, source, destination }: DropResult) => {},
        []
    );

    return { publicImages, privateImages, isLoading, handleDragEnd };
};

export default useListingContentOperations;
