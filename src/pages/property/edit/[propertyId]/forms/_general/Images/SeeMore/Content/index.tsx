import { useMemo } from "react";
import MultiFilePreviewReorder from "./PreviewReorder/Normal";
import Over25ImagesPreview from "./PreviewReorder/Over25";
import { IPropertyImage } from "@/types/file";
import usePropertyImages from "../../hook";
import {
    useReorderPropertyImagesMutation,
    useReorderPropertyImagesWithSetImageVisibilityMutation,
} from "@/services/properties/file";
import { DndItem } from "./PreviewReorder/types";

interface ContentProps {
    createItemCb: (f: IPropertyImage, index: number) => DndItem;
}

const Content: React.FC<ContentProps> = ({ createItemCb }) => {
    const { images, propertyId } = usePropertyImages();

    const [reorderImages] = useReorderPropertyImagesMutation();
    const [reorderImagesWithVisibility] =
        useReorderPropertyImagesWithSetImageVisibilityMutation();

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

    const { items, publicImages, privateImages } = useMemo(
        () => ({
            items: images.length <= 25 ? images.map(createItemCb) : [],

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

    return (
        <>
            {images.length > 25 ? (
                <Over25ImagesPreview
                    publicImages={publicImages}
                    privateImages={privateImages}
                    onReorder={handleReorder}
                    onReorderWithVisibility={handleReorderWithVisibility}
                />
            ) : (
                <MultiFilePreviewReorder
                    items={items}
                    columns={5}
                    onReorder={handleReorder}
                />
            )}
        </>
    );
};

export default Content;
