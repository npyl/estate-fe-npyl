import {
    IconButton,
    Stack,
    StackProps,
    SxProps,
    Theme,
    Typography,
} from "@mui/material";
import FileThumbnail from "@/components/file-thumbnail";
import { TUploadFile, UploadVariant } from "@/components/upload/types";
import LabelSection from "@/ui/Label/Section";
import DocumentIcon from "../DocumentIcon";
import GoogleEarthIcon from "@/assets/logo/GoogleEarth";
import { SpaceBetween } from "@/components/styled";
import DeleteIcon from "@mui/icons-material/Delete";
import { ComponentType, FC } from "react";

const ItemSx: SxProps<Theme> = {
    px: 1,
    py: 0.75,
    borderRadius: 0.75,
    border: "1px solid",
    borderColor: "divider",
    cursor: "pointer",
};

interface ItemProps extends Omit<StackProps, "children" | "onClick"> {
    variant: UploadVariant;
    compact: boolean;
    file: TUploadFile;
    disabled?: boolean;
    onClick?: (url: string) => void;
    onRemove?: (key: string) => void;
}

const Item: FC<ItemProps> = ({
    variant,
    file,
    disabled = false,
    compact,
    // ...
    onClick,
    onRemove,
    // ...
    sx,
    ...props
}) => {
    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onRemove?.(file.key);
    };
    const handleClick = () => {
        onClick?.(file?.url || "");
    };

    return (
        <SpaceBetween
            alignItems="center"
            sx={{ ...ItemSx, ...(sx as any) }}
            onClick={handleClick}
            {...props}
        >
            <Stack direction="row" spacing={1} alignItems="center">
                {variant === "image" && !compact ? (
                    <FileThumbnail file={file} />
                ) : null}

                {variant === "document" || compact ? (
                    <DocumentIcon
                        isPreview={!file.url}
                        sx={{
                            width: 50,
                            height: 50,
                        }}
                    />
                ) : null}

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
                    <LabelSection
                        variant="document"
                        resourceId={file.id}
                        disabled={disabled}
                    />
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

type FilelessItemProps = Omit<ItemProps, "file">;

const getItem =
    <T extends FilelessItemProps = FilelessItemProps>(
        props: FilelessItemProps,
        ItemComponent: ComponentType<T>
    ) =>
    (file: TUploadFile) => (
        <ItemComponent key={file.id} file={file} {...(props as T)} />
    );

export { Item };
export type { ItemProps, FilelessItemProps };
export default getItem;
