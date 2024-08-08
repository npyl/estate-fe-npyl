// @mui
import { BoxProps } from "@mui/material";

// ----------------------------------------------------------------------

export type ImageRatio =
    | "4/3"
    | "3/4"
    | "6/4"
    | "4/6"
    | "16/9"
    | "9/16"
    | "21/9"
    | "9/21"
    | "1/1";

export interface ImageProps extends BoxProps {
    src?: string | null;
    alt?: string;
    ratio?: ImageRatio;
    disabledEffect?: boolean;
    size?: { width: string; height: string };
}

export interface IPreviewImageProps extends ImageProps {
    animate?: boolean;
}

export interface UploadImageProps extends Omit<IPreviewImageProps, "src"> {
    progress: number;
}
