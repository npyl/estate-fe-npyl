import { UploadProgress } from "@/types/file";
import {
    filesApiSlice,
    useAddPropertyFileMutation,
    useUploadPropertyFileMutation,
} from "@/services/properties/file";
import { IPropertyFileRes, TFileVariant } from "@/types/file";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

interface UploadResponse {
    key: string;
    cdnUrl: string;
}

type PromiseFunction<T> = () => Promise<T>;

async function executeSequentially<T>(
    promises: PromiseFunction<T>[]
): Promise<T[]> {
    const results: T[] = [];

    for (const promise of promises) {
        const result = await promise();
        results.push(result);
    }

    return results;
}

const getTag = (variant: TFileVariant) =>
    variant === "image"
        ? "PropertyByIdImages"
        : variant === "blueprint"
        ? "PropertyByIdBlueprints"
        : variant === "document"
        ? "PropertyByIdDocuments"
        : null;

const usePropertyUpload = (
    variant: TFileVariant,
    onProgressUpdate?: (p: UploadProgress) => void
) => {
    const router = useRouter();
    const { propertyId } = router.query;

    const [addFile] = useAddPropertyFileMutation(); // requests Backend
    const [uploadFile] = useUploadPropertyFileMutation(); // PUTS to Amazon

    const dispatch = useDispatch();

    const [isLoading, setLoading] = useState(false);

    const invalidateTags = () => {
        const tag = getTag(variant);
        if (!tag) return;
        dispatch(filesApiSlice.util.invalidateTags([tag]));
    };

    const step0 = useCallback(
        async (image: File): Promise<IPropertyFileRes> => {
            const { name: filename, type: contentType, size } = image;

            if (!filename || !contentType)
                throw new Error("filename or contentType cannot be null");

            // get amazon url
            const response = await addFile({
                id: +propertyId!,
                variant,
                body: {
                    filename,
                    size,
                    contentType,
                },
            });

            if ("error" in response) return Promise.reject(response.error);

            return Promise.resolve(response.data);
        },
        [propertyId]
    );

    const step1 = useCallback(
        async (
            file: File | undefined,
            fileResponse: IPropertyFileRes
        ): Promise<UploadResponse> => {
            if (!file) throw new Error("null image!");

            const { type: contentType } = file;
            const { key, url, cdnUrl } = fileResponse;

            if (!contentType) throw new Error("contentType cannot be null");
            if (!key || !url || !cdnUrl) throw new Error("checks2 nulls");

            // PUT to amazon url
            const response = await uploadFile({
                variant,
                url,
                file,
                onProgressUpdate: (p) => onProgressUpdate?.({ key, p }),
            });

            if (!response)
                throw new Error("Uploading the image failed: ", response);

            return { cdnUrl, key };
        },
        [onProgressUpdate]
    );

    const uploadFiles = useCallback(async (acceptedFiles: File[]) => {
        setLoading(true);

        const fileResponses = await Promise.all(acceptedFiles.map(step0));

        /* Upload Sequentially */
        const uploadPromises = fileResponses.map(
            (fileResponse, i) => () => step1(acceptedFiles.at(i), fileResponse)
        );

        executeSequentially(uploadPromises)
            .then(invalidateTags)
            .then(() => setLoading(false))
            .catch((error) => console.error("SequentialUploadError:", error));
    }, []);

    return { uploadFiles, invalidateTags, isLoading };
};

export default usePropertyUpload;
