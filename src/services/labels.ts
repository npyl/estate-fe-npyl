import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
    ILabels,
    ILabel,
    LabelResourceType,
    ILabelPOST,
} from "src/types/label";
import { filesApiSlice, properties } from "./properties";
import { customers } from "./customers";

import type { AnyAction } from "redux";
import type { ThunkDispatch } from "redux-thunk";

interface LabelForResourceProps {
    resourceId: number;
    resource: LabelResourceType;
    body: ILabelPOST;
}
type AssignLabelProps = LabelForResourceProps;

interface DeleteLabelProps {
    resource: LabelResourceType;
    resourceId: number;
    labelId: number;
}

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
                "getPropertyLabels",
                resourceId,
                (draft) => {
                    draft.push(body as ILabel);
                }
            )
        );
    } else if (resource === "customer") {
        res = dispatch(
            customers.util.updateQueryData(
                "getCustomerLabels",
                resourceId,
                (draft) => {
                    draft.push(body as ILabel);
                }
            )
        );
    } else if (resource === "document") {
        res = dispatch(
            filesApiSlice.util.updateQueryData(
                "getPropertyDocuments",
                resourceId,
                (draft) => {
                    // TODO: ...
                }
            )
        );
    }

    return res;
};

const optimisticDelete = (
    resource: LabelResourceType,
    resourceId: number,
    labelId: number,
    dispatch: ThunkDispatch<any, any, AnyAction>
) => {
    let res;

    if (resource === "property") {
        res = dispatch(
            properties.util.updateQueryData(
                "getPropertyLabels",
                resourceId,
                (draft) => {
                    return draft.filter((l) => l.id !== labelId);
                }
            )
        );
    } else if (resource === "customer") {
        res = dispatch(
            customers.util.updateQueryData(
                "getCustomerLabels",
                resourceId,
                (draft) => {
                    return draft.filter((l) => l.id !== labelId);
                }
            )
        );
    } else if (resource === "document") {
        res = dispatch(
            filesApiSlice.util.updateQueryData(
                "getPropertyDocuments",
                resourceId,
                (draft) => {
                    // TODO: ...
                }
            )
        );
    }

    return res;
};

interface ILabelForResourceReq {
    resource: LabelResourceType;
    body: ILabelPOST;
}

interface IDeleteLabelForResourceReq {
    resource: LabelResourceType;
    labelId: number;
}

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
        // general
        //
        createLabelForResource: builder.mutation<void, ILabelForResourceReq>({
            query: ({ resource, body }) => ({
                url: `${resource}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Labels"],
        }),

        deleteLabelForResource: builder.mutation<
            void,
            IDeleteLabelForResourceReq
        >({
            query: ({ resource, labelId }) => ({
                url: `${resource}/${labelId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Labels"],
        }),

        //
        //  Ultra General
        //
        createLabelForResourceId: builder.mutation<
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
        assignLabelToResourceId: builder.mutation<ILabels, AssignLabelProps>({
            query: ({ resource, resourceId, body }: AssignLabelProps) => ({
                url: `add/${resource}/${resourceId}`,
                method: "POST",
                params: { labelId: body.id },
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
        deleteLabelForResourceId: builder.mutation<ILabels, DeleteLabelProps>({
            query: ({ resource, resourceId, labelId }: DeleteLabelProps) => ({
                url: `/remove/${resource}/${resourceId}`,
                method: "DELETE",
                params: { labelId },
            }),
            onQueryStarted: async (
                { resource, resourceId, labelId },
                { dispatch, queryFulfilled }
            ) => {
                let patchResult = optimisticDelete(
                    resource,
                    resourceId,
                    labelId,
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
    }),
});

export const {
    useGetLabelsQuery,
    // general
    useCreateLabelForResourceMutation,
    // delete
    useDeleteLabelForResourceMutation,
    // for specific resourceId
    useCreateLabelForResourceIdMutation,
    useAssignLabelToResourceIdMutation,
    useDeleteLabelForResourceIdMutation,
} = labels;
