import { BlogPostReq } from "@/types/company";
import { useCallback } from "react";
import debugLog from "@/_private/debugLog";
import isFalsy from "@/utils/isFalsy";
import {
    blog,
    useAddImageMutation,
    useSetThumbnailMutation,
} from "@/services/blog";
import useDialog from "@/hooks/useDialog";
import { useDispatch } from "react-redux";
import { getAccessToken } from "@/contexts/tokens";

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

/**
 * 1st image:   thumbnail - call thumbnail endpoint
 * rest:        normal
 */
const useSetImages = () => {
    const [setThumbnail] = useSetThumbnailMutation();

    const [addImageCb] = useAddImageMutation();
    const addImage = useCallback(
        (postId: number) => (image: File) => addImageCb({ postId, image }),
        []
    );
    return useCallback((i: File[], postId: number) => {
        const thumbnail = i.at(0);
        if (!thumbnail) return;

        const rest = i.slice(1);

        const p0 = setThumbnail({ image: thumbnail, postId });
        const p = rest.map(addImage(postId));

        return Promise.all([p0, ...p]);
    }, []);
};

const useCreateOrUpdateBlogPostMutation = () => {
    const dispatch = useDispatch();

    const [isLoading, startLoading, stopLoading] = useDialog();

    const setImages = useSetImages();

    const cb = useCallback(async ({ images, ...d }: BlogPostReq) => {
        try {
            startLoading();

            const postId = await createOrUpdate(d);
            if (isFalsy(postId)) throw new Error("res1");

            await setImages(images, postId!);

            dispatch(blog.util.invalidateTags(["BlogPosts", "BlogPostById"]));

            stopLoading();

            return { data: {} };
        } catch (ex) {
            debugLog(ex);
            startLoading();
            return { error: "" };
        }
    }, []);
    return [cb, { isLoading }] as const;
};

export default useCreateOrUpdateBlogPostMutation;
