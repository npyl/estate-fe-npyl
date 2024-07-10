import { Card, CardHeader, CardContent } from "@mui/material";
import { IPropertyFile, Upload } from "src/components/upload";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { IPropertyBlueprint } from "src/types/file";
import {
    useDeletePropertyBlueprintMutation,
    useGetPropertyByIdQuery,
} from "src/services/properties";
import { useRouter } from "next/router";
import { BlueprintViewer } from "../components/BlueprintViewer";
import usePropertyUpload from "@/hooks/property/uploadFile";

const BlueprintsSection: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation();

    const { propertyId } = router.query;

    const { data: property } = useGetPropertyByIdQuery(+propertyId!);
    const blueprints = useMemo(() => property?.blueprints || [], [property]);

    const [uploadFiles, invalidateTags] = usePropertyUpload("blueprint");
    const [deleteBlueprint] = useDeletePropertyBlueprintMutation();

    const [blueprintUrl, setBlueprintUrl] = useState("");

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
                    onDrop={uploadFiles}
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
