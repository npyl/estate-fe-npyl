import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { INote } from "src/types/note";

interface NoteForPropertyProps {
  id: number;
  dataToSend: {
    content: string;
    creatorId: number;
  };
}
type NoteForCustomerProps = NoteForPropertyProps;

export const note = createApi({
  reducerPath: "note",
  baseQuery: fetchBaseQuery({
    baseUrl:
      // "http://Learningpathbe-env.eba-qvdghecz.us-east-2.elasticbeanstalk.com/api/users",
      "http://localhost:8080/api/notes",
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
      query: (id: number) => ({
        url: `/property/${id}`,
      }),
      providesTags: ["Notes"],
    }),
    getNotesByCustomerId: builder.query<INote[], number>({
      query: (id: number) => ({
        url: `/customer/${id}`,
      }),
      providesTags: ["Notes"],
    }),

    addNoteToPropertyWithId: builder.mutation<any, NoteForPropertyProps>({
      query: (props: NoteForPropertyProps) => ({
        url: `/property/${props.id}`,
        method: "POST",
        body: props.dataToSend,
      }),
      invalidatesTags: ["Notes"],
    }),
    addNoteToCustomerWithId: builder.mutation<any, NoteForCustomerProps>({
      query: (props: NoteForCustomerProps) => ({
        url: `/customer/${props.id}`,
        method: "POST",
        body: props.dataToSend,
      }),
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
