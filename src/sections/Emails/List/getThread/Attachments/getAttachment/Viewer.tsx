import { FC } from "react";
import { Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Helper function to convert base64url to standard base64
const convertBase64UrlToBase64 = (base64url: string): string => {
    // Make sure input is a string before attempting to replace
    if (typeof base64url !== "string") {
        console.error(
            "Expected string for base64url but got:",
            typeof base64url
        );
        return "";
    }
    return base64url.replace(/-/g, "+").replace(/_/g, "/");
};

// Helper to determine if attachment is viewable as an image
const isViewableImage = (mimeType: string): boolean => {
    const imageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/svg+xml",
    ];
    return imageTypes.includes(mimeType.toLowerCase());
};

interface ViewerProps {
    data: string;
    mimeType: string;
    fileName: string;
    onClose: VoidFunction;
}

const Viewer: FC<ViewerProps> = ({ data, mimeType, fileName, onClose }) => {
    // Check if data is a valid string before processing
    if (typeof data !== "string") {
        console.error("Invalid data format received:", data);
        return (
            <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
                <div style={{ padding: "20px", textAlign: "center" }}>
                    <h3>Error: Invalid attachment data format</h3>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </Dialog>
        );
    }

    // Convert base64url format (used by Gmail API) to standard base64
    const standardBase64 = convertBase64UrlToBase64(data);

    // Create the appropriate data URL with the correct MIME type
    const dataUrl = `data:${mimeType};base64,${standardBase64}`;

    return (
        <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px",
                }}
            >
                <h3>{fileName}</h3>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </div>

            <div style={{ padding: "20px", textAlign: "center" }}>
                {isViewableImage(mimeType) ? (
                    <img
                        src={dataUrl}
                        alt={fileName}
                        style={{ maxWidth: "100%", maxHeight: "70vh" }}
                    />
                ) : (
                    <div>
                        <p>
                            This file type ({mimeType}) cannot be previewed
                            directly.
                        </p>
                        <a
                            href={dataUrl}
                            download={fileName}
                            style={{
                                padding: "10px 20px",
                                background: "#1976d2",
                                color: "white",
                                borderRadius: "4px",
                                textDecoration: "none",
                                display: "inline-block",
                                marginTop: "20px",
                            }}
                        >
                            Download File
                        </a>
                    </div>
                )}
            </div>
        </Dialog>
    );
};

export default Viewer;
