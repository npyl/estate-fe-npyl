import { IPropertyFileReq, IPropertyFileRes } from "@/types/file";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import {
    BulkDeletePropertyImagesParams,
    IDeleteFileProps,
    IPropertyAddFileParams,
    IPropertyFileManipulation,
    ReorderImagesWithSetImageVisibility,
} from "./types";
import { MutationLifecycleApi } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
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

type OptimisticReorderCb = (
    arg: IPropertyFileManipulation<string[]>,
    api: MutationLifecycleApi<
        IPropertyFileManipulation<string[]>,
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
    arg: IDeleteFileProps,
    api: MutationLifecycleApi<
        IDeleteFileProps,
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
            return draft;
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
        filesApiSlice.util.updateQueryData("getPropertyImages", id, (draft) => {
            // reorder based on imageKeys
            let reordered = imageKeys.map(
                (k) => draft.find((i) => i.key === k)!
            );

            return reordered;
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
            filesApiSlice.util.updateQueryData(
                "getPropertyImages",
                propertyId,
                (draft) => {
                    // reorder based on imageKeys
                    const reordered = imageKeys.map(
                        (k) => draft.find((i) => i.key === k)!
                    );
                    if (!reordered) return [];

                    // set visibility
                    const toSetVisibilityIndex = reordered.findIndex(
                        (i) => i.key === imageKey
                    );
                    if (toSetVisibilityIndex < 0) return [];
                    reordered[toSetVisibilityIndex].hidden = hidden;

                    return reordered;
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
    { imageKey, propertyId },
    { dispatch, queryFulfilled }
) => {
    const patchResult = dispatch(
        filesApiSlice.util.updateQueryData(
            "getPropertyImages",
            propertyId,
            (draft) => draft.filter((i) => i.key !== imageKey)
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
        filesApiSlice.util.updateQueryData(
            "getPropertyImages",
            propertyId,
            (draft) => draft.filter((i) => !imageKeys.some((k) => k === i.key))
        )
    );
    try {
        await queryFulfilled;
    } catch {
        patchResult.undo();
    }
};
