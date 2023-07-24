import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ILabels, ILabel } from "src/types/label";

interface ILabelForPropertyProps {
	propertyId: number;
	labelBody: ILabel;
}
interface ILabelForCustomerProps {
	customerId: number;
	labelBody: ILabel;
}

interface IAssignLabelProps {
	propertyId: number;
	labelId: number;
}
type IDeleteLabelProps = IAssignLabelProps;

export const labels = createApi({
	reducerPath: "labels",
	baseQuery: fetchBaseQuery({
		baseUrl: `${
			process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
		}/api/labels`,
		prepareHeaders: (headers) => {
			// By default, if we have a token in the store, let's use that for authenticated requests

			headers.set(
				"Authorization",
				`Bearer  ${localStorage.getItem("accessToken")}`
			);

			return headers;
		},
	}),
	tagTypes: ["Labels"],
	endpoints: (builder) => ({
		getLabels: builder.query<ILabels, void>({
			query: () => ({
				url: "",
			}),
			providesTags: ["Labels"],
		}),
		// property
		createLabelForPropertyWithID: builder.mutation<
			ILabels,
			ILabelForPropertyProps
		>({
			query: (data: ILabelForPropertyProps) => ({
				url: `property/${data.propertyId}`,
				method: "POST",
				body: data.labelBody,
			}),
			invalidatesTags: ["Labels"],
		}),
		assignLabelToPropertyWithID: builder.mutation<ILabels, IAssignLabelProps>({
			query: (props: IAssignLabelProps) => ({
				url: `add/property/${props.propertyId}`,
				method: "POST",
				params: { labelId: props.labelId },
			}),
			invalidatesTags: ["Labels"],
		}),
		deleteLabelForPropertyWithId: builder.mutation<ILabels, IDeleteLabelProps>({
			query: (props: IDeleteLabelProps) => ({
				url: `/remove/property/${props.propertyId}`,
				method: "DELETE",
				params: { labelId: props.labelId },
			}),
			invalidatesTags: ["Labels"],
		}),

		// customer
		createLabelForCustomerWithID: builder.mutation<
			ILabels,
			ILabelForCustomerProps
		>({
			query: (data: ILabelForCustomerProps) => ({
				url: `customer/${data.customerId}`,
				method: "POST",
				body: data.labelBody,
			}),
			invalidatesTags: ["Labels"],
		}),
		createLabelForProperties: builder.mutation<ILabels, ILabel>({
			query: (data: ILabel) => ({
				url: `property`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Labels"],
		}),
		createLabelForCustomers: builder.mutation<ILabels, ILabel>({
			query: (data: ILabel) => ({
				url: `customer`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Labels"],
		}),

		// general
		deletePropertyLabel: builder.mutation<void, number>({
			query: (labelId: number) => ({
				url: `property/${labelId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Labels"],
		}),
		deleteCustomerLabel: builder.mutation<void, number>({
			query: (labelId: number) => ({
				url: `customer/${labelId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Labels"],
		}),
	}),
});

export const {
	useGetLabelsQuery,
	// property
	useCreateLabelForPropertyWithIDMutation,
	useAssignLabelToPropertyWithIDMutation,
	useDeleteLabelForPropertyWithIdMutation,
	// customer
	useCreateLabelForCustomerWithIDMutation,
	useCreateLabelForPropertiesMutation,
	useCreateLabelForCustomersMutation,
	// general
	useDeletePropertyLabelMutation,
	useDeleteCustomerLabelMutation,
} = labels;
