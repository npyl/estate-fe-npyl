import {
    IPropertyImagePOST,
    IPropertyBlueprintPOST,
    IPropertyImage,
    IPropertyDocumentPOST,
    IPropertyFileRes,
} from "src/types/file";

import axios, { AxiosProgressEvent } from "axios";

import { properties } from "../properties";
import {
    optimisticAddBlueprint,
    optimisticAddDocument,
    optimisticAddImage,
    optimisticBulkDeleteImages,
    optimisticDeleteImage,
    optimisticReorder,
    optimisticReorderWithVisibility,
} from "./optimistic";
import {
    BulkDeletePropertyImagesParams,
    IDeleteFileProps,
    IDeleteImageProps,
    IPropertyAddFileParams,
    ReorderImagesWithSetImageVisibility,
} from "./types";
import {
    bulkDeleteImagesQueryFn,
    deleteImageQueryFn,
    reorderImagesWithVisibilityQueryFn,
    reorderQueryFn,
} from "./queryFn";

const removeMetadata = async (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error("Failed to convert image to Blob."));
                }
            }, file.type);
        };
        img.onerror = () => {
            reject(new Error("Failed to load image for processing."));
        };

        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            img.src = e.target?.result as string;
        };
        reader.onerror = () => {
            reject(new Error("Failed to read file."));
        };
        reader.readAsDataURL(file);
    });
};

interface IPropertySetThumbnailProps {
    propertyId: number;
    imageKey: string;
}
interface BulkEditPropertyImagesParams {
    propertyId: number;
    body: {
        imageKeys: string[];
        hidden: boolean;
    };
}

interface UploadDocumentToAmazonProps {
    variant: "image" | "blueprint" | "document" | "googleEarth" | "OTHER"; // INFO: for image variant, we must also strip metadata
    url: string;
    file: File;
    onProgressUpdate?: (p: number) => void;
}

interface UploadResponse {
    success: boolean;
}

export const filesApiSlice = properties.injectEndpoints({
    endpoints: (builder) => ({
        getPropertyImages: builder.query<IPropertyImage[], number>({
            query: (propertyId) => `${propertyId}/images`,
            providesTags: ["PropertyByIdImages"],
        }),

        // ---------------------------------------------------------------------------------------------------------------------------------------------
        // Add
        // ---------------------------------------------------------------------------------------------------------------------------------------------
        // WARN: Do not add the tags! addPropertyImage needs to be used optimistically, to explicitly set the url null and know to show a preview Image.
        // invalidatesTags: ["Properties", "PropertyById"],
        //

        addPropertyImage: builder.mutation<
            IPropertyFileRes,
            IPropertyAddFileParams<IPropertyImagePOST>
        >({
            // INFO: asks for an amazon url from backend; to be used before uploadPropertyImage
            query: ({ id, body }) => ({
                url: `/${id}/image`,
                method: "POST",
                body,
            }),
            onQueryStarted: optimisticAddImage,
        }),
        addPropertyBlueprint: builder.mutation<
            IPropertyFileRes,
            IPropertyAddFileParams<IPropertyBlueprintPOST>
        >({
            query: ({ id, body }) => ({
                url: `/${id}/blueprint`,
                method: "POST",
                body,
            }),
            onQueryStarted: optimisticAddBlueprint,
        }),
        addPropertyDocument: builder.mutation<
            IPropertyFileRes,
            IPropertyAddFileParams<IPropertyDocumentPOST>
        >({
            query: ({ id, body }) => ({
                url: `/${id}/document`,
                method: "POST",
                body,
            }),
            onQueryStarted: optimisticAddDocument,
        }),

        //
        // EDIT
        //

        editPropertyImage: builder.mutation<
            IPropertyFileRes,
            IPropertyAddFileParams<IPropertyImagePOST>
        >({
            // INFO: same with add but causes revalidate
            query: ({ id, body }) => ({
                url: `/${id}/image`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["PropertyByIdImages"],
        }),

        setPropertyThumbail: builder.mutation<void, IPropertySetThumbnailProps>(
            {
                query: ({ propertyId, imageKey }) => ({
                    url: `/${propertyId}/thumbnail/${imageKey}`,
                    method: "POST",
                }),
            }
        ),

        bulkEditPropertyImages: builder.mutation<
            void,
            BulkEditPropertyImagesParams
        >({
            query: ({ propertyId, body }) => ({
                url: `/${propertyId}/images/edit/bulk`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["PropertyByIdImages"],
        }),

        reorderPropertyImages: builder.mutation<
            number,
            IPropertyAddFileParams<string[]>
        >({
            queryFn: reorderQueryFn,
            onQueryStarted: optimisticReorder,
            invalidatesTags: ["PropertyByIdImages"],
        }),

        reorderPropertyImagesWithSetImageVisibility: builder.mutation<
            IPropertyFileRes,
            ReorderImagesWithSetImageVisibility
        >({
            queryFn: reorderImagesWithVisibilityQueryFn,
            onQueryStarted: optimisticReorderWithVisibility,
            invalidatesTags: ["PropertyByIdImages"],
        }),

        // ---------------------------------------------------------------
        //  DELETE
        // ---------------------------------------------------------------

        //  Deletes a propertyImage by imageKey (updates thumbnail if necessary)
        deletePropertyImage: builder.mutation<number, IDeleteImageProps>({
            queryFn: deleteImageQueryFn,
            onQueryStarted: optimisticDeleteImage,
            invalidatesTags: ["PropertyByIdImages"],
        }),
        //  Deletes propertyImages by imageKeys (updates thumbnail if necessary)
        bulkDeletePropertyImages: builder.mutation<
            number,
            BulkDeletePropertyImagesParams
        >({
            queryFn: bulkDeleteImagesQueryFn,
            onQueryStarted: optimisticBulkDeleteImages,
            invalidatesTags: ["PropertyByIdImages"],
        }),
        deletePropertyBlueprint: builder.mutation<void, IDeleteFileProps>({
            query: ({ propertyId, imageKey }) => ({
                url: `/${propertyId}/blueprint/${imageKey}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Properties", "PropertyById"],
        }),
        deletePropertyDocument: builder.mutation<void, IDeleteFileProps>({
            query: ({ propertyId, imageKey: documentKey }) => ({
                url: `/${propertyId}/document/${documentKey}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Properties", "PropertyById"],
        }),

        // ---------------------------------------------------------------
        //  UPLOAD
        // ---------------------------------------------------------------
        uploadPropertyFile: builder.mutation<
            UploadResponse,
            UploadDocumentToAmazonProps
        >({
            // INFO: upload to amazon
            async queryFn({ variant, url, file, onProgressUpdate }) {
                try {
                    // INFO: strip image metadata only if we have image
                    const cleanFile =
                        variant === "image" ? await removeMetadata(file) : file;

                    const handleUploadProgress = ({
                        loaded,
                    }: AxiosProgressEvent) => {
                        if (onProgressUpdate) {
                            // Calculate and report the upload progress here
                            const progress = Math.round(
                                (loaded / file.size) * 100
                            );

                            onProgressUpdate(progress);
                        }
                    };

                    const response = await axios.put(url, cleanFile, {
                        headers: {
                            "Content-Type": file.type,
                        },
                        onUploadProgress: handleUploadProgress,
                    });

                    if (response.status !== 200) {
                        return {
                            error: {
                                error: response.statusText,
                                status: "FETCH_ERROR",
                            },
                        };
                    }

                    return { data: response.data };
                } catch (error) {
                    return {
                        error: {
                            error: error.message,
                            status: "FETCH_ERROR",
                        },
                    };
                }
            },
            // WARN: Do not add the tags! We use Promise.all on uploadPropertyImage to wait for all the photos to upload.
            //          This is because, every photo contains a non-null url, but it is not ready for fetching.
            // invalidatesTags: ["Properties", "PropertyById"],
        }),
    }),
});

export const {
    useGetPropertyImagesQuery,

    useAddPropertyImageMutation,
    useEditPropertyImageMutation,
    useSetPropertyThumbailMutation,
    useBulkEditPropertyImagesMutation,
    useBulkDeletePropertyImagesMutation,
    useDeletePropertyImageMutation,
    useLazyGetPropertyBlueprintsQuery,
    useReorderPropertyImagesMutation,
    useReorderPropertyImagesWithSetImageVisibilityMutation,

    useAddPropertyBlueprintMutation,
    useDeletePropertyBlueprintMutation,

    useAddPropertyDocumentMutation,
    useDeletePropertyDocumentMutation,

    useUploadPropertyFileMutation,
} = filesApiSlice;
