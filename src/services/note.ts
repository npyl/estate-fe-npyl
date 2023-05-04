import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { INote } from "src/types/note";

interface NoteForPropertyProps {
  id: number;
  dataToSend: any;
}

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

    addNoteToPropertyWithId: builder.mutation<any, NoteForPropertyProps>({
      query: (props: NoteForPropertyProps) => ({
        url: `/property/${props.id}`,
        method: "POST",
        body: props.dataToSend,
      }),
      invalidatesTags: ["Notes"],
    }),
  }),
});

export const {
  useGetNotesByPropertyIdQuery,
  useAddNoteToPropertyWithIdMutation,
} = note;
