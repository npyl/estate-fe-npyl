import { createApi } from "@reduxjs/toolkit/query/react";
import { INote, AddNoteReq } from "@/types/note";
import getBaseQueryWithReauth from "./_util/getBaseQueryWithReauth";

export const note = createApi({
    reducerPath: "note",
    baseQuery: getBaseQueryWithReauth({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/notes`,
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
