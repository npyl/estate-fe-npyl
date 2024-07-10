import { IPropertyFileRes } from "@/types/file";
import {
    BaseQueryApi,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import {
    BulkDeletePropertyImagesParams,
    IDeleteImageProps,
    IPropertyAddFileParams,
    ReorderImagesWithSetImageVisibility,
} from "./types";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";

type QueryFn<T> = (
    arg: T,
    api: BaseQueryApi,
    extraOptions: {},
    baseQuery: (
        arg: string | FetchArgs
    ) => MaybePromise<
        QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
    >
) => MaybePromise<any>;

type ReorderCb = QueryFn<IPropertyAddFileParams<string[]>>;
type ReorderWithVisibilityCb = QueryFn<ReorderImagesWithSetImageVisibility>;
type DeleteImageCb = QueryFn<IDeleteImageProps>;
type BulkDeleteImagesCb = QueryFn<BulkDeletePropertyImagesParams>;

export const reorderQueryFn: ReorderCb = async (
    { id: propertyId, body: imageKeys },
    api,
    extraOptions,
    baseQuery
) => {
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
};

export const reorderImagesWithVisibilityQueryFn: ReorderWithVisibilityCb =
    async (
        { propertyId, imageKeys, imageKey, hidden },
        api,
        extraOptions,
        baseQuery
    ) => {
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

            return { data: reorderResponse.data as IPropertyFileRes };
        } catch (error) {
            return { error: error as FetchBaseQueryError };
        }
    };

export const deleteImageQueryFn: DeleteImageCb = async (
    { propertyId, imageKey, newThumbnailKey },
    api,
    extraOptions,
    baseQuery
) => {
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
};

export const bulkDeleteImagesQueryFn: BulkDeleteImagesCb = async (
    { propertyId, imageKeys, newThumbnailKey },
    api,
    extraOptions,
    baseQuery
) => {
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
};
