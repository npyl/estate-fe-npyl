import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { INote, INotePOST } from "src/types/note";

interface NoteForPropertyProps {
    id: number;
    dataToSend: INotePOST;
}
type NoteForCustomerProps = NoteForPropertyProps;

export const note = createApi({
    reducerPath: "note",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/notes`,
        prepareHeaders: (headers) => {
            // By default, if we have a token in the store, let's use that for authenticated requests

            headers.set(
                "Authorization",
                `Bearer  ${localStorage.getItem("accessToken")}`
            );

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

        addNoteToPropertyWithId: builder.mutation<any, NoteForPropertyProps>({
            query: ({ id, dataToSend }) => ({
                url: `/property/${id}`,
                method: "POST",
                body: dataToSend,
            }),
            invalidatesTags: ["Notes"],
        }),
        addNoteToCustomerWithId: builder.mutation<any, NoteForCustomerProps>({
            query: ({ id, dataToSend }) => ({
                url: `/customer/${id}`,
                method: "POST",
                body: dataToSend,
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
