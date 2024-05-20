import { SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { DropzoneOptions } from "react-dropzone";
import IGoogleEarth from "src/types/googleEarth";

export interface UploadProps extends DropzoneOptions {
    error?: boolean;
    sx?: SxProps<Theme>;
    thumbnail?: boolean;
    placeholder?: React.ReactNode;
    helperText?: React.ReactNode;
    disableMultiple?: boolean;
    files?: IGoogleEarth[];
    //
    onFileClick?: (file: IGoogleEarth) => void;
    onUpload?: VoidFunction;
    onRemove?: (file: IGoogleEarth) => void;
    onRemoveAll?: VoidFunction;
    onDelete?: VoidFunction;
}
