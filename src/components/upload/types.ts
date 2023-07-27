import { DropzoneOptions } from "react-dropzone";
// @mui
import { SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { IExtendedPropertyBlueprint, IPropertyImage } from "src/types/file";

// ----------------------------------------------------------------------

export interface CustomFile extends File {
	path?: string;
	preview?: string;
	lastModifiedDate?: Date;
}

export interface UploadProps extends DropzoneOptions {
	error?: boolean;
	sx?: SxProps<Theme>;
	thumbnail?: boolean;
	placeholder?: React.ReactNode;
	helperText?: React.ReactNode;
	disableMultiple?: boolean;
	//
	file?: CustomFile | string | null;
	onDelete?: VoidFunction;
	//
	files?: IExtendedPropertyBlueprint[];
	onImageClick?: (file: File) => void;
	onUpload?: VoidFunction;
	onRemove?: (file: IExtendedPropertyBlueprint) => void;
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
	setFiles: (files: IPropertyImage[]) => void;
	onImageClick?: (file: IPropertyImage) => void;
	onReorder?: (sourceIndex: number, newIndex: number) => void;
	onUpload?: VoidFunction;
	onRemove?: (file: IPropertyImage) => void;
	onRemoveAll?: VoidFunction;
}
