import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";

interface DownloadImagesZipProps {
    hidden: boolean;
    propertyId: number;
}

// Define the return type and parameters for our custom base query
interface CustomBaseQueryArgs {
    url: string;
    method?: string;
    headers?: Record<string, string>;
    responseType?: string;
}

const customFetchBaseQuery =
    (baseUrl: string): BaseQueryFn<CustomBaseQueryArgs, unknown, Error> =>
    async (args, api, extraOptions) => {
        const response = await fetch(`${baseUrl}/${args.url}`, {
            method: args.method,
            headers: {
                ...args.headers,
                Authorization: `Bearer  ${localStorage.getItem("accessToken")}`,
            },
            ...extraOptions,
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.blob();

        return { data };
    };

export const exports = createApi({
    reducerPath: "exports",
    baseQuery: customFetchBaseQuery(
        `${process.env.NEXT_PUBLIC_API_URL}/property`
    ),
    tagTypes: ["PropertyByIdZip"],
    endpoints: (builder) => ({
        downloadImages: builder.query<Blob, DownloadImagesZipProps>({
            query: ({ propertyId, hidden }) => {
                return {
                    url: `${propertyId}/downloadImages?hidden=${
                        !hidden ? "0" : "1"
                    }`,
                    method: "GET", // adjust as necessary
                    // add other required properties here if needed
                };
            },
            providesTags: ["PropertyByIdZip"],
        }),
        downloadDocuments: builder.query<Blob, number>({
            query: (propertyId: number) => {
                return {
                    url: `${propertyId}/downloadDocuments`,
                    method: "GET",
                };
            },
        }),
    }),
});

export const { useLazyDownloadImagesQuery, useLazyDownloadDocumentsQuery } =
    exports;
