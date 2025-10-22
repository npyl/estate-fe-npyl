import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BlogFilters, BlogPostRes, BlogPostShort } from "@/types/company";
import IPage from "@/types/page";
import { getAccessToken } from "@/contexts/tokens";
import useCreateOrUpdateBlogPostMutation from "./useCreateOrUpdateBlogPostMutation";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/blog`;

interface RemoveImage {
    postId: number;
    id: number;
}

interface IImageReq {
    postId: number;
    image: File;
}

export const blog = createApi({
    reducerPath: "blog",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/blog",
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${getAccessToken()}`);
            return headers;
        },
    }),

    tagTypes: ["BlogPosts", "BlogPostById"],

    endpoints: (builder) => ({
        filterBlogPosts: builder.query<IPage<BlogPostShort>, BlogFilters>({
            query: (body) => ({
                url: `${baseUrl}/filters`,
                method: "POST",
                body,
            }),
            providesTags: ["BlogPosts"],
        }),

        getBlogPostById: builder.query<BlogPostRes, number>({
            query: (postId) => `/${postId}`,
            providesTags: ["BlogPostById"],
        }),

        deleteBlogPost: builder.mutation<void, number>({
            query: (postId) => ({
                url: `${baseUrl}/${postId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["BlogPosts"],
        }),

        // -----------------------------------------------------------------------------

        setThumbnail: builder.mutation<void, IImageReq>({
            query: ({ postId, image }) => {
                const body = new FormData();
                body.append("file", image);
                return {
                    url: `${baseUrl}/${postId}/uploadImage`,
                    body,
                    method: "POST",
                };
            },
        }),

        addImage: builder.mutation<void, IImageReq>({
            query: ({ postId, image }) => {
                const body = new FormData();
                body.append("file", image);
                return {
                    url: `${baseUrl}/${postId}/images`,
                    body,
                    method: "POST",
                };
            },
        }),
    }),
});

export { useCreateOrUpdateBlogPostMutation };

export const {
    useFilterBlogPostsQuery,
    useGetBlogPostByIdQuery,
    useDeleteBlogPostMutation,
    // ...
    useSetThumbnailMutation,
    useAddImageMutation,
} = blog;
