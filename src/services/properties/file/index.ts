import {
    IPropertyImageReq,
    IPropertyImage,
    IPropertyFileRes,
    IPropertyFileReq,
    IPropertyBlueprint,
    IPropertyDocument,
    IPropertyFile,
} from "src/types/file";

import { properties } from "../properties";
import {
    optimisticAddFile,
    optimisticRemoveFile,
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
        getPropertyGoogleEarth: builder.query<IPropertyFile, number>({
            query: (propertyId) => `${propertyId}/googleEarth`,
            providesTags: ["PropertyByIdGoogleEarth"],
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

        removePropertyFile: builder.mutation<
            IPropertyFileRes,
            IPropertyAddFileParams<string>
        >({
            // INFO: removes BE entry for the specific key
            query: ({ id, body: key, variant }) => ({
                url: `/${id}/${variant}/upload-fail`,
                method: "DELETE",
                params: {
                    key,
                },
            }),
            onQueryStarted: optimisticRemoveFile,
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
        deletePropertyGoogleEarth: builder.mutation<void, number>({
            query: (propertyId) => ({
                url: `/${propertyId}/google-earth`,
                method: "DELETE",
            }),
            invalidatesTags: ["PropertyByIdGoogleEarth"],
        }),
    }),
});

export const {
    useGetPropertyImagesQuery,
    useGetPropertyBlueprintsQuery,
    useGetPropertyDocumentsQuery,
    useGetPropertyGoogleEarthQuery,

    useAddPropertyFileMutation,
    useRemovePropertyFileMutation,

    useEditPropertyImageMutation,
    useBulkEditPropertyImagesMutation,
    useBulkDeletePropertyImagesMutation,
    useDeletePropertyImageMutation,
    useReorderPropertyImagesMutation,
    useReorderPropertyImagesWithSetImageVisibilityMutation,

    useDeletePropertyBlueprintMutation,
    useDeletePropertyDocumentMutation,
    useDeletePropertyGoogleEarthMutation,
} = filesApiSlice;
