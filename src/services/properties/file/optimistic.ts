import {
    IPropertyBlueprint,
    IPropertyBlueprintPOST,
    IPropertyDocument,
    IPropertyDocumentPOST,
    IPropertyFileRes,
    IPropertyImage,
    IPropertyImagePOST,
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

type OptimisticAddCb<T> = (
    arg: IPropertyAddFileParams<T>,
    api: MutationLifecycleApi<
        IPropertyAddFileParams<T>,
        BaseQueryFn,
        IPropertyFileRes,
        "properties"
    >
) => void;

type OptimisticAddImageCb = OptimisticAddCb<IPropertyImagePOST>;
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

export const optimisticAddImage: OptimisticAddImageCb = async (
    { body, id },
    { dispatch, queryFulfilled }
) => {
    const patchResult = dispatch(
        properties.util.updateQueryData("getPropertyById", id, (draft) => {
            draft.images.push({
                ...body,
                url: null,
            } as IPropertyImage);
        })
    );
    try {
        await queryFulfilled;
    } catch {
        patchResult.undo();
    }
};
export const optimisticAddBlueprint: OptimisticAddBlueprintCb = async (
    { body, id },
    { dispatch, queryFulfilled }
) => {
    const patchResult = dispatch(
        properties.util.updateQueryData("getPropertyById", id, (draft) => {
            draft.blueprints.push({
                ...body,
                url: null,
            } as IPropertyBlueprint);
        })
    );
    try {
        await queryFulfilled;
    } catch {
        patchResult.undo();
    }
};
export const optimisticAddDocument: OptimisticAddDocumentCb = async (
    { body, id },
    { dispatch, queryFulfilled }
) => {
    const patchResult = dispatch(
        properties.util.updateQueryData("getPropertyById", id, (draft) => {
            draft.documents.push({
                ...body,
                url: null,
                labels: [],
            } as IPropertyDocument);
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
