import { DropzoneOptions } from 'react-dropzone';
// @mui
import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

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

// Upload that supports only base64-string url images
export interface UploadStringProps extends DropzoneOptions {
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
  files?: string[];
  onImageClick?: (file: string) => void;
  onUpload?: VoidFunction;
  onRemove?: (file: string) => void;
  onRemoveAll?: VoidFunction;
}