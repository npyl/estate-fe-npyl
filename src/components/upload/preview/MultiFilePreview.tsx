// @mui
import {
    IconButton,
    Stack,
    StackProps,
    SxProps,
    Theme,
    Typography,
} from "@mui/material";
import FileThumbnail from "../../file-thumbnail";
import { TUploadFile, UploadVariant } from "../types";
import LabelCreate from "@/sections/LabelCreate";
import DocumentIcon from "./DocumentIcon";
import GoogleEarthIcon from "@/assets/logo/GoogleEarth";
import { SpaceBetween } from "@/components/styled";
import DeleteIcon from "@mui/icons-material/Delete";

// ----------------------------------------------------------------------

const ItemSx: SxProps<Theme> = {
    px: 1,
    py: 0.75,
    borderRadius: 0.75,
    border: "1px solid",
    borderColor: "divider",
    cursor: "pointer",
};

// ----------------------------------------------------------------------

interface ItemProps {
    variant: UploadVariant;
    file: TUploadFile;
    disabled?: boolean;
    onClick?: (url: string) => void;
    onRemove?: (key: string) => void;
}

const Item = ({
    variant,
    file,
    disabled = false,
    onClick,
    onRemove,
}: ItemProps) => {
    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onRemove?.(file.key);
    };
    const handleClick = () => {
        onClick?.(file?.url || "");
    };

    return (
        <SpaceBetween alignItems="center" sx={ItemSx} onClick={handleClick}>
            <Stack direction="row" spacing={1} alignItems="center">
                {variant === "image" && <FileThumbnail file={file} />}

                {variant === "document" && (
                    <DocumentIcon
                        isPreview={!file.url}
                        sx={{
                            width: 50,
                            height: 50,
                        }}
                    />
                )}

                {variant === "googleEarth" ? (
                    <GoogleEarthIcon width={50} height={50} />
                ) : null}

                {"filename" in file && (
                    <Typography ml={1} variant="subtitle2">
                        {file.filename}
                    </Typography>
                )}
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
                {variant === "document" && file.url ? (
                    <div onClick={(e) => e.stopPropagation()}>
                        <LabelCreate
                            variant="document"
                            resourceId={file.id}
                            disabled={disabled}
                        />
                    </div>
                ) : null}

                {onRemove && file.url && (
                    <IconButton
                        edge="end"
                        size="small"
                        disabled={disabled}
                        onClick={handleRemove}
                    >
                        <DeleteIcon />
                    </IconButton>
                )}
            </Stack>
        </SpaceBetween>
    );
};

// ----------------------------------------------------------------------

interface MultiFilePreviewProps extends StackProps {
    files: TUploadFile[];
    variant: UploadVariant;
    disabled?: boolean;
    onFileClick?: (url: string) => void;
    onRemove?: (key: string) => void;
}

const MultiFilePreview = ({
    files,
    variant,
    disabled = false,
    onFileClick,
    onRemove,
    ...props
}: MultiFilePreviewProps) => (
    <Stack {...props} spacing={1}>
        {files.map((file, i) => (
            <Item
                key={`${file.filename}_${i}`}
                variant={variant}
                file={file}
                disabled={disabled}
                onClick={onFileClick}
                onRemove={onRemove}
            />
        ))}
    </Stack>
);

export default MultiFilePreview;
