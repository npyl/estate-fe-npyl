import { FC } from "react";

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

const isPDF = (mimeType: string) => mimeType === "application/pdf";

interface ViewerProps {
    url: string;
    mimeType: string;
}

const Viewer: FC<ViewerProps> = ({ url, mimeType }) => (
    <>
        {isViewableImage(mimeType) ? (
            <img
                src={url}
                alt="alt"
                style={{ maxWidth: "100%", maxHeight: "70vh" }}
            />
        ) : null}

        {isPDF(mimeType) ? (
            <iframe
                src={url}
                style={{ border: "none", width: "100%", height: "100vh" }}
            />
        ) : null}
    </>
);

export type { ViewerProps };
export default Viewer;
