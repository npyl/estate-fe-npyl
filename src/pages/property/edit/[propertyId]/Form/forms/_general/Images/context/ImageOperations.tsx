import { createContext, useContext } from "react";
import {
    useBulkDeletePropertyImagesMutation,
    useBulkEditPropertyImagesMutation,
    useDeletePropertyImageMutation,
    useReorderPropertyImagesMutation,
    useReorderPropertyImagesWithSetImageVisibilityMutation,
} from "@/services/properties/file";
import usePropertyUpload from "@/hooks/property/uploadFile";
import { useUploadFileContext } from "./UploadProgress";

type TUploadFiles = (f: File[]) => Promise<void>;
type TBulkEditImages = ReturnType<typeof useBulkEditPropertyImagesMutation>[0];
type TReorderImages = ReturnType<typeof useReorderPropertyImagesMutation>[0];
type TReorderImagesWithVisibility = ReturnType<
    typeof useReorderPropertyImagesWithSetImageVisibilityMutation
>[0];
type TDeleteImage = ReturnType<typeof useDeletePropertyImageMutation>[0];
type TBulkDeleteImages = ReturnType<
    typeof useBulkDeletePropertyImagesMutation
>[0];

export interface ImageOperationsState {
    isLoading: boolean;

    upload: TUploadFiles;
    bulkEditImages: TBulkEditImages;
    reorderImages: TReorderImages;
    reorderImagesWithVisibility: TReorderImagesWithVisibility;
    deleteImage: TDeleteImage;
    bulkDeleteImages: TBulkDeleteImages;
}

export const ImageOperationsContext = createContext<
    ImageOperationsState | undefined
>(undefined);

export const useImageOperations = () => {
    const context = useContext(ImageOperationsContext);
    if (context === undefined) {
        throw new Error(
            "ImageOperationsContext value is undefined. Make sure you use the ImageOperationsContext before using the context."
        );
    }
    return context;
};

export const ImageOperationsProvider: React.FC<
    React.PropsWithChildren<unknown>
> = (props) => {
    const { setUploadProgress } = useUploadFileContext();

    const { uploadFiles, isLoading: isUploading } = usePropertyUpload(
        "image",
        setUploadProgress
    );

    // edit
    const [bulkEditImages] = useBulkEditPropertyImagesMutation();
    // reorder
    const [reorderImages, { isLoading: isLoading0 }] =
        useReorderPropertyImagesMutation();
    const [reorderImagesWithVisibility, { isLoading: isLoading1 }] =
        useReorderPropertyImagesWithSetImageVisibilityMutation();
    // delete
    const [deleteImage, { isLoading: isLoading2 }] =
        useDeletePropertyImageMutation();
    const [bulkDeleteImages, { isLoading: isLoading3 }] =
        useBulkDeletePropertyImagesMutation();

    const isLoading =
        isUploading || isLoading0 || isLoading1 || isLoading2 || isLoading3;

    return (
        <ImageOperationsContext.Provider
            value={{
                isLoading,
                // ...
                upload: uploadFiles,
                bulkEditImages,
                reorderImages,
                reorderImagesWithVisibility,
                deleteImage,
                bulkDeleteImages,
            }}
            {...props}
        />
    );
};
