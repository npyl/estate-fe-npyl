import { getAccessToken } from "@/contexts/tokens";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { INote, AddNoteReq } from "@/types/note";

export const note = createApi({
    reducerPath: "note",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/notes`,
        prepareHeaders: (headers) => {
            // By default, if we have a token in the store, let's use that for authenticated requests

            headers.set("Authorization", `Bearer  ${getAccessToken()}`);

            return headers;
        },
    }),
    tagTypes: ["Notes"],
    endpoints: (builder) => ({
        getNotesByPropertyId: builder.query<INote[], number>({
            query: (id) => ({
                url: `/property/${id}`,
            }),
            providesTags: ["Notes"],
        }),
        getNotesByCustomerId: builder.query<INote[], number>({
            query: (id) => ({
                url: `/customer/${id}`,
            }),
            providesTags: ["Notes"],
        }),

        addNoteToPropertyWithId: builder.mutation<any, AddNoteReq>({
            query: ({ id, body }) => ({
                url: `/property/${id}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Notes"],
        }),
        addNoteToCustomerWithId: builder.mutation<any, AddNoteReq>({
            query: ({ id, body }) => ({
                url: `/customer/${id}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Notes"],
        }),
        deleteWithId: builder.mutation<any, number>({
            query: (id: number) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Notes"],
        }),
    }),
});

export const {
    useGetNotesByPropertyIdQuery,
    useAddNoteToPropertyWithIdMutation,
    useGetNotesByCustomerIdQuery,
    useAddNoteToCustomerWithIdMutation,
    useDeleteWithIdMutation,
} = note;
