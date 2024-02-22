import { Card, CardHeader, CardContent } from "@mui/material";
import { IPropertyFile, Upload } from "src/components/upload";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    IPropertyBlueprint,
    IFileResponse,
    IPropertyBlueprintPOST,
} from "src/types/file";
import {
    properties,
    useAddPropertyBlueprintMutation,
    useDeletePropertyBlueprintMutation,
    useGetPropertyByIdQuery,
    useUploadPropertyFileMutation,
} from "src/services/properties";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { BlueprintViewer } from "../components/BlueprintViewer";

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

const BlueprintsSection: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { t } = useTranslation();

    const { propertyId } = router.query;

    const { data: property } = useGetPropertyByIdQuery(+propertyId!);
    const blueprints = useMemo(() => property?.blueprints || [], [property]);

    const [addBlueprint] = useAddPropertyBlueprintMutation();
    const [deleteBlueprint] = useDeletePropertyBlueprintMutation();
    const [uploadBlueprint] = useUploadPropertyFileMutation();

    const [blueprintUrl, setBlueprintUrl] = useState("");

    const addFile = async (image: File): Promise<IFileResponse> => {
        const { name: filename, type: contentType, size } = image;

        if (!filename || !contentType)
            throw new Error("filename or contentType cannot be null");

        const body: IPropertyBlueprintPOST = {
            filename,
            contentType,
        };

        // get amazon url
        const response = await addBlueprint({
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
        const response = await uploadBlueprint({
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
        [blueprints]
    );

    const handleFileClick = ({ url }: IPropertyFile) =>
        url && setBlueprintUrl(url);

    const handleRemoveFile = (inputFile: IPropertyFile) =>
        deleteBlueprint({
            propertyId: +propertyId!,
            imageKey: inputFile.key,
        });

    const handleRemoveAllFileData = () =>
        Promise.all(
            blueprints.map((blueprint) =>
                deleteBlueprint({
                    propertyId: +propertyId!,
                    imageKey: blueprint.key,
                })
            )
        ).then(invalidateTags);

    return (
        <Card>
            <CardHeader title={t("Blueprints")} />
            <CardContent>
                <Upload
                    multiple
                    thumbnail={false}
                    files={blueprints as IPropertyBlueprint[]}
                    onDrop={handleDropMultiFile}
                    onFileClick={handleFileClick}
                    onRemove={handleRemoveFile}
                    onRemoveAll={handleRemoveAllFileData}
                />

                {blueprintUrl && (
                    <BlueprintViewer
                        open={!!blueprintUrl}
                        url={blueprintUrl}
                        onClose={() => setBlueprintUrl("")}
                    />
                )}
            </CardContent>
        </Card>
    );
};
export default BlueprintsSection;
