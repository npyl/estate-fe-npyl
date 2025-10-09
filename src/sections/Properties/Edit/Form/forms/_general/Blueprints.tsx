import { Upload } from "@/components/upload";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDeletePropertyBlueprintMutation } from "@/services/properties";
import usePropertyBlueprints from "@/sections/Properties/hooks/usePropertyBlueprints";
import Panel from "@/components/Panel";
import usePropertyUpload from "@/ui/Property/useUploader";
import dynamic from "next/dynamic";
const Lightbox = dynamic(() => import("@/components/Lightbox"));

const BlueprintsSection: React.FC = () => {
    const { t } = useTranslation();

    const { blueprints, propertyId } = usePropertyBlueprints();

    const [uploadFiles, { isUploading }] = usePropertyUpload("blueprint");

    const [deleteBlueprint, { isLoading: isDeleting }] =
        useDeletePropertyBlueprintMutation();

    const [blueprintUrl, setBlueprintUrl] = useState("");
    const index = useMemo(
        () => blueprints.findIndex(({ url }) => url === blueprintUrl),
        [blueprints, blueprintUrl]
    );
    const onClose = useCallback(() => setBlueprintUrl(""), []);

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

            {blueprints.length > 0 ? (
                <Lightbox
                    open={Boolean(blueprintUrl)}
                    index={index}
                    images={blueprints}
                    onClose={onClose}
                />
            ) : null}
        </Panel>
    );
};
export default BlueprintsSection;
