// @mui
import { BoxProps, SxProps, Theme } from "@mui/material";
import { CSSProperties } from "react";

// ----------------------------------------------------------------------

type ImageRatio =
    | "4/3"
    | "3/4"
    | "6/4"
    | "4/6"
    | "16/9"
    | "9/16"
    | "21/9"
    | "9/21"
    | "1/1";

interface WrapperWithRatioProps extends Omit<BoxProps, "style"> {
    ratio?: ImageRatio;
    containerSx?: SxProps<Theme>;
}

interface ImageProps extends WrapperWithRatioProps {
    src?: string | null;
    alt?: string;
    imgStyle?: CSSProperties;
}

interface IPreviewImageProps extends ImageProps {
    animate?: boolean;
}

interface UploadImageProps extends Omit<IPreviewImageProps, "src"> {
    progress: number;
}

export type {
    ImageRatio,
    WrapperWithRatioProps,
    ImageProps,
    IPreviewImageProps,
    UploadImageProps,
};
