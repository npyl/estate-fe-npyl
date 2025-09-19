import { BlogPostReq } from "@/types/company";
import { useCallback } from "react";
import debugLog from "@/_private/debugLog";
import isFalsy from "@/utils/isFalsy";
import { blog, useAddImageMutation } from "@/services/blog";
import useDialog from "@/hooks/useDialog";
import { useDispatch } from "react-redux";
import { getAccessToken } from "@/contexts/accessToken";

const createOrUpdate = async (d: Omit<BlogPostReq, "images">) => {
    try {
        const res = await fetch("/api/blog", {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(d),
        });
        if (!res.ok) throw await res.json();

        return (await res.json()) as number;
    } catch (ex) {
        debugLog(ex);
        return null;
    }
};

const useCreateOrUpdateBlogPostMutation = () => {
    const dispatch = useDispatch();

    const [isLoading, startLoading, stopLoading] = useDialog();

    const [addImage] = useAddImageMutation();
    const addImageCb = useCallback(
        (postId: number) => (image: File) => addImage({ postId, image }),
        []
    );

    const cb = useCallback(async ({ images, ...d }: BlogPostReq) => {
        try {
            startLoading();

            const postId = await createOrUpdate(d);
            if (isFalsy(postId)) throw new Error("res1");

            await Promise.all(images.map(addImageCb(postId!)));

            stopLoading();

            dispatch(blog.util.invalidateTags(["BlogPosts", "BlogPostById"]));

            return { data: {} };
        } catch (ex) {
            debugLog(ex);
            return { error: "" };
        }
    }, []);
    return [cb, { isLoading }] as const;
};

export default useCreateOrUpdateBlogPostMutation;
