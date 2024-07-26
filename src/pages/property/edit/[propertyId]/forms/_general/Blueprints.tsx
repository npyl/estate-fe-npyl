import { IPropertyFile, Upload } from "src/components/upload";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDeletePropertyBlueprintMutation } from "src/services/properties";
import { BlueprintViewer } from "../components/BlueprintViewer";
import usePropertyUpload from "@/hooks/property/uploadFile";
import { usePropertyBlueprints } from "@/hooks/property";
import Panel from "@/components/Panel";

const BlueprintsSection: React.FC = () => {
    const { t } = useTranslation();

    const { blueprints, propertyId } = usePropertyBlueprints();

    const { uploadFiles, invalidateTags, isLoading } =
        usePropertyUpload("blueprint");
    const [deleteBlueprint] = useDeletePropertyBlueprintMutation();

    const [blueprintUrl, setBlueprintUrl] = useState("");

    const handleFileClick = ({ url }: IPropertyFile) =>
        url && setBlueprintUrl(url);

    const handleRemoveFile = (inputFile: IPropertyFile) =>
        deleteBlueprint({
            propertyId,
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
        <Panel label={t("Blueprints")}>
            <Upload
                multiple
                disabled={isLoading}
                files={blueprints}
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
        </Panel>
    );
};
export default BlueprintsSection;
