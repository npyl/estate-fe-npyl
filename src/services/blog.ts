import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    BlogFilters,
    BlogPostReq,
    BlogPostRes,
    BlogPostShort,
    IImageReq,
} from "@/types/company";
import IPage from "@/types/page";
import { IPropertyFile, IPropertyFileRes } from "@/types/file";
import { getAccessToken } from "@/contexts/accessToken";

const objectToFormData = (o: object, file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    // Append all other fields to FormData
    Object.entries(o).forEach(([key, value]) => {
        // Handle arrays and objects by stringifying them
        const stringValue =
            typeof value === "object" ? JSON.stringify(value) : String(value);

        formData.append(key, stringValue);
    });

    return formData;
};

type CreateOrUpdateBlogPostReq = Omit<Required<BlogPostReq>, "id"> & {
    id?: number;
};

interface RemoveImage {
    postId: number;
    imageKey: string;
}

interface IAddImageReq {
    postId: number;
    body: IImageReq;
}

export const blog = createApi({
    reducerPath: "blog",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/blog`,
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${getAccessToken()}`);
            return headers;
        },
    }),

    tagTypes: ["BlogPosts", "BlogPostById", "BlogPostByIdImages"],

    endpoints: (builder) => ({
        filterBlogPosts: builder.query<IPage<BlogPostShort>, BlogFilters>({
            query: (body) => ({
                url: `/filters`,
                method: "POST",
                body,
            }),
            providesTags: ["BlogPosts"],
        }),

        getBlogPostById: builder.query<BlogPostRes, number>({
            query: (postId) => `/${postId}`,
            providesTags: ["BlogPostById"],
        }),

        createOrUpdateBlogPost: builder.mutation<
            void,
            CreateOrUpdateBlogPostReq
        >({
            query: ({ id, thumbnail, ...other }) => {
                const isUpdate = Boolean(id);
                const url = isUpdate ? `/${id}` : ``;
                const method = isUpdate ? "PUT" : "POST";
                const body = objectToFormData(other, thumbnail);
                return {
                    url,
                    method,
                    body,
                };
            },
            invalidatesTags: ["BlogPosts", "BlogPostById"],
        }),

        deleteBlogPost: builder.mutation<void, number>({
            query: (postId) => ({
                url: `/${postId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["BlogPosts"],
        }),

        // -----------------------------------------------------------------------------

        getImages: builder.query<IPropertyFile[], number>({
            query: (postId) => `/${postId}`,
            providesTags: ["BlogPostByIdImages"],
        }),

        addImage: builder.mutation<IPropertyFileRes, IAddImageReq>({
            // INFO: asks for an amazon url from backend; to be used before uploadPropertyImage
            query: ({ postId, body }) => ({
                url: `/${postId}/addImage`,
                method: "POST",
                body,
            }),
            // onQueryStarted: optimisticAddFile,
        }),

        removeImage: builder.mutation<void, RemoveImage>({
            // INFO: removes BE entry for the specific key
            query: ({ postId, imageKey }) => ({
                url: `/${postId}/removeImage/${imageKey}`,
                method: "DELETE",
            }),
            // onQueryStarted: optimisticRemoveFile,
        }),
    }),
});

export type { CreateOrUpdateBlogPostReq };

export const {
    useFilterBlogPostsQuery,
    useGetBlogPostByIdQuery,
    useCreateOrUpdateBlogPostMutation,
    useDeleteBlogPostMutation,
    // ...
    useGetImagesQuery,
    useAddImageMutation,
    useRemoveImageMutation,
} = blog;
