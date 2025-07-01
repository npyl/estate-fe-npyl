import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    BlogFilters,
    BlogPostReq,
    BlogPostRes,
    BlogPostShort,
} from "@/types/company";
import IPage from "@/types/page";

interface IBlogPostByIdReq {
    postId: number;
}

interface IUploadImageReq extends IBlogPostByIdReq {
    file: File;
}

export const blog = createApi({
    reducerPath: "blog",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/blog`,
        prepareHeaders: (headers) => {
            headers.set(
                "Authorization",
                `Bearer ${localStorage.getItem("accessToken")}`
            );
            return headers;
        },
    }),

    tagTypes: ["BlogPosts", "BlogPostById"],

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

        createOrUpdateBlogPost: builder.mutation<void, BlogPostReq>({
            query: ({ id, ...body }) => ({
                url: Boolean(id) ? `/${id}` : ``,
                method: Boolean(id) ? "PUT" : "POST",
                body,
            }),
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

        uploadBlogPostImage: builder.mutation<void, IUploadImageReq>({
            query: ({ postId, file }) => {
                const body = new FormData();
                body.append("file", file);

                return {
                    url: `/${postId}/uploadImage`,
                    method: "POST",
                    body,
                    responseHandler: "text",
                };
            },
            invalidatesTags: ["BlogPosts", "BlogPostById"],
        }),

        removeBlogPostImage: builder.mutation<void, number>({
            query: (postId) => ({
                url: `/${postId}/deleteImage`,
                method: "DELETE",
            }),
            invalidatesTags: ["BlogPosts", "BlogPostById"],
        }),
    }),
});

export const {
    useFilterBlogPostsQuery,
    useGetBlogPostByIdQuery,
    useCreateOrUpdateBlogPostMutation,
    useDeleteBlogPostMutation,
    useUploadBlogPostImageMutation,
    useRemoveBlogPostImageMutation,
} = blog;
