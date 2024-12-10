import Dialog from "@/components/Dialog";

interface PDFViewerProps {
    url: string;
    onClose: () => void;
}

const PDFViewer = ({ url, onClose }: PDFViewerProps) => (
    <Dialog
        open
        onClose={onClose}
        maxWidth="xl"
        content={
            <iframe
                src={url}
                style={{ border: "none", width: "100%", height: "100vh" }}
            />
        }
    />
);

export default PDFViewer;
