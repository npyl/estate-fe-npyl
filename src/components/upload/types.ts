import { DropzoneOptions } from "react-dropzone";
// @mui
import { SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";
import {
    IExtendedPropertyBlueprint,
    IPropertyDocument,
    IPropertyImage,
} from "src/types/file";

// ----------------------------------------------------------------------

export interface CustomFile extends File {
    path?: string;
    preview?: string;
    lastModifiedDate?: Date;
}

export type IPropertyFile = IExtendedPropertyBlueprint | IPropertyDocument;

export type UploadVariant = "image" | "document" | undefined;

export interface UploadProps extends DropzoneOptions {
    error?: boolean;
    sx?: SxProps<Theme>;
    thumbnail?: boolean;
    placeholder?: React.ReactNode;
    helperText?: React.ReactNode;
    disableMultiple?: boolean;

    variant?: UploadVariant;
    //
    file?: CustomFile | string | null;
    onDelete?: VoidFunction;
    //
    files?: IPropertyFile[];
    onImageClick?: (file: File) => void;
    onUpload?: VoidFunction;
    onRemove?: (file: IPropertyFile) => void;
    onRemoveAll?: VoidFunction;
}

export interface UploadPropertyImageProps extends DropzoneOptions {
    error?: boolean;
    sx?: SxProps<Theme>;
    thumbnail?: boolean;
    placeholder?: React.ReactNode;
    helperText?: React.ReactNode;
    disableMultiple?: boolean;
    //
    file?: string | null;
    onDelete?: VoidFunction;
    //
    files?: IPropertyImage[];
    onImageClick?: (file: IPropertyImage) => void;
    onImageDoubleClick?: (file: IPropertyImage) => void;
    onReorder?: (keys: string[]) => void;
    onUpload?: VoidFunction;
    onRemove?: (file: IPropertyImage) => void;
    onRemoveAll?: VoidFunction;
}
