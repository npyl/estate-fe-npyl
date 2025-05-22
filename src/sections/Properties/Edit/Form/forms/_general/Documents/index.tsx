import { useState } from "react";
import dynamic from "next/dynamic";
import Panel from "./Panel";
const PDFViewer = dynamic(() => import("@/sections/ViewerDialog"));

const DocumentsSection: React.FC = () => {
    const [pdfUrl, setPdfUrl] = useState("");

    return (
        <>
            <Panel onDocumentClick={setPdfUrl} />

            {pdfUrl ? (
                <PDFViewer
                    url={pdfUrl}
                    mimeType="application/pdf"
                    onClose={() => setPdfUrl("")}
                />
            ) : null}
        </>
    );
};
export default DocumentsSection;
