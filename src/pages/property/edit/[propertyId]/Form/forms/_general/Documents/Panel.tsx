import { useTranslation } from "react-i18next";
import { Upload } from "src/components/upload";
import { usePropertyDocuments } from "@/hooks/property";
import { FC } from "react";
import Panel from "@/components/Panel";
import usePropertyUpload from "@/hooks/property/uploadFile";
import { useDeletePropertyDocumentMutation } from "@/services/properties/file";

interface Props {
    onDocumentClick: (url: string) => void;
}

const DocumentsPanel: FC<Props> = ({ onDocumentClick }) => {
    const { t } = useTranslation();

    const { documents, propertyId } = usePropertyDocuments();

    const { uploadFiles, isLoading: isUploading } =
        usePropertyUpload("document");

    const [deleteDocument, { isLoading: isDeleteLoading }] =
        useDeletePropertyDocumentMutation();

    const handleRemoveFile = (key: string) =>
        deleteDocument({
            propertyId,
            imageKey: key,
        });

    // INFO: remove all button was ... removed because we have no respective endpoint on backend

    return (
        <Panel label={t("Documents")}>
            <Upload
                multiple
                disabled={isUploading || isDeleteLoading}
                variant="document"
                files={documents}
                onFileClick={onDocumentClick}
                onDrop={uploadFiles}
                onRemove={handleRemoveFile}
            />
        </Panel>
    );
};

export default DocumentsPanel;
