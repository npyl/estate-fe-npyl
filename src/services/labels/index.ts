import { createApi } from "@reduxjs/toolkit/query/react";
import { ILabels } from "@/types/label";
import {
    DeleteLabelProps,
    IAssignLabelToResourceReq,
    IDeleteLabelForResourceReq,
    ILabelForResourceReq,
    ILabelForResourceRes,
    LabelForResourceProps,
} from "./types";
import { optimisticDelete } from "./optimistic";
import getBaseQueryWithReauth from "../_util/getBaseQueryWithReauth";

export const labels = createApi({
    reducerPath: "labels",
    baseQuery: getBaseQueryWithReauth({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/labels`,
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
        createLabelForResource: builder.mutation<
            ILabelForResourceRes,
            ILabelForResourceReq
        >({
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
        createAssignLabelForResourceId: builder.mutation<
            ILabelForResourceRes,
            LabelForResourceProps
        >({
            query: ({ resource, resourceId, body }) => ({
                url: `${resource}/${resourceId}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Labels"],
        }),
        assignLabelToResourceId: builder.mutation<
            void,
            IAssignLabelToResourceReq
        >({
            query: ({ resource, resourceId, body }) => ({
                url: `add/${resource}/${resourceId}`,
                method: "POST",
                params: { labelId: body.id },
            }),
            invalidatesTags: ["Labels"],
        }),
        deleteLabelForResourceId: builder.mutation<void, DeleteLabelProps>({
            query: ({ resource, resourceId, labelId }) => ({
                url: `/remove/${resource}/${resourceId}`,
                method: "DELETE",
                params: { labelId },
            }),
            onQueryStarted: optimisticDelete,
            invalidatesTags: ["Labels"],
        }),
    }),
});

export const {
    useGetLabelsQuery,
    // general
    useCreateLabelForResourceMutation,
    useDeleteLabelForResourceMutation,
    // resourceId
    useCreateAssignLabelForResourceIdMutation,
    useAssignLabelToResourceIdMutation,
    useDeleteLabelForResourceIdMutation,
} = labels;
