import { BlogPostReq } from "@/types/company";
import { getAccessToken } from "@/contexts/accessToken";
import { useCallback, useMemo } from "react";
import debugLog from "@/_private/debugLog";
import isFalsy from "@/utils/isFalsy";
import {
    blog,
    useAddImageMutation,
    useGetBlogPostByIdQuery,
    useRemoveImageMutation,
} from "@/services/blog";
import useDialog from "@/hooks/useDialog";
import { useRouter } from "next/router";
import toNumberSafe from "@/utils/toNumberSafe";
import { useDispatch } from "react-redux";
import { IPropertyFileMini } from "@/types/file";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/blog`;

const createOrUpdate = async (
    d: Omit<BlogPostReq, "images">
): Promise<number | null> => {
    try {
        const isCreate = isFalsy(d.id);
        const url = isCreate ? baseUrl : `${baseUrl}/${d.id!}`;
        const method = isCreate ? "POST" : "PUT";

        const res = await fetch(url, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                "Content-Type": "application/json",
            },
            method,
            body: JSON.stringify(d),
        });

        if (!res.ok) throw await res.json();

        // INFO: get id from response
        if (isCreate) {
            const id = await res.json();
            return id;
        }

        return d.id!;
    } catch (ex) {
        debugLog(ex);
        return null;
    }
};

const useRemoveAllImages = () => {
    const router = useRouter();
    const { postId } = router.query;
    const iPostId = toNumberSafe(postId);

    const { data } = useGetBlogPostByIdQuery(iPostId, { skip: iPostId === -1 });
    const images = useMemo(
        () => (Array.isArray(data?.images) ? data?.images : []),
        [data?.images]
    );

    const [removeImage] = useRemoveImageMutation();
    const removeImageCb = useCallback(
        ({ id }: IPropertyFileMini) => removeImage({ id, postId: iPostId }),
        [iPostId]
    );
    return useCallback(
        () => Promise.all(images.map(removeImageCb)),
        [iPostId, images, removeImageCb]
    );
};

const useCreateOrUpdateBlogPostMutation = () => {
    const dispatch = useDispatch();

    const [isLoading, startLoading, stopLoading] = useDialog();

    const [addImage] = useAddImageMutation();
    const addImageCb = useCallback(
        (postId: number) => (image: File) => addImage({ postId, image }),
        []
    );

    const removeAllImages = useRemoveAllImages();

    const cb = useCallback(
        async ({ images, ...d }: BlogPostReq) => {
            try {
                startLoading();
                const postId = await createOrUpdate(d);
                if (isFalsy(postId)) throw new Error("res1");

                await removeAllImages();

                await Promise.all(images.map(addImageCb(postId!)));
                stopLoading();

                dispatch(
                    blog.util.invalidateTags(["BlogPosts", "BlogPostById"])
                );

                return { data: {} };
            } catch (ex) {
                debugLog(ex);
                return { error: "" };
            }
        },
        [removeAllImages]
    );
    return [cb, { isLoading }] as const;
};

export default useCreateOrUpdateBlogPostMutation;
