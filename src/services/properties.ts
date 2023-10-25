import {
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import {
    IProperties,
    IPropertiesPOST,
    IPropertyFilter,
    IPropertyResultResponse,
} from "src/types/properties";

import IPage from "src/types/page";
import {
    IFileResponse,
    IPropertyImagePOST,
    IPropertyBlueprintPOST,
    IPropertyBlueprint,
    IPropertyImage,
} from "src/types/file";

import { ILabel } from "src/types/label";
import { ICustomer } from "src/types/customer";

export interface BulkEditRequest {
    propertyIds: number[];
    managerId?: number;
    ownerId?: number;
    zipcode?: number;
    area?: number;
    labels?: number[];
    bedrooms?: number;
    state?: string;
}
interface IGetPropertyAttributeProps {
    propertyId: number;
    attributeName: string;
}
interface ICreatePropertyParams {
    parentCategory: string;
    category: string;
}
interface IEditPropertyProps {
    id: number;
    body: IPropertiesPOST;
}
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
interface IDeleteImageProps {
    propertyId: number;
    imageKey: string;
}
type IDeleteBlueprintProps = IDeleteImageProps;
interface IPropertyFilterParams {
    filter: IPropertyFilter;
    page: number;
    pageSize: number;
}
interface IPropertySearchParams {
    searchString: string;
    page: number;
    pageSize: number;
}
interface ISuggestForCustomerParams {
    customerId: number;
    page: number;
    pageSize: number;
}
interface ISuggestForPropertyParams {
    propertyId: number;
    page: number;
    pageSize: number;
}

interface ReorderImagesWithSetImageVisibilityProps {
    propertyId: number;
    imageKeys: string[];
    imageKey: string;
    hidden: boolean;
}

interface UploadPropertyImageToAmazonProps {
    url: string;
    contentType: string;
    image: File;
}
interface UploadResponse {
    success: boolean;
}

export const properties = createApi({
    reducerPath: "properties",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/property`,
        prepareHeaders: (headers) => {
            // By default, if we have a token in the store, let's use that for authenticated requests

            headers.set(
                "Authorization",
                `Bearer  ${localStorage.getItem("accessToken")}`
            );

            return headers;
        },
    }),
    tagTypes: [
        "Properties",
        "PropertyById",
        "FilterProperties",
        "SuggestedProperties",
        "SuggestedCustomers",

        // attributes
        "PropertyByIdImages",
        "PropertyByIdLabels",
        "PropertyByIdBlueprints",
        "PropertyByIdZip",
    ],
    endpoints: (builder) => ({
        allProperties: builder.query<IProperties[], void>({
            query: () => ({
                url: "all",
            }),
            providesTags: ["Properties"],
        }),

        // Get
        getPropertyById: builder.query<IProperties, number>({
            query: (id: number) => `${id}`,
            providesTags: ["PropertyById"],
        }),
        getPropertyByCode: builder.query<IProperties, string>({
            query: (code: string) => `code/${code}`,
            providesTags: ["Properties"],
        }),
        getPropertyAttribute: builder.query<any[], IGetPropertyAttributeProps>({
            query: (props: IGetPropertyAttributeProps) =>
                `${props.propertyId}/${props.attributeName}`,
            providesTags: ["PropertyById"],
        }),
        getPropertyImages: builder.query<IPropertyImage[], number>({
            query: (propertyId: number) => `${propertyId}/images`,
            providesTags: ["PropertyByIdImages"],
        }),
        getPropertyLabels: builder.query<ILabel[], number>({
            query: (propertyId: number) => `${propertyId}/labels`,
            providesTags: ["PropertyByIdLabels"],
        }),
        getPropertyBlueprints: builder.query<IPropertyBlueprint[], number>({
            query: (propertyId: number) => `${propertyId}/blueprints`,
            providesTags: ["PropertyByIdBlueprints"],
        }),

        // mutations
        editProperty: builder.mutation<number, IEditPropertyProps>({
            query: (props: IEditPropertyProps) => ({
                url: `/edit/${props.id}`,
                method: "POST",
                body: props.body,
            }),
            invalidatesTags: ["Properties", "PropertyById"],
        }),
        createProperty: builder.mutation<number, ICreatePropertyParams>({
            query: (dataToSend: ICreatePropertyParams) => ({
                url: "/create",
                method: "POST",
                params: dataToSend,
            }),
            invalidatesTags: ["Properties"],
        }),
        cloneProperty: builder.mutation<number, number>({
            query: (propertyId: number) => ({
                url: `/clone/${propertyId}`,
                method: "POST",
            }),
            invalidatesTags: ["Properties"],
        }),
        bulkEditProperties: builder.mutation<void, BulkEditRequest>({
            query: (body: BulkEditRequest) => ({
                url: `/edit/bulk`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Properties", "PropertyById"],
        }),
        bulkDeleteProperties: builder.mutation<void, number[]>({
            query: (propertyIds: number[]) => ({
                url: `/delete/bulk`,
                method: "DELETE",
                body: propertyIds,
            }),
            invalidatesTags: ["Properties", "PropertyById"],
        }),
        filterProperties: builder.mutation<
            IPage<IPropertyResultResponse>,
            IPropertyFilterParams
        >({
            query: (filterParam: IPropertyFilterParams) => ({
                url: "/filter",
                method: "POST",
                body: filterParam.filter,
                params: {
                    page: filterParam.page,
                    pageSize: filterParam.pageSize,
                },
            }),
        }),
        suggestForCustomer: builder.query<
            IPage<IProperties>,
            ISuggestForCustomerParams
        >({
            query: (params: ISuggestForCustomerParams) => ({
                url: "/customerSuggest",
                params: params,
            }),
            providesTags: ["SuggestedProperties"],
        }),
        suggestForProperty: builder.query<
            IPage<ICustomer>,
            ISuggestForPropertyParams
        >({
            query: (params: ISuggestForPropertyParams) => ({
                url: "/matchingCustomers",
                params: params,
            }),
            providesTags: ["SuggestedCustomers"],
        }),
        deleteProperty: builder.mutation<IProperties, number>({
            query: (id: number) => ({
                url: `${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Properties"],
        }),
        searchProperty: builder.query<
            IPage<IPropertyResultResponse>,
            IPropertySearchParams
        >({
            query: (searchParams: IPropertySearchParams) => {
                return {
                    url: "/search",
                    params: searchParams,
                };
            },
            providesTags: ["Properties"],
        }),

        // checks
        checkCodeExists: builder.query<boolean, string>({
            query: (code: string) => {
                return {
                    url: "/check/code",
                    params: { code },
                };
            },
        }),
        checkKeyCodeExists: builder.query<boolean, string>({
            query: (code: string) => {
                return {
                    url: "/check/keycode",
                    params: { code },
                };
            },
        }),

        // images & files
        addPropertyImage: builder.mutation<
            IFileResponse,
            IPropertyAddFileParams<IPropertyImagePOST>
        >({
            // INFO: asks for an amazon url from backend; to be used before uploadPropertyImage
            query: (params: IPropertyAddFileParams<IPropertyImagePOST>) => ({
                url: `/${params.id}/image`,
                method: "POST",
                body: params.body,
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
        uploadPropertyImage: builder.mutation<
            UploadResponse,
            UploadPropertyImageToAmazonProps
        >({
            // INFO: upload to amazon
            async queryFn(
                { url, contentType, image },
                api,
                extraOptions,
                baseQuery
            ) {
                try {
                    // PUT to amazon url
                    const res0 = await fetch(url, {
                        method: "PUT",
                        headers: {
                            "Content-Type": contentType,
                        },
                        body: image,
                    });

                    if (!res0.ok) {
                        throw new Error("Upload error: " + res0.statusText);
                    }

                    return { data: { success: true } };
                } catch (error) {
                    return { error: error as FetchBaseQueryError };
                }
            },
            // WARN: Do not add the tags! We use Promise.all on uploadPropertyImage to wait for all the photos to upload.
            //          This is because, every photo contains a non-null url, but it is not ready for fetching.
            // invalidatesTags: ["Properties", "PropertyById"],
        }),
        editPropertyImage: builder.mutation<
            IFileResponse,
            IPropertyAddFileParams<IPropertyImagePOST>
        >({
            // INFO: same with add but causes revalidate
            query: (params: IPropertyAddFileParams<IPropertyImagePOST>) => ({
                url: `/${params.id}/image`,
                method: "POST",
                body: params.body,
            }),
            invalidatesTags: ["Properties", "PropertyById"],
        }),
        setPropertyThumbail: builder.mutation<void, IPropertySetThumbnailProps>(
            {
                query: (props: IPropertySetThumbnailProps) => ({
                    url: `/${props.propertyId}/thumbnail/${props.imageKey}`,
                    method: "POST",
                }),
            }
        ),
        bulkEditPropertyImages: builder.mutation<
            void,
            BulkEditPropertyImagesParams
        >({
            query: ({ propertyId, body }: BulkEditPropertyImagesParams) => ({
                url: `/${propertyId}/images/edit/bulk`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Properties", "PropertyById"],
        }),
        deletePropertyImage: builder.mutation<void, IDeleteImageProps>({
            query: ({ propertyId, imageKey }: IDeleteImageProps) => ({
                url: `/${propertyId}/image/${imageKey}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Properties", "PropertyById"],
        }),

        addPropertyBlueprint: builder.mutation<
            IFileResponse,
            IPropertyAddFileParams<IPropertyBlueprintPOST>
        >({
            query: (
                params: IPropertyAddFileParams<IPropertyBlueprintPOST>
            ) => ({
                url: `/${params.id}/blueprint`,
                method: "POST",
                body: params.body,
            }),
        }),
        deletePropertyBlueprint: builder.mutation<void, IDeleteBlueprintProps>({
            query: ({ propertyId, imageKey }: IDeleteBlueprintProps) => ({
                url: `/${propertyId}/blueprint/${imageKey}`,
                method: "DELETE",
            }),
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

            invalidatesTags: ["Properties", "PropertyById"],
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
            invalidatesTags: ["Properties", "PropertyById"],
        }),
    }),
});

export const {
    // get
    useSearchPropertyQuery,
    useAllPropertiesQuery,
    useGetPropertyByIdQuery,
    useGetPropertyByCodeQuery,
    useLazyGetPropertyByCodeQuery,
    useGetPropertyAttributeQuery,
    useLazyGetPropertyLabelsQuery,
    // mutations
    useEditPropertyMutation,
    useCreatePropertyMutation,
    useClonePropertyMutation,
    useDeletePropertyMutation,
    useFilterPropertiesMutation,
    useSuggestForCustomerQuery,
    useSuggestForPropertyQuery,
    useBulkEditPropertiesMutation,
    useBulkDeletePropertiesMutation,

    // check
    useLazyCheckCodeExistsQuery,
    useLazyCheckKeyCodeExistsQuery,

    // images & files
    useAddPropertyImageMutation,
    useUploadPropertyImageMutation,
    useEditPropertyImageMutation,
    useSetPropertyThumbailMutation,
    useBulkEditPropertyImagesMutation,
    useDeletePropertyImageMutation,
    useLazyGetPropertyImagesQuery,
    useLazyGetPropertyBlueprintsQuery,

    useAddPropertyBlueprintMutation,
    useDeletePropertyBlueprintMutation,

    useReorderPropertyImagesMutation,
    useReorderPropertyImagesWithSetImageVisibilityMutation,
} = properties;
