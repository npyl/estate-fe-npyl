import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
        bulkEditProperties: builder.mutation<void, BulkEditRequest>({
            query: (body: BulkEditRequest) => ({
                url: `/edit/bulk`,
                method: "POST",
                body: body,
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
            query: (params: IPropertyAddFileParams<IPropertyImagePOST>) => ({
                url: `/${params.id}/image`,
                method: "POST",
                body: params.body,
            }),
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
            invalidatesTags: ["PropertyByIdImages", "PropertyById"],
        }),
        setPropertyThumbail: builder.mutation<void, IPropertySetThumbnailProps>(
            {
                query: (props: IPropertySetThumbnailProps) => ({
                    url: `/${props.propertyId}/thumbnail/${props.imageKey}`,
                    method: "POST",
                }),
                invalidatesTags: ["PropertyByIdImages"],
            }
        ),
        deletePropertyImage: builder.mutation<void, IDeleteImageProps>({
            query: ({ propertyId, imageKey }: IDeleteImageProps) => ({
                url: `/${propertyId}/image/${imageKey}`,
                method: "DELETE",
            }),
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
            void,
            IPropertyAddFileParams<string[]>
        >({
            query: (params: IPropertyAddFileParams<string[]>) => ({
                url: `/${params.id}/reorderImages`,
                method: "POST",
                body: params.body,
            }),
            invalidatesTags: ["Properties", "PropertyByIdImages"],
        }),
    }),
});

export const {
    // get
    useSearchPropertyQuery,
    useAllPropertiesQuery,
    useGetPropertyByIdQuery,
    useGetPropertyByCodeQuery,
    useGetPropertyAttributeQuery,
    useLazyGetPropertyLabelsQuery,
    // mutations
    useEditPropertyMutation,
    useCreatePropertyMutation,
    useDeletePropertyMutation,
    useFilterPropertiesMutation,
    useSuggestForCustomerQuery,
    useBulkEditPropertiesMutation,

    // check
    useLazyCheckCodeExistsQuery,
    useLazyCheckKeyCodeExistsQuery,

    // images & files
    useAddPropertyImageMutation,
    useEditPropertyImageMutation,
    useSetPropertyThumbailMutation,
    useDeletePropertyImageMutation,
    useLazyGetPropertyImagesQuery,
    useLazyGetPropertyBlueprintsQuery,

    useAddPropertyBlueprintMutation,
    useDeletePropertyBlueprintMutation,

    useReorderPropertyImagesMutation,
} = properties;
