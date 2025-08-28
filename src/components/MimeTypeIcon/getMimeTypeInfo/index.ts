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
    SvgIconComponent,
} from "@mui/icons-material";

const PDF_COLOR = "#FF4444";
const BASIC_IMAGE_COLOR = "#4CAF50";
const FALLBACK_COLOR = "#666666";

interface MimeTypeInfo {
    Icon: SvgIconComponent;
    color: string;
}

const MIMETYPE_ICONS: { [key: string]: MimeTypeInfo } = {
    // PDF
    "application/pdf": { Icon: PictureAsPdf, color: PDF_COLOR },

    // Images
    "image/jpeg": { Icon: Image, color: BASIC_IMAGE_COLOR },
    "image/jpg": { Icon: Image, color: BASIC_IMAGE_COLOR },
    "image/png": { Icon: Image, color: BASIC_IMAGE_COLOR },
    "image/gif": { Icon: Image, color: BASIC_IMAGE_COLOR },
    "image/webp": { Icon: Image, color: BASIC_IMAGE_COLOR },
    "image/svg+xml": { Icon: Photo, color: "#FFB13B" },
    "image/bmp": { Icon: Image, color: BASIC_IMAGE_COLOR },
    "image/tiff": { Icon: Image, color: BASIC_IMAGE_COLOR },
    "image/ico": { Icon: Image, color: BASIC_IMAGE_COLOR },
    "image/heic": { Icon: Image, color: BASIC_IMAGE_COLOR },
    "image/avif": { Icon: Image, color: BASIC_IMAGE_COLOR },

    // Videos
    "video/mp4": { Icon: Movie, color: "#2196F3" },
    "video/avi": { Icon: Movie, color: "#2196F3" },
    "video/mov": { Icon: Movie, color: "#2196F3" },
    "video/wmv": { Icon: Movie, color: "#2196F3" },
    "video/flv": { Icon: Movie, color: "#2196F3" },
    "video/webm": { Icon: Movie, color: "#2196F3" },
    "video/mkv": { Icon: Movie, color: "#2196F3" },
    "video/3gp": { Icon: Movie, color: "#2196F3" },
    "video/mpeg": { Icon: Movie, color: "#2196F3" },
    "video/quicktime": { Icon: Movie, color: "#2196F3" },
    "video/x-msvideo": { Icon: VideoFile, color: "#2196F3" },

    // Audio
    "audio/mpeg": { Icon: AudioFile, color: "#FF9800" },
    "audio/mp3": { Icon: AudioFile, color: "#FF9800" },
    "audio/wav": { Icon: AudioFile, color: "#FF9800" },
    "audio/ogg": { Icon: AudioFile, color: "#FF9800" },
    "audio/aac": { Icon: AudioFile, color: "#FF9800" },
    "audio/flac": { Icon: AudioFile, color: "#FF9800" },
    "audio/wma": { Icon: AudioFile, color: "#FF9800" },
    "audio/m4a": { Icon: AudioFile, color: "#FF9800" },
    "audio/opus": { Icon: Audiotrack, color: "#FF9800" },
    "audio/webm": { Icon: Audiotrack, color: "#FF9800" },

    // Microsoft Office
    "application/msword": { Icon: Description, color: "#2B579A" },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
        Icon: Description,
        color: "#2B579A",
    },
    "application/vnd.ms-excel": { Icon: TableChart, color: "#217346" },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
        Icon: TableChart,
        color: "#217346",
    },
    "application/vnd.ms-powerpoint": { Icon: Slideshow, color: "#D24726" },
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        {
            Icon: Slideshow,
            color: "#D24726",
        },

    // OpenDocument formats
    "application/vnd.oasis.opendocument.text": {
        Icon: Description,
        color: "#2B579A",
    },
    "application/vnd.oasis.opendocument.spreadsheet": {
        Icon: TableChart,
        color: "#217346",
    },
    "application/vnd.oasis.opendocument.presentation": {
        Icon: Slideshow,
        color: "#D24726",
    },

    // Archives
    "application/zip": { Icon: FolderZip, color: "#795548" },
    "application/x-rar-compressed": { Icon: FolderZip, color: "#795548" },
    "application/x-7z-compressed": { Icon: FolderZip, color: "#795548" },
    "application/x-tar": { Icon: FolderZip, color: "#795548" },
    "application/gzip": { Icon: FolderZip, color: "#795548" },
    "application/x-bzip2": { Icon: FolderZip, color: "#795548" },

    // Programming Languages
    "text/html": { Icon: Html, color: "#E34C26" },
    "text/css": { Icon: Css, color: "#1572B6" },
    "text/javascript": { Icon: Javascript, color: "#F0DB4F" },
    "application/javascript": { Icon: Javascript, color: "#F0DB4F" },
    "application/json": { Icon: DataObject, color: "#000000" },
    "text/xml": { Icon: Schema, color: "#FF6600" },
    "application/xml": { Icon: Schema, color: "#FF6600" },
    "text/x-python": { Icon: Code, color: "#3776AB" },
    "text/x-java-source": { Icon: Code, color: "#ED8B00" },
    "text/x-c": { Icon: Code, color: "#A8B9CC" },
    "text/x-c++": { Icon: Code, color: "#00599C" },
    "text/x-csharp": { Icon: Code, color: "#239120" },
    "text/x-php": { Icon: Code, color: "#777BB4" },
    "text/x-ruby": { Icon: Code, color: "#CC342D" },
    "text/x-go": { Icon: Code, color: "#00ADD8" },
    "text/x-rust": { Icon: Code, color: "#000000" },
    "text/x-swift": { Icon: Code, color: "#FA7343" },
    "text/x-kotlin": { Icon: Code, color: "#7F52FF" },
    "application/typescript": { Icon: Code, color: "#3178C6" },
    "text/x-yaml": { Icon: Code, color: "#CB171E" },
    "application/x-sh": { Icon: Terminal, color: "#4EAA25" },
    "text/x-sql": { Icon: Storage, color: "#336791" },
    "text/markdown": { Icon: Article, color: "#083FA1" },

    // Text files
    "text/plain": { Icon: TextSnippet, color: FALLBACK_COLOR },
    "text/rtf": { Icon: TextSnippet, color: FALLBACK_COLOR },
    "text/csv": { Icon: TableChart, color: "#217346" },
    "application/rtf": { Icon: TextSnippet, color: FALLBACK_COLOR },

    // Other common types
    "application/octet-stream": {
        Icon: InsertDriveFile,
        color: FALLBACK_COLOR,
    },
    "application/x-executable": {
        Icon: InsertDriveFile,
        color: FALLBACK_COLOR,
    },
    "application/x-msdownload": {
        Icon: InsertDriveFile,
        color: FALLBACK_COLOR,
    },
    "application/vnd.android.package-archive": {
        Icon: InsertDriveFile,
        color: "#A4C639",
    },
    "application/x-apple-diskimage": { Icon: FolderZip, color: "#795548" },
    "application/x-deb": { Icon: FolderZip, color: "#795548" },
    "application/x-rpm": { Icon: FolderZip, color: "#795548" },
};

// Fallback mapping by category
const CATEGORY_DEFAULTS: { [key: string]: MimeTypeInfo } = {
    image: { Icon: Image, color: "#4CAF50" },
    video: { Icon: Movie, color: "#2196F3" },
    audio: { Icon: AudioFile, color: "#FF9800" },
    text: { Icon: TextSnippet, color: FALLBACK_COLOR },
    application: { Icon: InsertDriveFile, color: FALLBACK_COLOR },
};

const getMimetypeInfo = (mimeType: string): MimeTypeInfo => {
    // Exact match
    const exact = MIMETYPE_ICONS[mimeType];
    if (exact) return exact;

    // Category match
    const category = mimeType?.split("/")[0];
    const match = CATEGORY_DEFAULTS[category];
    if (match) return match;

    // Default fallback
    return { Icon: InsertDriveFile, color: FALLBACK_COLOR };
};

export { PDF_COLOR, BASIC_IMAGE_COLOR, FALLBACK_COLOR };
export default getMimetypeInfo;
