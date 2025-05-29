import {
    PictureAsPdf,
    Image,
    Movie,
    AudioFile,
    Description,
    TableChart,
    Slideshow,
    Code,
    FolderZip,
    TextSnippet,
    InsertDriveFile,
    Javascript,
    Html,
    Css,
    DataObject,
    Schema,
    Terminal,
    Storage,
    VideoFile,
    Audiotrack,
    Photo,
    Article,
} from "@mui/icons-material";
import { CSSProperties, useMemo } from "react";
import { SvgIconComponent } from "@mui/icons-material";

const MIMETYPE_ICONS: { [key: string]: SvgIconComponent } = {
    // PDF
    "application/pdf": PictureAsPdf,

    // Images
    "image/jpeg": Image,
    "image/jpg": Image,
    "image/png": Image,
    "image/gif": Image,
    "image/webp": Image,
    "image/svg+xml": Photo,
    "image/bmp": Image,
    "image/tiff": Image,
    "image/ico": Image,
    "image/heic": Image,
    "image/avif": Image,

    // Videos
    "video/mp4": Movie,
    "video/avi": Movie,
    "video/mov": Movie,
    "video/wmv": Movie,
    "video/flv": Movie,
    "video/webm": Movie,
    "video/mkv": Movie,
    "video/3gp": Movie,
    "video/mpeg": Movie,
    "video/quicktime": Movie,
    "video/x-msvideo": VideoFile,

    // Audio
    "audio/mpeg": AudioFile,
    "audio/mp3": AudioFile,
    "audio/wav": AudioFile,
    "audio/ogg": AudioFile,
    "audio/aac": AudioFile,
    "audio/flac": AudioFile,
    "audio/wma": AudioFile,
    "audio/m4a": AudioFile,
    "audio/opus": Audiotrack,
    "audio/webm": Audiotrack,

    // Microsoft Office
    "application/msword": Description,
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        Description,
    "application/vnd.ms-excel": TableChart,
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        TableChart,
    "application/vnd.ms-powerpoint": Slideshow,
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        Slideshow,

    // OpenDocument formats
    "application/vnd.oasis.opendocument.text": Description,
    "application/vnd.oasis.opendocument.spreadsheet": TableChart,
    "application/vnd.oasis.opendocument.presentation": Slideshow,

    // Archives
    "application/zip": FolderZip,
    "application/x-rar-compressed": FolderZip,
    "application/x-7z-compressed": FolderZip,
    "application/x-tar": FolderZip,
    "application/gzip": FolderZip,
    "application/x-bzip2": FolderZip,

    // Programming Languages
    "text/html": Html,
    "text/css": Css,
    "text/javascript": Javascript,
    "application/javascript": Javascript,
    "application/json": DataObject,
    "text/xml": Schema,
    "application/xml": Schema,
    "text/x-python": Code,
    "text/x-java-source": Code,
    "text/x-c": Code,
    "text/x-c++": Code,
    "text/x-csharp": Code,
    "text/x-php": Code,
    "text/x-ruby": Code,
    "text/x-go": Code,
    "text/x-rust": Code,
    "text/x-swift": Code,
    "text/x-kotlin": Code,
    "application/typescript": Code,
    "text/x-yaml": Code,
    "application/x-sh": Terminal,
    "text/x-sql": Storage,
    "text/markdown": Article,

    // Text files
    "text/plain": TextSnippet,
    "text/rtf": TextSnippet,
    "text/csv": TableChart,
    "application/rtf": TextSnippet,

    // Other common types
    "application/octet-stream": InsertDriveFile,
    "application/x-executable": InsertDriveFile,
    "application/x-msdownload": InsertDriveFile,
    "application/vnd.android.package-archive": InsertDriveFile,
    "application/x-apple-diskimage": FolderZip,
    "application/x-deb": FolderZip,
    "application/x-rpm": FolderZip,
};

// Fallback mapping by category
const CATEGORY_ICONS: { [key: string]: SvgIconComponent } = {
    image: Image,
    video: Movie,
    audio: AudioFile,
    text: TextSnippet,
    application: InsertDriveFile,
};

const getMimetypeIcon = (mimeType: string): SvgIconComponent => {
    // First try exact match
    if (MIMETYPE_ICONS[mimeType]) {
        return MIMETYPE_ICONS[mimeType];
    }

    // Fallback to category
    const category = mimeType?.split("/")[0];
    if (CATEGORY_ICONS[category]) {
        return CATEGORY_ICONS[category];
    }

    // Default fallback
    return InsertDriveFile;
};

interface MimeTypeIconProps extends Omit<SvgIconComponent, "muiName"> {
    mimeType: string;
    filename: string;
    style?: CSSProperties;
}

const MimeTypeIcon = ({
    mimeType,
    filename,
    style,
    ...props
}: MimeTypeIconProps) => {
    const IconComponent = getMimetypeIcon(mimeType);

    const color = useMemo(() => {
        const category = mimeType?.split("/")[0];

        switch (category) {
            case "image":
                return "#4CAF50";
            case "video":
                return "#2196F3";
            case "audio":
                return "#FF9800";
            case "text":
                return "#666666";
            default:
                // Specific colors for common types
                if (mimeType?.includes("pdf")) return "#FF4444";
                if (mimeType?.includes("word") || mimeType?.includes("doc"))
                    return "#2B579A";
                if (mimeType?.includes("excel") || mimeType?.includes("xls"))
                    return "#217346";
                if (
                    mimeType?.includes("powerpoint") ||
                    mimeType?.includes("ppt")
                )
                    return "#D24726";
                if (
                    mimeType?.includes("zip") ||
                    mimeType?.includes("rar") ||
                    mimeType?.includes("7z")
                )
                    return "#795548";
                if (
                    mimeType?.includes("javascript") ||
                    mimeType?.includes("js")
                )
                    return "#F0DB4F";
                if (mimeType?.includes("html")) return "#E34C26";
                if (mimeType?.includes("css")) return "#1572B6";
                if (mimeType?.includes("python")) return "#3776AB";

                return "#666666";
        }
    }, [mimeType]);

    return <IconComponent style={{ color }} {...props} />;
};

export default MimeTypeIcon;
