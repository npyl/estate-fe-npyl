import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CSSProperties, FC } from "react";
import { useTranslation } from "react-i18next";

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

interface UnvieweablePlaceholderProps {
    url: string;
}

const UnvieweablePlaceholder: FC<UnvieweablePlaceholderProps> = ({ url }) => {
    const { t } = useTranslation();

    return (
        <Stack alignItems="center" spacing={2}>
            <Typography variant="h5">{t("UNVIEWABLE_FORMAT")}</Typography>
            <Button
                variant="contained"
                sx={{
                    width: "fit-content",
                }}
            >
                {t("Download")}
            </Button>
        </Stack>
    );
};

interface ViewerProps {
    url: string;
    mimeType: string;
    style?: CSSProperties;
}

const Viewer: FC<ViewerProps> = ({ url, mimeType, style = {} }) => {
    if (isViewableImage(mimeType))
        return (
            <img
                src={url}
                alt="alt"
                style={{ maxWidth: "100%", maxHeight: "70vh", ...style }}
            />
        );

    if (isPDF(mimeType))
        return (
            <iframe
                title="PDF"
                src={url}
                style={{
                    border: "none",
                    width: "100%",
                    height: "100vh",
                    ...style,
                }}
            />
        );

    return <UnvieweablePlaceholder url={url} />;
};

export { isViewableImage, isPDF };
export type { ViewerProps };
export default Viewer;
