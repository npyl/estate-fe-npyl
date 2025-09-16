import { Stack, StackProps } from "@mui/material";
import { TUploadFile, UploadVariant } from "@/components/upload/types";
import { ComponentType, FC } from "react";
import getItem, { Item, ItemProps } from "./getItem";

interface MultiFilePreviewProps<T extends ItemProps = ItemProps>
    extends StackProps {
    files: TUploadFile[];
    variant: UploadVariant;
    compact: boolean;
    disabled?: boolean;
    // ...
    ItemComponent: ComponentType<T>; // INFO: support custom Item component
    // ...
    onFileClick?: (url: string) => void;
    onRemove?: (key: string) => void;
}

const MultiFilePreview: FC<MultiFilePreviewProps> = ({
    files,
    variant,
    disabled = false,
    compact,
    // ...
    ItemComponent,
    // ...
    onFileClick,
    onRemove,
    ...props
}) => (
    <Stack {...props} spacing={1}>
        {files.map(
            getItem(
                {
                    variant,
                    disabled,
                    compact,
                    onClick: onFileClick,
                    onRemove,
                },
                ItemComponent
            )
        )}
    </Stack>
);

export default MultiFilePreview;
