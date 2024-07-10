import { IPropertyFileRes } from "@/types/file";
import {
    BaseQueryApi,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import {
    IDeleteFileProps,
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
type DeleteImageCb = QueryFn<IDeleteFileProps>;

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
    { propertyId, imageKey },
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

        return { data: 0 };
    } catch (error) {
        return { error: error as FetchBaseQueryError };
    }
};
