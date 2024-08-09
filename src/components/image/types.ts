// @mui
import { BoxProps, SxProps, Theme } from "@mui/material";
import { CSSProperties } from "react";

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
    size?: { width: string; height: string };

    containerSx?: SxProps<Theme>;
    imgStyle?: CSSProperties;
}

export interface IPreviewImageProps extends ImageProps {
    animate?: boolean;
}

export interface UploadImageProps extends Omit<IPreviewImageProps, "src"> {
    progress: number;
}
