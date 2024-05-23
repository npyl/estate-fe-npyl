import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface DeepLTranslate {
    source_lang: string;
    target_lang: string;
    text: string[];
}

interface DeepLTranslateResponse {
    translations: {
        detected_source_language: string;
        text: string;
    }[];
}

export const translation = createApi({
    reducerPath: "translation",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/translate",
    }),

    endpoints: (builder) => ({
        translate: builder.mutation<DeepLTranslateResponse, DeepLTranslate>({
            query: (body) => ({
                url: "",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const { useTranslateMutation } = translation;
