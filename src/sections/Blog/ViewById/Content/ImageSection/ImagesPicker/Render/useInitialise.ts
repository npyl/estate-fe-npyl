import { useCallback, useEffect } from "react";
import { useGetBlogPostByIdQuery } from "@/services/blog";
import useDialog from "@/hooks/useDialog";
import isFalsy from "@/utils/isFalsy";
import uuidv4 from "@/utils/uuidv4";
import { IPropertyFileMini } from "@/types/file";
import debugLog from "@/_private/debugLog";

const urlToFile = async ({ url }: IPropertyFileMini) => {
    try {
        const filename = uuidv4();

        const res = await fetch(
            `/api/image-proxy?url=${encodeURIComponent(url)}`
        );

        const blob = await res.blob();

        return new File([blob], filename, { type: blob.type });
    } catch (ex) {
        debugLog(ex);
        return null;
    }
};

const useInitialise = (
    postId: number | undefined,
    onChange: (f: File[]) => void
) => {
    const { data } = useGetBlogPostByIdQuery(postId!, {
        skip: isFalsy(postId),
    });
    const [isLoading, startLoading, stopLoading] = useDialog();
    const getFiles = useCallback(async (i: IPropertyFileMini[]) => {
        startLoading();
        const all = await Promise.all(i.map(urlToFile));
        if (!all.every(Boolean)) return;
        onChange(all as File[]);
        stopLoading();
    }, []);
    useEffect(() => {
        const images = data?.images ?? [];
        if (!Array.isArray(images) || images.length === 0) return;
        getFiles(images);
    }, [data?.images]);
    return { isLoading };
};

export default useInitialise;
