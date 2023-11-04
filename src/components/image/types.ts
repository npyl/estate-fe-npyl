import { LazyLoadImageProps } from "react-lazy-load-image-component";
// @mui
import { BoxProps } from "@mui/material";

// ----------------------------------------------------------------------

type IProps = BoxProps & LazyLoadImageProps;

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

export type UploadProgress = {
    filename: string;
    progress: number;
};

export interface ImageProps extends IProps {
    ratio?: ImageRatio;
    disabledEffect?: boolean;
    size?: { width: string; height: string };
}

export interface LabeledImageProps extends ImageProps {
    label?: string;
    hidden?: boolean;
}

export interface IPreviewImageProps extends ImageProps {
    animate?: boolean;
}

export interface UploadImageProps extends IPreviewImageProps {
    progress: number;
}

export const NoUploadProgress: UploadProgress = {
    filename: "",
    progress: -1,
};
