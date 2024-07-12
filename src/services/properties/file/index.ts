import {
    IPropertyImageReq,
    IPropertyImage,
    IPropertyFileRes,
    IPropertyFileReq,
    IPropertyBlueprint,
    IPropertyDocument,
    TFileVariant,
} from "src/types/file";

import axios, { AxiosProgressEvent } from "axios";

import { properties } from "../properties";
import {
    optimisticAddFile,
    optimisticBulkDeleteImages,
    optimisticDeleteImage,
    optimisticReorder,
    optimisticReorderWithVisibility,
} from "./optimistic";
import {
    BulkDeletePropertyImagesParams,
    IDeleteFileProps,
    IPropertyAddFileParams,
    IPropertyFileManipulation,
    ReorderImagesWithSetImageVisibility,
} from "./types";
import {
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

interface BulkEditPropertyImagesParams {
    propertyId: number;
    body: {
        imageKeys: string[];
        hidden: boolean;
    };
}

interface UploadDocumentToAmazonProps {
    variant: TFileVariant; // INFO: for image variant, we must also strip metadata
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
        getPropertyBlueprints: builder.query<IPropertyBlueprint[], number>({
            query: (propertyId) => `${propertyId}/blueprints`,
            providesTags: ["PropertyByIdBlueprints"],
        }),
        getPropertyDocuments: builder.query<IPropertyDocument[], number>({
            query: (propertyId) => `${propertyId}/documents`,
            providesTags: ["PropertyByIdDocuments"],
        }),

        // ---------------------------------------------------------------------------------------------------------------------------------------------
        // Add
        // ---------------------------------------------------------------------------------------------------------------------------------------------
        // WARN: Do not add the tags! addPropertyImage needs to be used optimistically, to explicitly set the url null and know to show a preview Image.
        // invalidatesTags: ["Properties", "PropertyById"],
        //

        addPropertyFile: builder.mutation<
            IPropertyFileRes,
            IPropertyAddFileParams<IPropertyFileReq>
        >({
            // INFO: asks for an amazon url from backend; to be used before uploadPropertyImage
            query: ({ id, body, variant }) => ({
                url: `/${id}/${variant}`,
                method: "POST",
                body,
            }),
            onQueryStarted: optimisticAddFile,
        }),

        //
        // EDIT
        //

        editPropertyImage: builder.mutation<
            IPropertyFileRes,
            IPropertyFileManipulation<IPropertyImageReq>
        >({
            // INFO: same with add but causes revalidate
            query: ({ id, body }) => ({
                url: `/${id}/image`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["PropertyByIdImages"],
        }),

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
            IPropertyFileManipulation<string[]>
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

        //  Deletes a propertyImage by imageKey
        deletePropertyImage: builder.mutation<number, IDeleteFileProps>({
            queryFn: deleteImageQueryFn,
            onQueryStarted: optimisticDeleteImage,
            invalidatesTags: ["PropertyByIdImages"],
        }),
        //  Deletes propertyImages by imageKeys
        bulkDeletePropertyImages: builder.mutation<
            number,
            BulkDeletePropertyImagesParams
        >({
            query: ({ propertyId, imageKeys }) => ({
                url: `/${propertyId}/images/delete/bulk`,
                method: "DELETE",
                body: imageKeys,
            }),
            onQueryStarted: optimisticBulkDeleteImages,
            invalidatesTags: ["PropertyByIdImages"],
        }),
        deletePropertyBlueprint: builder.mutation<void, IDeleteFileProps>({
            query: ({ propertyId, imageKey }) => ({
                url: `/${propertyId}/blueprint/${imageKey}`,
                method: "DELETE",
            }),
            invalidatesTags: ["PropertyByIdBlueprints"],
        }),
        deletePropertyDocument: builder.mutation<void, IDeleteFileProps>({
            query: ({ propertyId, imageKey: documentKey }) => ({
                url: `/${propertyId}/document/${documentKey}`,
                method: "DELETE",
            }),
            invalidatesTags: ["PropertyByIdDocuments"],
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
                        total,
                    }: AxiosProgressEvent) => {
                        if (!total) return;

                        const progress = Math.min(
                            Math.round((loaded / total) * 100),
                            100
                        );

                        onProgressUpdate?.(progress);
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
    useGetPropertyBlueprintsQuery,
    useGetPropertyDocumentsQuery,

    useAddPropertyFileMutation,

    useEditPropertyImageMutation,
    useBulkEditPropertyImagesMutation,
    useBulkDeletePropertyImagesMutation,
    useDeletePropertyImageMutation,
    useLazyGetPropertyBlueprintsQuery,
    useReorderPropertyImagesMutation,
    useReorderPropertyImagesWithSetImageVisibilityMutation,

    useDeletePropertyBlueprintMutation,
    useDeletePropertyDocumentMutation,

    useUploadPropertyFileMutation,
} = filesApiSlice;
