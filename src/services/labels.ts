import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
    ILabels,
    ILabel,
    LabelResourceType,
    ILabelPOST,
} from "src/types/label";
import { properties } from "./properties";
import { customers } from "./customers";

import type { AnyAction } from "redux";
import type { ThunkDispatch } from "redux-thunk";

interface LabelForResourceProps {
    resourceId: number;
    resource: LabelResourceType;
    body: ILabelPOST;
}

interface AssignLabelProps {
    resource: LabelResourceType;
    resourceId: number;
    labelId: number;
}
type DeleteLabelProps = AssignLabelProps;

interface ILabelForPropertyProps {
    propertyId: number;
    labelBody: ILabelPOST;
}
interface ILabelForCustomerProps {
    customerId: number;
    labelBody: ILabelPOST;
}

interface IAssignLabelProps {
    propertyId?: number;
    customerId?: number;
    labelId: number;
}
type IDeleteLabelProps = IAssignLabelProps;

const optimisticCreate = (
    resource: LabelResourceType,
    resourceId: number,
    body: ILabelPOST,
    dispatch: ThunkDispatch<any, any, AnyAction>
) => {
    let res;

    if (resource === "property") {
        res = dispatch(
            properties.util.updateQueryData(
                "getPropertyById",
                resourceId,
                (draft) => {
                    draft.labels.push(body as ILabel);
                }
            )
        );
    } else if (resource === "customer") {
        res = dispatch(
            customers.util.updateQueryData(
                "getCustomerById",
                resourceId,
                (draft) => {
                    draft.labels.push(body as ILabel);
                }
            )
        );
    } else if (resource === "document") {
        res = dispatch(
            properties.util.updateQueryData(
                "getPropertyById",
                resourceId,
                (draft) => {
                    // draft.documents
                    //     ?.at(resourceId)
                    //     ?.labels.push(body as ILabel);
                }
            )
        );
    }

    return res;
};

export const labels = createApi({
    reducerPath: "labels",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/labels`,
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

        //
        // property
        //
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
        assignLabelToPropertyWithID: builder.mutation<
            ILabels,
            IAssignLabelProps
        >({
            query: (props: IAssignLabelProps) => ({
                url: `add/property/${props.propertyId}`,
                method: "POST",
                params: { labelId: props.labelId },
            }),
            invalidatesTags: ["Labels"],
        }),
        deleteLabelForPropertyWithId: builder.mutation<
            ILabels,
            IDeleteLabelProps
        >({
            query: (props: IDeleteLabelProps) => ({
                url: `/remove/property/${props.propertyId}`,
                method: "DELETE",
                params: { labelId: props.labelId },
            }),
            invalidatesTags: ["Labels"],
        }),

        //
        // customer
        //
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
        assignLabelToCustomerWithID: builder.mutation<
            ILabels,
            IAssignLabelProps
        >({
            query: (props: IAssignLabelProps) => ({
                url: `add/customer/${props.customerId}`,
                method: "POST",
                params: { labelId: props.labelId },
            }),
            invalidatesTags: ["Labels"],
        }),
        deleteLabelForCustomerWithId: builder.mutation<
            ILabels,
            IDeleteLabelProps
        >({
            query: (props: IDeleteLabelProps) => ({
                url: `/remove/customer/${props.customerId}`,
                method: "DELETE",
                params: { labelId: props.labelId },
            }),
            invalidatesTags: ["Labels"],
        }),

        //
        // general
        //
        createLabelForProperties: builder.mutation<ILabels, ILabelPOST>({
            query: (data: ILabel) => ({
                url: `property`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Labels"],
        }),
        createLabelForCustomers: builder.mutation<ILabels, ILabelPOST>({
            query: (data: ILabel) => ({
                url: `customer`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Labels"],
        }),
        createLabelForDocuments: builder.mutation<ILabels, ILabelPOST>({
            query: (data: ILabel) => ({
                url: `document`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Labels"],
        }),

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

        //
        //  Ultra General
        //
        createLabelForResource: builder.mutation<
            ILabels,
            LabelForResourceProps
        >({
            query: ({ resource, resourceId, body }: LabelForResourceProps) => ({
                url: `${resource}/${resourceId}`,
                method: "POST",
                body,
            }),
            onQueryStarted: async (
                { resource, resourceId, body },
                { dispatch, queryFulfilled }
            ) => {
                let patchResult = optimisticCreate(
                    resource,
                    resourceId,
                    body,
                    dispatch
                );

                if (!patchResult) throw new Error("Failure!");

                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
            invalidatesTags: ["Labels"],
        }),
        assignLabelToResource: builder.mutation<ILabels, AssignLabelProps>({
            query: ({ resource, resourceId, labelId }: AssignLabelProps) => ({
                url: `add/${resource}/${resourceId}`,
                method: "POST",
                params: { labelId },
            }),
            invalidatesTags: ["Labels"],
        }),
        deleteLabelForResource: builder.mutation<ILabels, DeleteLabelProps>({
            query: ({ resource, resourceId, labelId }: DeleteLabelProps) => ({
                url: `/remove/${resource}/${resourceId}`,
                method: "DELETE",
                params: { labelId },
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
    useAssignLabelToCustomerWithIDMutation,
    useDeleteLabelForCustomerWithIdMutation,

    // document
    useCreateLabelForDocumentsMutation,

    // general
    useCreateLabelForPropertiesMutation,
    useCreateLabelForCustomersMutation,
    useDeletePropertyLabelMutation,
    useDeleteCustomerLabelMutation,

    useCreateLabelForResourceMutation,
    useAssignLabelToResourceMutation,
    useDeleteLabelForResourceMutation,
} = labels;
