import { useCallback, useEffect } from "react";
import { useGetBlogPostByIdQuery } from "@/services/blog";
import useDialog from "@/hooks/useDialog";
import isFalsy from "@/utils/isFalsy";
import uuidv4 from "@/utils/uuidv4";

const urlToFile = async (url: string) => {
    const filename = uuidv4();

    const response = await fetch(url);
    const blob = await response.blob();

    // Create a File object from the blob
    return new File([blob], filename, { type: blob.type });
};

const useInitialise = (
    postId: number | undefined,
    onChange: (f: File[]) => void
) => {
    const { data, isLoading: isLoading0 } = useGetBlogPostByIdQuery(postId!, {
        skip: isFalsy(postId),
    });
    const [isLoading1, startLoading, stopLoading] = useDialog();
    const getFiles = useCallback(async () => {
        const i = data?.images ?? [];
        if (i.length === 0) return;

        startLoading();
        const all = await Promise.all(i.map(urlToFile));
        onChange(all);
        stopLoading();
    }, []);
    useEffect(() => {
        if (isFalsy(postId)) return;
        getFiles();
    }, [postId]);
    const isLoading = isLoading0 || isLoading1;
    return { isLoading };
};

export default useInitialise;
