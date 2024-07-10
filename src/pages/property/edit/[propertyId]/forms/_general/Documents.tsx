import { Card, CardHeader, CardContent } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IPropertyFile, Upload } from "src/components/upload";
import { useDeletePropertyDocumentMutation } from "src/services/properties";
import { PDFViewer } from "../components/PDFViewer";
import usePropertyUpload from "@/hooks/property/uploadFile";
import { usePropertyDocuments } from "@/hooks/property";

const DocumentsSection: React.FC = () => {
    const { t } = useTranslation();

    const { documents, propertyId } = usePropertyDocuments();

    const { uploadFiles, invalidateTags, isLoading } =
        usePropertyUpload("document");
    const [deleteDocument] = useDeletePropertyDocumentMutation();

    const [pdfUrl, setPdfUrl] = useState("");

    const handleFileClick = ({ url }: IPropertyFile) => url && setPdfUrl(url);

    const handleRemoveFile = (inputFile: IPropertyFile) =>
        deleteDocument({
            propertyId,
            imageKey: inputFile.key,
        });

    const handleRemoveAllFileData = () =>
        Promise.all(
            documents.map(({ key }) =>
                deleteDocument({
                    propertyId,
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
                    disabled={isLoading}
                    variant="document"
                    thumbnail={false}
                    files={documents}
                    onFileClick={handleFileClick}
                    onDrop={uploadFiles}
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
