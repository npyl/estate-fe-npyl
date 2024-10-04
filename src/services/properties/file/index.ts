import {
    IPropertyImageReq,
    IPropertyImage,
    IPropertyFileRes,
    IPropertyFileReq,
    IPropertyBlueprint,
    IPropertyDocument,
    TFileVariant,
} from "src/types/file";

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
    BulkEditPropertyImagesParams,
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
import { uploadWithProgress, removeMetadata } from "./util";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

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
                    const cleanFile =
                        variant === "image" ? await removeMetadata(file) : file;

                    const res = await uploadWithProgress(
                        url,
                        cleanFile,
                        onProgressUpdate
                    );

                    if (!res.ok) {
                        return {
                            error: {
                                status: "FETCH_ERROR",
                                error: res.statusText,
                            } as FetchBaseQueryError,
                        };
                    }

                    return { data: { success: true } };
                } catch (error) {
                    return {
                        error: {
                            status: "FETCH_ERROR",
                            error: error.message,
                        } as FetchBaseQueryError,
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
    useReorderPropertyImagesMutation,
    useReorderPropertyImagesWithSetImageVisibilityMutation,

    useDeletePropertyBlueprintMutation,
    useDeletePropertyDocumentMutation,

    useUploadPropertyFileMutation,
} = filesApiSlice;
