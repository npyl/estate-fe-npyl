import { useCallback, useEffect } from "react";
import { useGetImagesQuery } from "@/services/blog";
import useDialog from "@/hooks/useDialog";
import isFalsy from "@/utils/isFalsy";
import uuidv4 from "@/utils/uuidv4";
import { IPropertyFileMini } from "@/types/file";

const urlToFile = async ({ url }: IPropertyFileMini) => {
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
    const { data } = useGetImagesQuery(postId!, {
        skip: isFalsy(postId),
    });
    const [isLoading, startLoading, stopLoading] = useDialog();
    const getFiles = useCallback(async (i: IPropertyFileMini[]) => {
        startLoading();
        const all = await Promise.all(i.map(urlToFile));
        onChange(all);
        stopLoading();
    }, []);
    useEffect(() => {
        if (isFalsy(data)) return;
        if (data!.length === 0) return;
        getFiles(data!);
    }, [data]);
    return { isLoading };
};

export default useInitialise;
