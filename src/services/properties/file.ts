// Images, Blueprints, Documents

import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import {
    IFileResponse,
    IPropertyImagePOST,
    IPropertyBlueprintPOST,
    IPropertyBlueprint,
    IPropertyImage,
    IPropertyDocument,
    IPropertyDocumentPOST,
} from "src/types/file";

import axios, { AxiosProgressEvent } from "axios";

import { properties } from "./properties";

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

interface IPropertyAddFileParams<T> {
    id: number;
    body: T;
}
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
interface BulkDeletePropertyImagesParams {
    propertyId: number;
    imageKeys: string[];
    newThumbnailKey: string;
}

interface IDeleteFileProps {
    propertyId: number;
    imageKey: string;
}
interface IDeleteImageProps extends IDeleteFileProps {
    newThumbnailKey: string;
}

interface ReorderImagesWithSetImageVisibilityProps {
    propertyId: number;
    imageKeys: string[];
    imageKey: string;
    hidden: boolean;
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

        // images & files
        addPropertyImage: builder.mutation<
            IFileResponse,
            IPropertyAddFileParams<IPropertyImagePOST>
        >({
            // INFO: asks for an amazon url from backend; to be used before uploadPropertyImage
            query: ({ id, body }) => ({
                url: `/${id}/image`,
                method: "POST",
                body,
            }),
            onQueryStarted: async (
                { body, id },
                { dispatch, queryFulfilled }
            ) => {
                const patchResult = dispatch(
                    properties.util.updateQueryData(
                        "getPropertyById",
                        id,
                        (draft) => {
                            draft.images.push({
                                ...body,
                                url: null,
                            } as IPropertyImage);
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
            // WARN: Do not add the tags! addPropertyImage needs to be used optimistically, to explicitly set the url null and know to show a preview Image.
            // invalidatesTags: ["Properties", "PropertyById"],
        }),

        editPropertyImage: builder.mutation<
            IFileResponse,
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
            invalidatesTags: ["Properties", "PropertyById"],
        }),

        bulkDeletePropertyImages: builder.mutation<
            number,
            BulkDeletePropertyImagesParams
        >({
            //
            //  Deletes apropertyImages by imageKeys (updates thumbnail if necessary)
            //
            async queryFn(
                { propertyId, imageKeys, newThumbnailKey },
                api,
                extraOptions,
                baseQuery
            ) {
                try {
                    const deleteResponse = await baseQuery({
                        url: `/${propertyId}/images/delete/bulk`,
                        method: "DELETE",
                        body: imageKeys,
                    });

                    if ("error" in deleteResponse) {
                        throw deleteResponse.error;
                    }

                    // We didn't remove thumbnail => no need to do anything else
                    if (!newThumbnailKey) return { data: 0 };

                    // Then, set thumbnail
                    const thumbnailResponse = await baseQuery({
                        url: `${propertyId}/thumbnail/${newThumbnailKey}`,
                        method: "POST",
                    });

                    if ("error" in thumbnailResponse) {
                        throw thumbnailResponse.error;
                    }

                    return { data: 0 };
                } catch (error) {
                    return { error: error as FetchBaseQueryError };
                }
            },
            onQueryStarted: async (
                { imageKeys, propertyId },
                { dispatch, queryFulfilled }
            ) => {
                const patchResult = dispatch(
                    properties.util.updateQueryData(
                        "getPropertyById",
                        propertyId,
                        (draft) => {
                            draft.images = draft.images.filter(
                                (i) => !imageKeys.some((k) => k === i.key)
                            );

                            // update thumbnail
                            if (draft.images?.length > 0)
                                draft.images[0].thumbnail = true;
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
            invalidatesTags: ["Properties", "PropertyById"],
        }),

        deletePropertyImage: builder.mutation<number, IDeleteImageProps>({
            //
            //  Deletes a propertyImage by imageKey (updates thumbnail if necessary)
            //
            async queryFn(
                { propertyId, imageKey, newThumbnailKey },
                api,
                extraOptions,
                baseQuery
            ) {
                try {
                    const deleteResponse = await baseQuery({
                        url: `/${propertyId}/image/${imageKey}`,
                        method: "DELETE",
                    });

                    if ("error" in deleteResponse) {
                        throw deleteResponse.error;
                    }

                    // We didn't remove thumbnail => no need to do anything else
                    if (!newThumbnailKey) return { data: 0 };

                    // Then, set thumbnail
                    const thumbnailResponse = await baseQuery({
                        url: `${propertyId}/thumbnail/${newThumbnailKey}`,
                        method: "POST",
                    });

                    if ("error" in thumbnailResponse) {
                        throw thumbnailResponse.error;
                    }

                    return { data: 0 };
                } catch (error) {
                    return { error: error as FetchBaseQueryError };
                }
            },
            onQueryStarted: async (
                { imageKey, propertyId, newThumbnailKey },
                { dispatch, queryFulfilled }
            ) => {
                const patchResult = dispatch(
                    properties.util.updateQueryData(
                        "getPropertyById",
                        propertyId,
                        (draft) => {
                            if (newThumbnailKey) {
                                draft.images.shift(); // remove first element
                                draft.images[0].thumbnail = true; // next element becomes thumbnail
                            }
                            // remove image
                            else
                                draft.images = draft.images.filter(
                                    (i) => i.key !== imageKey
                                );
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
            invalidatesTags: ["PropertyByIdImages"],
        }),

        reorderPropertyImages: builder.mutation<
            number,
            IPropertyAddFileParams<string[]>
        >({
            async queryFn(
                { id: propertyId, body: imageKeys },
                api,
                extraOptions,
                baseQuery
            ) {
                try {
                    const reorderResponse = await baseQuery({
                        url: `/${propertyId}/reorderImages`,
                        method: "POST",
                        body: imageKeys,
                    });

                    if ("error" in reorderResponse) {
                        throw reorderResponse.error;
                    }

                    // Then, set thumbnail
                    const thumbnailResponse = await baseQuery({
                        url: `${propertyId}/thumbnail/${imageKeys[0]}`,
                        method: "POST",
                    });

                    if ("error" in thumbnailResponse) {
                        throw thumbnailResponse.error;
                    }

                    return { data: 0 }; // 0 for success
                } catch (error) {
                    return { error: error as FetchBaseQueryError };
                }
            },
            onQueryStarted: async (
                { id, body: imageKeys },
                { dispatch, queryFulfilled }
            ) => {
                const patchResult = dispatch(
                    properties.util.updateQueryData(
                        "getPropertyById",
                        id,
                        (draft) => {
                            // disable old thumbnail
                            draft.images[0].thumbnail = false;

                            // reorder based on imageKeys
                            let reordered = imageKeys.map(
                                (k) => draft.images.find((i) => i.key === k)!
                            );
                            if (!reordered) return;

                            // set thumbnail
                            reordered[0].thumbnail = true;

                            draft.images = reordered;
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
            invalidatesTags: ["PropertyByIdImages"],
        }),

        reorderPropertyImagesWithSetImageVisibility: builder.mutation<
            IFileResponse,
            ReorderImagesWithSetImageVisibilityProps
        >({
            async queryFn(
                { propertyId, imageKeys, imageKey, hidden },
                api,
                extraOptions,
                baseQuery
            ) {
                try {
                    // First, set the visibility of a specific image.
                    const visibilityResponse = await baseQuery({
                        url: `${propertyId}/image`,
                        method: "POST",
                        body: {
                            key: imageKey,
                            hidden,
                        },
                    });

                    if ("error" in visibilityResponse) {
                        throw visibilityResponse.error;
                    }

                    // Then, set thumbnail
                    const thumbnailResponse = await baseQuery({
                        url: `${propertyId}/thumbnail/${imageKeys[0]}`,
                        method: "POST",
                    });

                    if ("error" in thumbnailResponse) {
                        throw thumbnailResponse.error;
                    }

                    // Then, reorder the images.
                    const reorderResponse = await baseQuery({
                        url: `/${propertyId}/reorderImages`,
                        method: "POST",
                        body: imageKeys,
                    });

                    if ("error" in reorderResponse) {
                        throw reorderResponse.error;
                    }

                    return { data: reorderResponse.data as IFileResponse };
                } catch (error) {
                    return { error: error as FetchBaseQueryError };
                }
            },
            onQueryStarted: async (
                { propertyId, imageKeys, imageKey, hidden },
                { dispatch, queryFulfilled }
            ) => {
                const patchResult = dispatch(
                    properties.util.updateQueryData(
                        "getPropertyById",
                        propertyId,
                        (draft) => {
                            // disable old thumbnail
                            draft.images[0].thumbnail = false;

                            // reorder based on imageKeys
                            const reordered = imageKeys.map(
                                (k) => draft.images.find((i) => i.key === k)!
                            );
                            if (!reordered) return;

                            // set visibility
                            const toSetVisibilityIndex = reordered.findIndex(
                                (i) => i.key === imageKey
                            );
                            if (toSetVisibilityIndex < 0) return;
                            reordered[toSetVisibilityIndex].hidden = hidden;

                            draft.images = reordered;
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
            invalidatesTags: ["PropertyByIdImages"],
        }),

        addPropertyBlueprint: builder.mutation<
            IFileResponse,
            IPropertyAddFileParams<IPropertyBlueprintPOST>
        >({
            query: ({ id, body }) => ({
                url: `/${id}/blueprint`,
                method: "POST",
                body,
            }),
            onQueryStarted: async (
                { body, id },
                { dispatch, queryFulfilled }
            ) => {
                const patchResult = dispatch(
                    properties.util.updateQueryData(
                        "getPropertyById",
                        id,
                        (draft) => {
                            draft.blueprints.push({
                                ...body,
                                url: null,
                            } as IPropertyBlueprint);
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
            // WARN: Do not add the tags! addPropertyImage needs to be used optimistically, to explicitly set the url null and know to show a preview Image.
            // invalidatesTags: ["Properties", "PropertyById"],
        }),
        deletePropertyBlueprint: builder.mutation<void, IDeleteFileProps>({
            query: ({ propertyId, imageKey }) => ({
                url: `/${propertyId}/blueprint/${imageKey}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Properties", "PropertyById"],
        }),

        addPropertyDocument: builder.mutation<
            IFileResponse,
            IPropertyAddFileParams<IPropertyDocumentPOST>
        >({
            query: ({ id, body }) => ({
                url: `/${id}/document`,
                method: "POST",
                body,
            }),
            onQueryStarted: async (
                { body, id },
                { dispatch, queryFulfilled }
            ) => {
                const patchResult = dispatch(
                    properties.util.updateQueryData(
                        "getPropertyById",
                        id,
                        (draft) => {
                            draft.documents.push({
                                ...body,
                                url: null,
                                labels: [],
                            } as IPropertyDocument);
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
            // WARN: Do not add the tags! addPropertyImage needs to be used optimistically, to explicitly set the url null and know to show a preview Image.
            // invalidatesTags: ["Properties", "PropertyById"],
        }),
        deletePropertyDocument: builder.mutation<void, IDeleteFileProps>({
            query: ({ propertyId, imageKey: documentKey }) => ({
                url: `/${propertyId}/document/${documentKey}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Properties", "PropertyById"],
        }),

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
