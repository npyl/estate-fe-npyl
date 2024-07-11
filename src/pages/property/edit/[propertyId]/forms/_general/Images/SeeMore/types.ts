import { IPropertyImage } from "@/types/file";

export interface ImagePreviewReorderProps {
    compare: boolean;
    selectMultiple: boolean;
    selectedImages: string[];
    onImageClick: (i: IPropertyImage) => void;
    onReorder: (keys: string[]) => void;
    onReorderWithVisibility: (
        imageKeys: string[],
        imageKey: string,
        hidden: boolean
    ) => void;
}
