import { Card, CardHeader, CardContent } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { IPropertyFile, Upload } from "src/components/upload";
import {
    properties,
    useAddPropertyDocumentMutation,
    useDeletePropertyDocumentMutation,
    useGetPropertyByIdQuery,
    useUploadPropertyFileMutation,
} from "src/services/properties";
import { IFileResponse, IPropertyDocumentPOST } from "src/types/file";
import { PDFViewer } from "../components/PDFViewer";

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

const DocumentsSection: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const router = useRouter();
    const { propertyId } = router.query;

    const { data: property } = useGetPropertyByIdQuery(+propertyId!);
    const documents = useMemo(() => property?.documents || [], [property]);

    const [addDocument] = useAddPropertyDocumentMutation();
    const [deleteDocument] = useDeletePropertyDocumentMutation();
    const [uploadDocument] = useUploadPropertyFileMutation();

    const [pdfUrl, setPdfUrl] = useState("");

    const addFile = async (image: File): Promise<IFileResponse> => {
        const { name: filename, type: contentType, size } = image;

        if (!filename || !contentType)
            throw new Error("filename or contentType cannot be null");

        const body: IPropertyDocumentPOST = {
            filename,
            contentType,
        };

        // get amazon url
        const response = await addDocument({
            id: +propertyId!,
            body: body,
        });

        if ("error" in response) return Promise.reject(response.error);

        return Promise.resolve(response.data);
    };

    const uploadFile = async (
        file: File | undefined,
        fileResponse: IFileResponse
    ): Promise<UploadResponse> => {
        if (!file) throw new Error("null image!");

        const { type: contentType, size } = file;
        const { key, url, cdnUrl } = fileResponse;

        if (!contentType) throw new Error("contentType cannot be null");
        if (!key || !url || !cdnUrl) throw new Error("checks2 nulls");

        // PUT to amazon url
        const response = await uploadDocument({
            url,
            file,
        });

        if (!response)
            throw new Error("Uploading the image failed: ", response);

        return { cdnUrl, key };
    };

    const invalidateTags = () =>
        dispatch(
            properties.util.invalidateTags(["Properties", "PropertyById"])
        );

    const handleDropMultiFile = useCallback(
        async (acceptedFiles: File[]) => {
            const fileResponses = await Promise.all(acceptedFiles.map(addFile));

            /* Upload Sequentially */
            const uploadPromises = fileResponses.map(
                (fileResponse, i) => () =>
                    uploadFile(acceptedFiles.at(i), fileResponse)
            );

            executeSequentially(uploadPromises)
                .then(invalidateTags)
                .catch((error) =>
                    console.error("SequentialUploadError:", error)
                );
        },
        [documents]
    );

    const handleFileClick = ({ url }: IPropertyFile) => url && setPdfUrl(url);

    const handleRemoveFile = (inputFile: IPropertyFile) =>
        deleteDocument({
            propertyId: +propertyId!,
            imageKey: inputFile.key,
        });

    const handleRemoveAllFileData = () =>
        Promise.all(
            documents.map(({ key }) =>
                deleteDocument({
                    propertyId: +propertyId!,
                    imageKey: key,
                })
            )
        ).then(invalidateTags);

    return (
        <Card>
            <CardHeader title={t("Documents")} />
            <CardContent>
                <Upload
                    multiple
                    variant="document"
                    thumbnail={false}
                    files={documents}
                    onFileClick={handleFileClick}
                    onDrop={handleDropMultiFile}
                    onRemove={handleRemoveFile}
                    onRemoveAll={handleRemoveAllFileData}
                />

                {pdfUrl && (
                    <PDFViewer
                        open={!!pdfUrl}
                        url={pdfUrl}
                        onClose={() => setPdfUrl("")}
                    />
                )}
            </CardContent>
        </Card>
    );
};
export default DocumentsSection;
