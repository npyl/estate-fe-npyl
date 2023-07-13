import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	IProperties,
	IPropertiesPostRequest,
	IPropertyFilter,
} from "src/types/properties";

import IPage from "src/types/page";
import { IFileResponse } from "src/types/fileModel";

export interface IThumbnailPOST {
	filename: string;
	contentType: string;
}
export interface IImagePOST {
	id: number;
	filename: string;
	contentType: string;
	hidden: boolean;
	description: string;
	title: string;
	orderNumber: number;
}

interface ICreatePropertyParams {
	parentCategory: string;
	category: string;
}
interface IEditPropertyProps {
	id: number;
	body: IPropertiesPostRequest;
}
interface IPropertyAddFileParams {
	id: number;
	body: IThumbnailPOST | IImagePOST;
}
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

export const properties = createApi({
	reducerPath: "properties",
	baseQuery: fetchBaseQuery({
		baseUrl: `${
			process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
		}/api/property`,
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
	],
	endpoints: (builder) => ({
		allProperties: builder.query<IProperties[], void>({
			query: () => ({
				url: "all",
			}),
			providesTags: ["Properties"],
		}),
		getPropertyById: builder.query<IProperties, number>({
			query: (id: number) => `${id}`,
			providesTags: ["PropertyById"],
		}),
		getPropertyByCode: builder.query<IProperties, number>({
			query: (code: number) => `code/${code}`,
			providesTags: ["Properties"],
		}),
		editProperty: builder.mutation<number, IEditPropertyProps>({
			query: (props: IEditPropertyProps) => ({
				url: `/edit/${props.id}`,
				method: "POST",
				body: props.body,
			}),
			invalidatesTags: ["Properties"],
		}),
		createProperty: builder.mutation<number, ICreatePropertyParams>({
			query: (dataToSend: ICreatePropertyParams) => ({
				url: "/create",
				method: "POST",
				params: dataToSend,
			}),
			invalidatesTags: ["Properties"],
		}),
		filterProperties: builder.mutation<
			IPage<IProperties>,
			IPropertyFilterParams
		>({
			query: (filterParam: IPropertyFilterParams) => ({
				url: "/filter",
				method: "POST",
				body: filterParam.filter,
				params: { page: filterParam.page, pageSize: filterParam.pageSize },
			}),
			invalidatesTags: ["Properties"],
		}),
		suggestForCustomer: builder.query<IProperties[], number>({
			query: (id: number) => ({
				url: "/customerSuggest",
				params: { customerId: id },
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
		getSearchResults: builder.query<IPage<IProperties>, IPropertySearchParams>({
			query: (searchParams: IPropertySearchParams) => {
				return {
					url: "/search",
					params: searchParams,
				};
			},
		}),

		// images & files
		addPropertyThumbnail: builder.mutation<
			IFileResponse,
			IPropertyAddFileParams
		>({
			query: (params: IPropertyAddFileParams) => ({
				url: `/${params.id}/thumbnail`,
				method: "POST",
				body: params.body,
			}),
			invalidatesTags: ["Properties"],
		}),
		addPropertyImage: builder.mutation<IFileResponse, IPropertyAddFileParams>({
			query: (params: IPropertyAddFileParams) => ({
				url: `/${params.id}/image`,
				method: "POST",
				body: params.body,
			}),
			invalidatesTags: ["Properties"],
		}),
	}),
});

export const {
	useGetSearchResultsQuery,
	useAllPropertiesQuery,
	useGetPropertyByIdQuery,
	useGetPropertyByCodeQuery,
	useEditPropertyMutation,
	useCreatePropertyMutation,
	useDeletePropertyMutation,
	useFilterPropertiesMutation,
	useSuggestForCustomerQuery,

	// images & files
	useAddPropertyThumbnailMutation,
	useAddPropertyImageMutation,
} = properties;
