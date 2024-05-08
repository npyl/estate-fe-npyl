import { useRouter } from "next/router";
import { useCallback } from "react";
import { useUploadPropertyFileMutation } from "src/services/properties";
import { IFileResponse } from "src/types/file";
import { properties } from "src/services/properties";
import { useDispatch } from "react-redux";

interface UploadResponse {
    key: string;
    cdnUrl: string;
}

const useUploadFile = (addMethod: any) => {
    const { propertyId } = useRouter().query;
    const dispatch = useDispatch();

    const [uploadMethod] = useUploadPropertyFileMutation();

    const addFile = useCallback(
        async (
            image: File,
            customContentType?: string // NOTE: in case it cannot be found automatically
        ): Promise<IFileResponse> => {
            const { name: filename, type: contentType, size } = image;

            if (!filename || (!contentType && !customContentType))
                throw new Error("filename or contentType cannot be null");

            const body = {
                filename,
                contentType: contentType || customContentType,
            };

            // get amazon url
            const response = await addMethod({
                id: +propertyId!,
                body: body,
            });

            if ("error" in response) return Promise.reject(response.error);

            return Promise.resolve(response.data);
        },
        []
    );

    const uploadFile = useCallback(
        async (
            file: File | undefined,
            fileResponse: IFileResponse,
            customContentType?: string // NOTE: in case it cannot be found automatically
        ): Promise<UploadResponse> => {
            if (!file) throw new Error("null image!");

            const { type: contentType, size } = file;
            const { key, url, cdnUrl } = fileResponse;

            if (!contentType && !customContentType)
                throw new Error("contentType cannot be null");
            if (!key || !url || !cdnUrl) throw new Error("checks2 nulls");

            // PUT to amazon url
            const response = await uploadMethod({
                variant: "googleEarth",
                url,
                file: customContentType
                    ? new File([file], file.name, { type: customContentType })
                    : file,
            });

            if (!response)
                throw new Error("Uploading the image failed: ", response);

            return { cdnUrl, key };
        },
        []
    );

    const invalidatePropertyTags = useCallback(
        () =>
            dispatch(
                properties.util.invalidateTags(["Properties", "PropertyById"])
            ),
        []
    );

    return { addFile, uploadFile, invalidatePropertyTags };
};

export default useUploadFile;
