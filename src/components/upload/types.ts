import { DropzoneOptions } from "react-dropzone";
// @mui
import { SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { IPropertyImage } from "src/types/file";

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
	files?: File[];
	onImageClick?: (file: File) => void;
	onUpload?: VoidFunction;
	onRemove?: (file: CustomFile | string) => void;
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
	onUpload?: VoidFunction;
	onRemove?: (file: IPropertyImage) => void;
	onRemoveAll?: VoidFunction;
}
