import { Card, CardHeader, CardContent } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { IPropertyFile, Upload } from "src/components/upload";
import {
    properties,
    useDeletePropertyDocumentMutation,
    useGetPropertyByIdQuery,
    useUploadPropertyFileMutation,
} from "src/services/properties";
import { IPropertyFileRes, IPropertyDocumentPOST } from "src/types/file";
import { PDFViewer } from "../components/PDFViewer";
import usePropertyUpload from "@/hooks/property/uploadFile";

const DocumentsSection: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const router = useRouter();
    const { propertyId } = router.query;

    const { data: property } = useGetPropertyByIdQuery(+propertyId!);
    const documents = useMemo(() => property?.documents || [], [property]);

    const [uploadFiles, invalidateTags] = usePropertyUpload("document");
    const [deleteDocument] = useDeletePropertyDocumentMutation();

    const [pdfUrl, setPdfUrl] = useState("");

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
