import { DropzoneOptions } from "react-dropzone";
// @mui
import { SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { IPropertyBlueprint, IPropertyDocument } from "src/types/file";

// ----------------------------------------------------------------------

export interface CustomFile extends File {
    path?: string;
    preview?: string;
    lastModifiedDate?: Date;
}

export type TUploadFile = IPropertyBlueprint | IPropertyDocument;

export type UploadVariant = "image" | "document" | "googleEarth" | undefined;

export interface UploadProps extends DropzoneOptions {
    error?: boolean;
    sx?: SxProps<Theme>;
    placeholder?: React.ReactNode;
    helperText?: React.ReactNode;
    disableMultiple?: boolean;
    variant?: UploadVariant;
    //
    files?: TUploadFile[];
    onFileClick?: (key: string) => void;
    onRemove?: (key: string) => void;
}
