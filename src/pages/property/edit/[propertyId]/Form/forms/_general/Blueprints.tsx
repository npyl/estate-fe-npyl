import { Upload } from "src/components/upload";
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

    const { uploadFiles, isLoading: isUploading } =
        usePropertyUpload("blueprint");

    const [deleteBlueprint, { isLoading: isDeleting }] =
        useDeletePropertyBlueprintMutation();

    const [blueprintUrl, setBlueprintUrl] = useState("");

    const handleRemoveFile = (key: string) =>
        deleteBlueprint({
            propertyId,
            imageKey: key,
        });

    return (
        <Panel label={t("Blueprints")}>
            <Upload
                multiple
                disabled={isUploading || isDeleting}
                files={blueprints}
                onDrop={uploadFiles}
                onFileClick={setBlueprintUrl}
                onRemove={handleRemoveFile}
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
