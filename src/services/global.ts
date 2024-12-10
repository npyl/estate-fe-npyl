import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGlobal } from "src/types/global";
import { apiWithTranslation, createLanguageAwareHook as la } from "./_util";

export const global = apiWithTranslation({
    reducerPath: "global",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/global`,
    }),
    tagTypes: ["Global"],
    endpoints: (builder) => ({
        allGlobals: builder.query<IGlobal, void>({
            query: () => "",
            providesTags: ["Global"],
        }),
    }),
});

const useAllGlobalsQuery = la(global.useAllGlobalsQuery);

export { useAllGlobalsQuery };
