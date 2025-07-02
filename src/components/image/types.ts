import { CSSProperties, HTMLAttributes } from "react";

// ----------------------------------------------------------------------

type ImageRatio = CSSProperties["aspectRatio"];

interface ImageProps
    extends Omit<HTMLAttributes<HTMLImageElement>, "src" | "onError"> {
    src?: string | null;
    alt?: string;
    aspectRatio?: ImageRatio;
}

interface IPreviewImageProps extends ImageProps {
    animate?: boolean;
}

interface UploadImageProps extends Omit<IPreviewImageProps, "src"> {
    progress: number;
}

export type { ImageRatio, ImageProps, IPreviewImageProps, UploadImageProps };
