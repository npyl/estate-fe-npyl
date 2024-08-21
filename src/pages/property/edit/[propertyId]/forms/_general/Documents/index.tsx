import { useState } from "react";
const PDFViewer = dynamic(() => import("./PDFViewer"));
import dynamic from "next/dynamic";
import Panel from "./Panel";

const DocumentsSection: React.FC = () => {
    const [pdfUrl, setPdfUrl] = useState("");

    return (
        <>
            <Panel onDocumentClick={setPdfUrl} />

            {pdfUrl ? (
                <PDFViewer
                    open={!!pdfUrl}
                    url={pdfUrl}
                    onClose={() => setPdfUrl("")}
                />
            ) : null}
        </>
    );
};
export default DocumentsSection;
