import {
    IPropertyBlueprintPOST,
    IPropertyDocumentPOST,
    IPropertyFileReq,
    IPropertyFileRes,
} from "@/types/file";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import {
    BulkDeletePropertyImagesParams,
    IDeleteImageProps,
    IPropertyAddFileParams,
    ReorderImagesWithSetImageVisibility,
} from "./types";
import { MutationLifecycleApi } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { properties } from "../properties";
import { filesApiSlice } from ".";
import uuidv4 from "@/utils/uuidv4";

type OptimisticAddCb<T> = (
    arg: IPropertyAddFileParams<T>,
    api: MutationLifecycleApi<
        IPropertyAddFileParams<T>,
        BaseQueryFn,
        IPropertyFileRes,
        "properties"
    >
) => void;

type OptimisticAddFileCb = OptimisticAddCb<IPropertyFileReq>;
type OptimisticAddBlueprintCb = OptimisticAddCb<IPropertyBlueprintPOST>;
type OptimisticAddDocumentCb = OptimisticAddCb<IPropertyDocumentPOST>;

type OptimisticReorderCb = (
    arg: IPropertyAddFileParams<string[]>,
    api: MutationLifecycleApi<
        IPropertyAddFileParams<string[]>,
        BaseQueryFn,
        number,
        "properties"
    >
) => void;

type OptimisticReorderWithVisibilityCb = (
    arg: ReorderImagesWithSetImageVisibility,
    api: MutationLifecycleApi<
        ReorderImagesWithSetImageVisibility,
        BaseQueryFn,
        IPropertyFileRes,
        "properties"
    >
) => void;

type OptimisticDeleteImageCb = (
    arg: IDeleteImageProps,
    api: MutationLifecycleApi<
        IDeleteImageProps,
        BaseQueryFn,
        number,
        "properties"
    >
) => void;

type optimisticBulkDeleteImagesCb = (
    arg: BulkDeletePropertyImagesParams,
    api: MutationLifecycleApi<
        BulkDeletePropertyImagesParams,
        BaseQueryFn,
        number,
        "properties"
    >
) => void;

export const optimisticAddFile: OptimisticAddFileCb = async (
    { body, id, variant },
    { dispatch, queryFulfilled }
) => {
    const query =
        variant === "image"
            ? "getPropertyImages"
            : variant === "blueprint"
            ? "getPropertyBlueprints"
            : variant === "document"
            ? "getPropertyDocuments"
            : null;

    if (!query) return;

    const content = {
        ...body,
        id: -1,
        key: uuidv4(),
        url: null,
        // Document
        // TODO: fix this any...
        ...((variant === "document" ? { labels: [] } : {}) as any),
    };

    const patchResult = dispatch(
        filesApiSlice.util.updateQueryData(query, id, (draft) => {
            draft.push(content);
        })
    );

    try {
        await queryFulfilled;
    } catch {
        patchResult.undo();
    }
};

// --------------------------------------------------------------------------------

export const optimisticReorder: OptimisticReorderCb = async (
    { id, body: imageKeys },
    { dispatch, queryFulfilled }
) => {
    const patchResult = dispatch(
        properties.util.updateQueryData("getPropertyById", id, (draft) => {
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
        })
    );
    try {
        await queryFulfilled;
    } catch {
        patchResult.undo();
    }
};

export const optimisticReorderWithVisibility: OptimisticReorderWithVisibilityCb =
    async (
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
    };

// --------------------------------------------------------------------------------

export const optimisticDeleteImage: OptimisticDeleteImageCb = async (
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
};

export const optimisticBulkDeleteImages: optimisticBulkDeleteImagesCb = async (
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
                if (draft.images?.length > 0) draft.images[0].thumbnail = true;
            }
        )
    );
    try {
        await queryFulfilled;
    } catch {
        patchResult.undo();
    }
};
