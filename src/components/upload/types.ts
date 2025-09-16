import { DropzoneOptions } from "react-dropzone";
// @mui
import { SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { IPropertyBlueprint, IPropertyDocument } from "src/types/file";
import { ComponentType } from "react";
import { ItemProps } from "./preview/MultiFilePreview/getItem";

// ----------------------------------------------------------------------

export interface CustomFile extends File {
    path?: string;
    preview?: string;
    lastModifiedDate?: Date;
}

export type TUploadFile = IPropertyBlueprint | IPropertyDocument;

export type UploadVariant = "image" | "document" | "googleEarth" | undefined;

export interface UploadProps<T extends ItemProps = ItemProps>
    extends DropzoneOptions {
    error?: boolean;
    sx?: SxProps<Theme>;
    placeholder?: React.ReactNode;
    helperText?: React.ReactNode;
    variant?: UploadVariant;
    compact?: boolean; // force list view
    //
    files?: TUploadFile[];
    ItemComponent?: ComponentType<T>;
    onFileClick?: (key: string) => void;
    onRemove?: (key: string) => void;
}
